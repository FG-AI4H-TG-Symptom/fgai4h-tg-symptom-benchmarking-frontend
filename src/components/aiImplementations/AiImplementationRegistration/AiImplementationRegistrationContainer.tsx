import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { AiImplementationInfo } from "../../../data/aiImplementations/aiImplementationDataType";
import { paths } from "../../../routes";
import BasicPageLayout from "../../common/BasicPageLayout";
import { addAI } from "../../../data/aiDuck";
import AiImplementationRegistrationComponent from "./AiImplementationRegistrationComponent";

const AiImplementationRegistrationContainer: React.FC<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const registerAiImplementation = (
    aiImplementation: AiImplementationInfo
  ): void => {
    dispatch(addAI(aiImplementation));
    history.push(paths.aiImplementationManager());
  };

  // const registeredAiImplementation = useSelector<RootState, LoadableCreateOnly>(
  //   (state) => state.aiImplementations[ID_PLACEHOLDER_NEW] || InitialState
  // );
  // if (registeredAiImplementation.state === DataState.LOADING) {
  //   return (
  //     <>
  //       <Typography variant="h2" gutterBottom>
  //         Registering AI implementation...
  //       </Typography>
  //       <CircularProgress />
  //     </>
  //   );
  // }

  return (
    <BasicPageLayout title="Register an AI implementation">
      <AiImplementationRegistrationComponent
        onRegisterAiImplementation={registerAiImplementation}
      />
    </BasicPageLayout>
  );
};

export default AiImplementationRegistrationContainer;
