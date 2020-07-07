import { put } from "redux-saga/effects";

import { CallbackMetadata } from "../../util/dataState/generateDataStateActions";
import urlBuilder from "../../util/urlBuilder";
import httpResponseErrorMessage from "../../util/httpResponseErrorMessage";
import { caseSetSaveDataAction } from "../caseSetActions";
import { CaseSetInfo } from "../caseSetDataType";
import {
  ID_PLACEHOLDER_NEW,
  IdPlaceholderNew
} from "../../util/dataState/dataStateTypes";

function* saveCaseSet(
  caseSet: CaseSetInfo,
  metadata: { caseSetId: string | IdPlaceholderNew } & CallbackMetadata<
    CaseSetInfo
  >
) {
  const createCaseSet = metadata.caseSetId === ID_PLACEHOLDER_NEW;

  const backendFormattedCaseSet = caseSet;
  if (caseSet.cases.length > 0 && typeof caseSet.cases[0] !== "string") {
    // the backend expects only case IDs, no data
    (backendFormattedCaseSet as any).cases = caseSet.cases.map(({ id }) => id);
  }

  try {
    const response: Response = yield fetch(
      urlBuilder(
        createCaseSet ? "case-sets" : `case-sets/${metadata.caseSetId}`
      ),
      {
        method: createCaseSet ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(backendFormattedCaseSet)
      }
    );

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const data = yield response.json();

    yield put(caseSetSaveDataAction.store(data[0], metadata));
  } catch (error) {
    yield put(
      caseSetSaveDataAction.errored(
        `Failed to save case set: ${error.message}`,
        metadata
      )
    );
  }
}

export default saveCaseSet;
