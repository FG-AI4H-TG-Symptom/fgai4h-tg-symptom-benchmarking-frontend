import { put } from "redux-saga/effects";

import urlBuilder from "../../util/urlBuilder";
import { benchmarkingSessionDeleteDataAction } from "../benchmarkActions";
import httpResponseErrorMessage from "../../util/httpResponseErrorMessage";
import { setFatalError } from "../../application/applicationActions";

export default function* deleteBenchmarkingSession(
  benchmarkManagerId,
  metadata
) {
  try {
    const response = yield fetch(
      urlBuilder(`benchmarking-sessions/${benchmarkManagerId}`),
      {
        method: "DELETE"
      }
    );

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    yield put(benchmarkingSessionDeleteDataAction.store(undefined, metadata));
  } catch (error) {
    console.error(error);
    yield put(
      setFatalError(
        `Errored while deleting benchmarking session: ${error.message}`
      )
    );
  }
}
