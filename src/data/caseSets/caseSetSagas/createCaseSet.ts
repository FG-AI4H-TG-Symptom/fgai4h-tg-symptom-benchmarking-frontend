import { put } from "redux-saga/effects";

import { CallbackMetadata } from "../../util/dataState/generateDataStateActions";
import urlBuilder from "../../util/urlBuilder";
import httpResponseErrorMessage from "../../util/httpResponseErrorMessage";
import {
  createCaseSetDataActions,
  CreateCaseSetParameters
} from "../caseSetActions";
import { CaseSetInfo } from "../caseSetDataType";

function* createCaseSet(
  { numberOfCases }: CreateCaseSetParameters,
  metadata: CallbackMetadata<CaseSetInfo>
) {
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

    yield put(createCaseSetDataActions.store(data[0], metadata));
  } catch (error) {
    yield put(
      createCaseSetDataActions.errored(
        `Failed to create case set: ${error.message}`
      )
    );
  }
}

export default createCaseSet;
