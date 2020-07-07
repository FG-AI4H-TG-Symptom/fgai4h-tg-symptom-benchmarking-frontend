import { put } from "redux-saga/effects";

import { CallbackMetadata } from "../../util/dataState/generateDataStateActions";
import urlBuilder from "../../util/urlBuilder";
import httpResponseErrorMessage from "../../util/httpResponseErrorMessage";
import { caseSetSaveCaseDataAction } from "../caseSetActions";
import { CaseDataType } from "../caseDataType";
import {
  ID_PLACEHOLDER_NEW,
  IdPlaceholderNew
} from "../../util/dataState/dataStateTypes";

function* saveCase(
  case_: CaseDataType,
  metadata: {
    caseSetId: string;
    caseId: string | IdPlaceholderNew;
  } & CallbackMetadata<CaseDataType>
) {
  const createCase = metadata.caseId === ID_PLACEHOLDER_NEW;

  try {
    const response: Response = yield fetch(
      urlBuilder(createCase ? "cases" : `cases/${metadata.caseId}`),
      {
        method: createCase ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(case_)
      }
    );

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const data = yield response.json();

    yield put(caseSetSaveCaseDataAction.store(data[0], metadata));
  } catch (error) {
    yield put(
      caseSetSaveCaseDataAction.errored(
        `Failed to save case: ${error.message}`,
        metadata
      )
    );
  }
}

export default saveCase;
