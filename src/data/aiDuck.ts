/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { takeEvery, put, all } from "redux-saga/effects";

import urlBuilder from "./util/urlBuilder";
import httpResponseErrorMessage from "./util/httpResponseErrorMessage";

// REDUCER
const initialAIstate = { list: [], editingAI: null, loading: false, error: null, health: {} };

const slice = createSlice({
  name: "AIs",
  initialState: initialAIstate,
  reducers: {
    fetchAIs: AIs => {
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
    addAISuccess: (AIs, action) => {
      AIs.list.push(action.payload);
    },
    addAIFailure: (AIs, action) => {
      AIs.error = action.payload;
    },
    // delete AI
    deleteAI: (AIs, action) => {},
    deleteAISuccess: (AIs, action) => {
      AIs.list = AIs.list.filter(ai => ai.id !== action.payload.id);
    },
    deleteAIFailure: (AIs, action) => {
      AIs.error = action.payload;
    }
  }
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
  fetchAIFailure
} = slice.actions;

export const { fetchAIs, fetchAI, addAI, deleteAI } = slice.actions;
export default slice.reducer;

// SAGAS /////////////////////////
// WORKERS
function* fetchAIsWorker() {
  try {
    const response: Response = yield fetch(urlBuilder("ai-implementations"), {
      method: "GET"
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
    yield put(
      fetchAIsFailure(`Failed to load AI implementations: ${error.message}`)
    );
  }
}

function* fetchAIWorker(action) {
  const aiImplementationId = action.payload;
  try {
    const response = yield fetch(
      urlBuilder(`ai-implementations/${aiImplementationId}`),
      {
        method: "GET"
      }
    );

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const editingAI = yield response.json();
    yield put(
      fetchAISuccess({editingAI: editingAI})
    );
  } catch (error) {
    yield put(
      fetchAIFailure(
        `Failed to fetch AI implementation: ${error.message}`
      )
    );
  }
}

function* fetchAIHealthWorker(action) {
  const aiImplementationId = action.payload.id;
  try {
    const response = yield fetch(
      urlBuilder(`ai-implementations/${aiImplementationId}/health-check`),
      {
        method: "GET"
      }
    );

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const data = yield response.json();
    yield put(
      fetchAiHealthSuccess({ id: aiImplementationId, status: data.status })
    );
  } catch (error) {
    yield put(
      fetchAiHealthFailure(
        `Failed to fetch AI implementation list: ${error.message}`
      )
    );
  }
}

function* deleteAIworker(action) {
  // action has type and payload, the payload contains the id
  const aiImplementationId = action.payload;

  try {
    const response = yield fetch(
      urlBuilder(`ai-implementations/${aiImplementationId}`),
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    yield put(deleteAISuccess({ id: aiImplementationId }));
  } catch (error) {
    console.error(error);
    yield put(
      deleteAIFailure(
        `Errored while deleting AI implementation: ${error.message}`
      )
    );
  }
}
function* addAIworker(action) {
  // action has type and payload, the payload contains the ai object
  const aiImplementation = action.payload;

  try {
    const response = yield fetch(urlBuilder("ai-implementations"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(aiImplementation)
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const createdAiImplementation = yield response.json();
    yield put(fetchAiHealth({ id: createdAiImplementation.id }));
    yield put(addAISuccess(createdAiImplementation));
  } catch (error) {
    yield put(
      addAIFailure(`Failed to register AI implementation: ${error.message}`)
    );
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

export function* rootAiSaga() {
  yield all([
    addAiWatcher(),
    deleteAiWatcher(),
    fetchAIsWatcher(),
    fetchAIWatcher(),
    fetchAiHealthWatcher()
  ]);
}
