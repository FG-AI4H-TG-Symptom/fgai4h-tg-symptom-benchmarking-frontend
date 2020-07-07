import { put } from "redux-saga/effects";

import { setFatalError } from "../../application/applicationActions";
import urlBuilder from "../../util/urlBuilder";
import httpResponseErrorMessage from "../../util/httpResponseErrorMessage";
import { CallbackMetadata } from "../../util/dataState/generateDataStateActions";
import { aiImplementationRegisterDataAction } from "../aiImplementationsActions";
import { AiImplementationInfo } from "../aiImplementationDataType";

export default function* registerAiImplementation(
  aiImplementation: AiImplementationInfo,
  metadata: CallbackMetadata<AiImplementationInfo>
) {
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

    const createdAiImplementation: AiImplementationInfo = yield response.json();

    yield put(
      aiImplementationRegisterDataAction.store(
        createdAiImplementation,
        metadata
      )
    );
  } catch (error) {
    yield put(
      setFatalError(`Failed to register AI implementation: ${error.message}`)
    );
  }
}
