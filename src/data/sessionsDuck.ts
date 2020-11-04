/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { takeEvery, put, all } from 'redux-saga/effects';

import urlBuilder from './util/urlBuilder';
import httpResponseErrorMessage from './util/httpResponseErrorMessage';
import { BenchmarkingSessionStatus } from './benchmarks/benchmarkManagerDataType';
import sleep from './util/sleep';
import { queueNotification } from './application/applicationActions';

const initialState = {
  list: [],
  loading: false,
  error: null,

  evaluation: null,
};

const slice = createSlice({
  name: 'sessions',
  initialState: initialState,
  reducers: {
    fetchSessions: () => {},
    fetchSessionsSuccess: (sessions, action) => {
      sessions.list = action.payload;
      sessions.loading = false;
      sessions.error = null;
    },
    fetchSessionsFailure: (sessions, action) => {
      sessions.error = action.payload;
      sessions.loading = false;
    },
    // Add Session
    addSession: (sessions, action) => {},
    addSessionSuccess: (sessions, action) => {
      sessions.list.push(action.payload);
    },
    addSessionFailure: (sessions, action) => {
      sessions.error = action.payload;
    },
    // Delete Session
    deleteSession: (sessions, action) => {},
    deleteSessionSuccess: (sessions, action) => {
      sessions.list = sessions.list.filter((s) => s.id !== action.payload.id);
    },
    deleteSessionFailure: (sessions, action) => {
      sessions.error = action.payload;
    },
    // Fetch Evaluation
    fetchEvaluation: (sessions, action) => {},
    fetchEvaluationSuccess: (sessions, action) => {
      const { evaluation, sessionId } = action.payload;

      let session = sessions.list.find((s) => s.id === sessionId);

      session.evaluation = evaluation;
      session.statistics = { ...session.statistics, table: evaluation.statsTable };
    },
    fetchEvaluationFailure: (sessions, action) => {
      sessions.error = action.payload;
    },
    // Running Session
    runSession: (sessions, action) => {},
    runSessionFailure: (sessions, action) => {
      sessions.error = action.payload;
    },
    // Session Status
    setSessionStatus: (sessions, action) => {
      const { id, status } = action.payload;
      let session = sessions.list.find((s) => s.id === id);
      session.status = status;
    },
    observeSessionStatus: (sessions, action) => {},
    observeSessionStatusFailure: (sessions, action) => {
      sessions.error = action.payload;
    },

    // Running session statistics
    saveStatistics: (sessions, action) => {
      const { statistics, benchmarkId } = action.payload;

      let session = sessions.list.find((s) => s.id === benchmarkId);
      session.statistics = statistics;
    },
  },
});

export const { fetchSessions, addSession, deleteSession, fetchEvaluation, runSession } = slice.actions;
export default slice.reducer;

const {
  fetchEvaluationSuccess,
  fetchEvaluationFailure,
  fetchSessionsSuccess,
  fetchSessionsFailure,
  addSessionSuccess,
  addSessionFailure,
  deleteSessionSuccess,
  deleteSessionFailure,
  setSessionStatus,
  observeSessionStatus,
  observeSessionStatusFailure,
  runSessionFailure,
  saveStatistics,
} = slice.actions;

