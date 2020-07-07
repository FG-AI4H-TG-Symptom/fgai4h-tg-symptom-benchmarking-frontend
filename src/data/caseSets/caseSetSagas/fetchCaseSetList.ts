import { put } from "redux-saga/effects";

import urlBuilder from "../../util/urlBuilder";
import httpResponseErrorMessage from "../../util/httpResponseErrorMessage";
import { caseSetListDataActions } from "../caseSetActions";

function* fetchCaseSetList() {
  try {
    const response: Response = yield fetch(urlBuilder("case-sets"));

    if (!response.ok) {
      throw new Error(httpResponseErrorMessage(response));
    }

    const data = yield response.json();

    yield put(caseSetListDataActions.store(data));
  } catch (error) {
    yield put(
      caseSetListDataActions.errored(
        `Failed to fetch case set list: ${error.message}`
      )
    );
  }
}

export default fetchCaseSetList;
