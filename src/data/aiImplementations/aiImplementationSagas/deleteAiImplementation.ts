import { put } from "redux-saga/effects";

import urlBuilder from "../../util/urlBuilder";
import { aiDeletedStore } from "../aiImplementationsActions";
import httpResponseErrorMessage from "../../util/httpResponseErrorMessage";
import { setFatalError } from "../../application/applicationActions";

export default function* deleteAiImplementation(aiImplementationId, metadata) {
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

    yield put(aiDeletedStore(metadata));
  } catch (error) {
    console.error(error);
    yield put(
      setFatalError(
        `Errored while deleting AI implementation: ${error.message}`
      )
    );
  }
}