// SAGAS /////////////////////////
// WORKERS
function* fetchSessionsWorker() {
  try {
    const response = yield fetch(urlBuilder(`benchmarking-sessions`));

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const benchmarkingSessions = yield response.json();

    yield put(fetchSessionsSuccess(benchmarkingSessions));

    // eslint-disable-next-line no-restricted-syntax
    for (const session of benchmarkingSessions) {
      if (session.status === BenchmarkingSessionStatus.RUNNING) {
        yield put(observeSessionStatus(session.id));
      }
    }
  } catch (error) {
    const errorMessage = `fetchSessions: Errored while fetching benchmark sessions list: ${error.message}`;
    yield put(fetchSessionsFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* addSessionWorker(action) {
  try {
    const { caseSetId, aiImplementationIds } = action.payload.benchmarkParameters;

    const response = yield fetch(urlBuilder('benchmarking-sessions'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        caseSet: caseSetId,
        aiImplementations: aiImplementationIds,
      }),
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response, 'create benchmark manager'));
    }

    const benchmarkingSession = yield response.json();
    yield put(addSessionSuccess(benchmarkingSession));
  } catch (error) {
    const errorMessage = `addSession: Failed to run benchmark on case set: ${error.message}`;
    yield put(addSessionFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* runSessionWorker(action) {
  // const { id, aiImplementations, caseSet } = action.payload;
  const session = action.payload;

  try {
    const startBenchmarkingResponse = yield fetch(urlBuilder(`benchmarking-sessions/${session.id}/run`), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session),
    });

    if (!startBenchmarkingResponse.ok) {
      throw new Error(httpResponseErrorMessage(startBenchmarkingResponse, 'start benchmark'));
    }

    yield put(
      setSessionStatus({
        id: session.id,
        status: BenchmarkingSessionStatus.RUNNING,
      }),
    );

    yield put(observeSessionStatus(session.id));
  } catch (error) {
    const errorMessage = `runSession: Error running benchmark sessions: ${error.message}`;
    yield put(runSessionFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* observeSessionStatusWorker(action) {
  const benchmarkId = action.payload;
  try {
    while (true) {
      const response = yield fetch(urlBuilder(`benchmarking-sessions/${benchmarkId}/status`));

      if (!response.ok) {
        throw new Error(httpResponseErrorMessage(response));
      }

      const benchmarkInfo = yield response.json();

      yield put(
        setSessionStatus({
          id: benchmarkId,
          status: benchmarkInfo.status,
        }),
      );

      if (benchmarkInfo.status === BenchmarkingSessionStatus.RUNNING) {
        yield put(saveStatistics({ statistics: benchmarkInfo.statistics, benchmarkId: benchmarkId }));
      } else if (benchmarkInfo.status === BenchmarkingSessionStatus.FINISHED) {
        yield put(fetchEvaluation(benchmarkId));
        break;
      }

      yield sleep(1000);
    }
  } catch (error) {
    const errorMessage = `ObserveSessionStatus: Errored while running benchmark on case set: ${error.message}`;
    yield put(observeSessionStatusFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* deleteSessionWorker(action) {
  const { sessionId } = action.payload;

  try {
    const response = yield fetch(urlBuilder(`benchmarking-sessions/${sessionId}`), {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    yield put(deleteSessionSuccess({ id: sessionId }));
  } catch (error) {
    const errorMessage = `deleteSession: Errored while deleting benchmarking session: ${error.message}`;
    yield put(deleteSessionFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* fetchEvaluationWorker(action) {
  const benchmarkingSessionId = action.payload;
  try {
    // todo: metrics calculation not implemented yet
    const response: Response = yield fetch(urlBuilder(`benchmarking-sessions/${benchmarkingSessionId}/results`));

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response, `fetch benchmark results`));
    }

    const results = yield response.json();

    yield put(fetchEvaluationSuccess({ evaluation: results, sessionId: benchmarkingSessionId }));
  } catch (error) {
    const errorMessage = `fetchEvaluation: Errored while running benchmark on case set: ${error.message}`;
    yield put(fetchEvaluationFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

// WATCHERS
function* fetchSessionsWatcher() {
  yield takeEvery(fetchSessions.type, fetchSessionsWorker);
}

function* addSessionWatcher() {
  yield takeEvery(addSession.type, addSessionWorker);
}

function* deleteSessionWatcher() {
  yield takeEvery(deleteSession.type, deleteSessionWorker);
}

function* observeSessionStatusWatcher() {
  yield takeEvery(observeSessionStatus.type, observeSessionStatusWorker);
}

function* fetchEvaluationWatcher() {
  yield takeEvery(fetchEvaluation.type, fetchEvaluationWorker);
}

function* runSessionWatcher() {
  yield takeEvery(runSession.type, runSessionWorker);
}

export function* rootSessionsSaga() {
  try {
    yield all([
      fetchSessionsWatcher(),
      addSessionWatcher(),
      observeSessionStatusWatcher(),
      deleteSessionWatcher(),
      fetchEvaluationWatcher(),
      runSessionWatcher(),
    ]);
  } catch (e) {
    console.log(`rootSessionsSaga failed with: ${e}`);
  }
}
