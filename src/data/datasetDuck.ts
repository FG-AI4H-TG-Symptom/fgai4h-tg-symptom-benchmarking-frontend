/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { takeEvery, put, all } from "redux-saga/effects";

import urlBuilder from "./util/urlBuilder";
import httpResponseErrorMessage from "./util/httpResponseErrorMessage";

const initialState = {
  list: [],
  loading: false,
  error: null,
  fullDataset: null
};

const slice = createSlice({
  name: "datasets",
  initialState: initialState,
  reducers: {
    fetchDatasets: () => {},
    fetchDatasetsSuccess: (datasets, action) => {
      datasets.list = action.payload;
      datasets.loading = false;
      datasets.error = null;
    },
    fetchDatasetsFailure: (datasets, action) => {
      datasets.error = action.payload;
      datasets.loading = false;
    },
    // Add Dataset
    addDataset: (datasets, action) => {},
    addDatasetSuccess: (datasets, action) => {
      datasets.list.push(action.payload);
    },
    addDatasetFailure: (datasets, action) => {
      datasets.error = action.payload;
    },
    // Delete dataset
    deleteDataset: (datasets, action) => {},
    deleteDatasetSuccess: (datasets, action) => {
      datasets.list = datasets.list.filter(
        dataset => dataset.id !== action.payload.id
      );
    },
    deleteDatasetFailure: (datasets, action) => {
      datasets.error = action.payload;
    },
    // fetch Full Dataset
    fetchFullDataset: (datasets, action) => {
      datasets.loading = true;
    },
    fetchFullDatasetSuccess: (datasets, action) => {
      datasets.fullDataset = action.payload;
      datasets.loading = false;
      datasets.error = null;
    },
    fetchFullDatasetFailure: (datasets, action) => {
      datasets.error = action.payload;
      datasets.loading = false;
    }
  }
});

export const {
  fetchDatasets,
  addDataset,
  deleteDataset,
  fetchFullDataset
} = slice.actions;
export default slice.reducer;

const {
  deleteDatasetSuccess,
  deleteDatasetFailure,
  fetchDatasetsSuccess,
  fetchDatasetsFailure,
  addDatasetSuccess,
  addDatasetFailure,
  fetchFullDatasetSuccess,
  fetchFullDatasetFailure
} = slice.actions;

// SAGAS /////////////////////////
// WORKERS
function* fetchDatasetsWorker() {
  try {
    const response: Response = yield fetch(urlBuilder("case-sets"));

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const datasets = yield response.json();

    yield put(fetchDatasetsSuccess(datasets));
  } catch (error) {
    yield put(
      fetchDatasetsFailure(`Failed to load Datasets: ${error.message}`)
    );
  }
}

function* addDatasetWorker(action) {
  // action has type and payload, the payload contains the number of cases
  const { numberOfCases } = action.payload;

  try {
    const response: Response = yield fetch(urlBuilder("case-sets/synthesize"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        casesPerCaseset: numberOfCases,
        quantityOfCasesets: 1
      })
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const data = yield response.json();
    yield put(addDatasetSuccess(data[0]));
  } catch (error) {
    yield put(addDatasetFailure(`Failed to create case set: ${error.message}`));
  }
}

function* deleteDatasetWorker(action) {
  const { caseSetId } = action.payload;

  try {
    const response = yield fetch(urlBuilder(`case-sets/${caseSetId}`), {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    yield put(deleteDatasetSuccess({ id: caseSetId }));
  } catch (error) {
    console.error(error);
    yield put(
      deleteDatasetFailure(`Errored while deleting case set: ${error.message}`)
    );
  }
}

function* fetchFullDatasetWorker(action) {
  const caseSetId = action.payload;
  try {
    const response: Response = yield fetch(
      urlBuilder(`case-sets/${caseSetId}?full=1`)
    );

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const caseSet = yield response.json();

    yield put(fetchFullDatasetSuccess(caseSet));
  } catch (error) {
    yield put(
      fetchFullDatasetFailure(`Failed to fetch case set: ${error.message}`)
    );
  }
}

// WATCHERS
export function* fetchDatasetsWatcher() {
  yield takeEvery(fetchDatasets.type, fetchDatasetsWorker);
}

export function* addDatasetWatcher() {
  yield takeEvery(addDataset.type, addDatasetWorker);
}

export function* deleteDatasetWatcher() {
  yield takeEvery(deleteDataset.type, deleteDatasetWorker);
}

export function* fetchFullDatasetWatcher() {
  yield takeEvery(fetchFullDataset.type, fetchFullDatasetWorker);
}

export function* rootDatasetsSaga() {
  yield all([
    fetchDatasetsWatcher(),
    addDatasetWatcher(),
    deleteDatasetWatcher(),
    fetchFullDatasetWatcher()
  ]);
}
