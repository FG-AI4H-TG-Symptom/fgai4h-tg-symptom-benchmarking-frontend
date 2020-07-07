import dataStateActionSagaWrapperLoadOnly from "../../util/dataState/dataStateActionSagaWrapperLoadOnly";
import { AiImplementationsActionTypes } from "../aiImplementationsActions";
import fetchAiImplementationList from "./fetchAiImplementationList";
import fetchAiImplementationHealth from "./fetchAiImplementationHealth";
import deleteAiImplementation from "./deleteAiImplementation";
import registerAiImplementation from "./registerAiImplementation";

const aiImplementationListSagas = [
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATION_CREATE_DATA_ACTION,
    registerAiImplementation
  ),
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATIONS_OVERVIEW_DATA_ACTION,
    fetchAiImplementationList
  ),
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATION_HEALTH_DATA_ACTION,
    fetchAiImplementationHealth
  ),
  dataStateActionSagaWrapperLoadOnly(
    AiImplementationsActionTypes.AI_IMPLEMENTATION_DELETE_DATA_ACTION,
    deleteAiImplementation
  )
];

export default aiImplementationListSagas;
