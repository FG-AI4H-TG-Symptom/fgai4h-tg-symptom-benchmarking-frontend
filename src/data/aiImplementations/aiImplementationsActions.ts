import generateDataStateActions, {
  CallbackMetadata
} from "../util/dataState/generateDataStateActions";

import {
  AiImplementationHealth,
  AiImplementationInfo
} from "./aiImplementationDataType";

export enum AiImplementationsActionTypes {
  AI_IMPLEMENTATION_CREATE_DATA_ACTION = "AI_IMPLEMENTATION_CREATE_DATA_ACTION",
  AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION = "AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION",
  AI_IMPLEMENTATION_HEALTH_DATA_ACTION = "AI_IMPLEMENTATION_HEALTH_DATA_ACTION",
  AI_IMPLEMENTATION_DELETE_DATA_ACTION = "AI_IMPLEMENTATION_DELETE_DATA_ACTION"
}

export const aiImplementationRegisterDataAction = generateDataStateActions<
  AiImplementationInfo,
  AiImplementationInfo,
  void,
  CallbackMetadata<AiImplementationInfo>
>(AiImplementationsActionTypes.AI_IMPLEMENTATION_CREATE_DATA_ACTION);

export type AiImplementationListLoadParameters = { withHealth: boolean };

export const aiImplementationOverviewDataAction = generateDataStateActions<
  AiImplementationInfo[],
  AiImplementationListLoadParameters
>(AiImplementationsActionTypes.AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION);

export const aiImplementationHealthDataAction = generateDataStateActions<
  AiImplementationHealth,
  string,
  { aiImplementationId: string }
>(AiImplementationsActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION);

// ACTION CREATORS
export const aiDeleted_LOAD = aiId => {
  return {
    type: "AI_IMPLEMENTATION_DELETE_DATA_ACTION",
    payload: {
      intent: "LOAD",
      parameters: aiId
    },
    meta: {
      aiImplementationId: aiId
    }
  };
};

//wtf there is intent instead of type
export const aiDeleted_STORE = metadata => {
  return {
    type: "AI_IMPLEMENTATION_DELETE_DATA_ACTION",
    payload: {
      data: undefined,
      intent: "STORE"
    },
    meta: metadata
  };
};
