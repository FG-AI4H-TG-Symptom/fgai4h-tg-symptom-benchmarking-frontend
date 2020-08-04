import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { paths } from "../../../routes";
import BasicPageLayout from "../../common/BasicPageLayout";
import { addAI } from "../../../data/aiDuck";
import AiImplementationRegistrationComponent from "./AiImplementationRegistrationComponent";

const AiImplementationRegistrationContainer: React.FC<{}> = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const registerAiImplementation = (aiImplementation) => {
    dispatch(addAI(aiImplementation));
    history.push(paths.aiImplementationManager());
  };

  return (
    <BasicPageLayout title="Register an AI implementation">
      <AiImplementationRegistrationComponent
        onRegisterAiImplementation={registerAiImplementation}
      />
    </BasicPageLayout>
  );
};

export default AiImplementationRegistrationContainer;
