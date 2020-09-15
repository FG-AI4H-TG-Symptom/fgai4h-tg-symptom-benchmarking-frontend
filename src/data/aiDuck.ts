/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit';
import { takeEvery, put, all } from 'redux-saga/effects';

import urlBuilder from './util/urlBuilder';
import httpResponseErrorMessage from './util/httpResponseErrorMessage';
import { queueNotification } from './application/applicationActions';

// REDUCER
const initialAIstate = { list: [], editingAI: null, loading: false, error: null, health: {} };

const slice = createSlice({
  name: 'AIs',
  initialState: initialAIstate,
  reducers: {
    fetchAIs: (AIs) => {
      AIs.loading = true;
    },
    fetchAIsSuccess: (AIs, action) => {
      AIs.list = action.payload;
      AIs.loading = false;
      AIs.error = null;
    },
    fetchAIsFailure: (AIs, action) => {
      AIs.error = action.payload;
      AIs.loading = false;
    },
    // fetch single AI
    fetchAI: (AIs, action) => {
      AIs.editingAI = null;
      AIs.loading = true;
    },
    fetchAISuccess: (AIs, action) => {
      AIs.editingAI = action.payload.editingAI;
      AIs.error = null;
      AIs.loading = false;
    },
    fetchAIFailure: (AIs, action) => {
      AIs.error = action.payload;
      AIs.loading = false;
    },
    // update AI
    updateAI: (AIs, action) => {
      AIs.loading = true;
    },
    updateAISuccess: (AIs, action) => {
      AIs.error = null;
      AIs.loading = false;
    },
    updateAIFailure: (AIs, action) => {
      AIs.error = action.payload;
      AIs.loading = false;
    },
    // fetch AI health
    fetchAiHealth: (AIs, action) => {},
    fetchAiHealthSuccess: (AIs, action) => {
      AIs.health[action.payload.id] = action.payload.status;
    },
    fetchAiHealthFailure: (AIs, action) => {
      AIs.error = action.payload;
    },
    // add AI
    addAI: (AIs, action) => {},
    addAISuccess: (AIs, action) => {},
    addAIFailure: (AIs, action) => {
      AIs.error = action.payload;
    },
    // delete AI
    deleteAI: (AIs, action) => {},
    deleteAISuccess: (AIs, action) => {
      AIs.list = AIs.list.filter((ai) => ai.id !== action.payload.id);
    },
    deleteAIFailure: (AIs, action) => {
      AIs.error = action.payload;
    },
  },
});

const {
  fetchAiHealth,
  fetchAiHealthSuccess,
  fetchAiHealthFailure,
  deleteAISuccess,
  deleteAIFailure,
  addAISuccess,
  addAIFailure,
  fetchAIsSuccess,
  fetchAIsFailure,
  fetchAISuccess,
  fetchAIFailure,
  updateAISuccess,
  updateAIFailure,
} = slice.actions;

export const { fetchAIs, fetchAI, updateAI, addAI, deleteAI } = slice.actions;
export default slice.reducer;

// SAGAS /////////////////////////
// WORKERS
function* fetchAIsWorker() {
  try {
    const response: Response = yield fetch(urlBuilder('ai-implementations'), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const aiImplementations = yield response.json();

    yield put(fetchAIsSuccess(aiImplementations));

    // eslint-disable-next-line no-restricted-syntax
    for (const aiImplementation of aiImplementations) {
      yield put(fetchAiHealth({ id: aiImplementation.id }));
    }
  } catch (error) {
    const errorMessage = `Failed to fetch AI implementations list: ${error.message}`;
    yield put(fetchAIsFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* fetchAIWorker(action) {
  const aiImplementationId = action.payload;
  try {
    const response = yield fetch(urlBuilder(`ai-implementations/${aiImplementationId}`), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const editingAI = yield response.json();
    yield put(fetchAISuccess({ editingAI: editingAI }));
  } catch (error) {
    const errorMessage = `Failed to fetch AI implementation: ${error.message}`;
    yield put(fetchAIFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* fetchAIHealthWorker(action) {
  const aiImplementationId = action.payload.id;
  try {
    const response = yield fetch(urlBuilder(`ai-implementations/${aiImplementationId}/health-check`), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const data = yield response.json();
    yield put(fetchAiHealthSuccess({ id: aiImplementationId, status: data.status }));
  } catch (error) {
    const errorMessage = `Failed to fetch AI implementation health status: ${error.message}`;
    yield put(fetchAiHealthFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* updateAIWorker(action) {
  const ai = action.payload;

  try {
    const response = yield fetch(
      urlBuilder(`ai-implementations/${ai.id}`),

      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: ai.name,
          baseUrl: ai.baseUrl,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const updatedAI = yield response.json();
    console.log(updatedAI);
    yield put(updateAISuccess({ updatedAI: updatedAI }));
  } catch (error) {
    const errorMessage = `Failed to update AI implementation: ${error.message}`;
    yield put(updateAIFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

function* deleteAIworker(action) {
  // action has type and payload, the payload contains the id
  const aiImplementationId = action.payload;

  try {
    const response = yield fetch(urlBuilder(`ai-implementations/${aiImplementationId}`), {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    yield put(deleteAISuccess({ id: aiImplementationId }));
  } catch (error) {
    const errorMessage = `Failed to delete AI implementation: ${error.message}`;
    yield put(deleteAIFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}
function* addAIworker(action) {
  // action has type and payload, the payload contains the ai object
  const aiImplementation = action.payload;

  try {
    const response = yield fetch(urlBuilder('ai-implementations'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiImplementation),
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const createdAiImplementation = yield response.json();
    yield put(fetchAiHealth({ id: createdAiImplementation.id }));
    yield put(addAISuccess(createdAiImplementation));
  } catch (error) {
    const errorMessage = `Failed to register AI implementation: ${error.message}`;
    yield put(addAIFailure(errorMessage));
    yield put(queueNotification({ message: errorMessage, type: 'error' }));
  }
}

// WATCHERS
function* addAiWatcher() {
  yield takeEvery(addAI.type, addAIworker);
}

function* deleteAiWatcher() {
  yield takeEvery(deleteAI.type, deleteAIworker);
}

function* fetchAIsWatcher() {
  yield takeEvery(fetchAIs.type, fetchAIsWorker);
}

function* fetchAIWatcher() {
  yield takeEvery(fetchAI.type, fetchAIWorker);
}

function* fetchAiHealthWatcher() {
  yield takeEvery(fetchAiHealth.type, fetchAIHealthWorker);
}

function* updateAIWatcher() {
  yield takeEvery(updateAI.type, updateAIWorker);
}

export function* rootAiSaga() {
  try {
    yield all([
      addAiWatcher(),
      deleteAiWatcher(),
      fetchAIsWatcher(),
      fetchAIWatcher(),
      fetchAiHealthWatcher(),
      updateAIWatcher(),
    ]);
  } catch (e) {
    console.log(`rootAiSaga failed with: ${e}`);
  }
}
