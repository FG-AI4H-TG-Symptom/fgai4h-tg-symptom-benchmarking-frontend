import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip, Button } from "@material-ui/core";
import { Add as CreateIcon } from "@material-ui/icons";
import { paths } from "../../../routes";
import { fetchAIs, addAI, deleteAI } from "../../../data/aiDuck";

import BasicPageLayout from "../../common/BasicPageLayout";
import LinkWrapper from "../../common/LinkWrapper";
import AiImplementationManagerComponent from "./AiImplementationManagerComponent";

const AiImplementationManagerContainer: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const deleteAiImplementation = aiId => {
    dispatch(deleteAI(aiId));
  };

  // fetch AIs once, when the component is mounted
  useEffect(() => {
    dispatch(fetchAIs());
  }, []);

  const aisList = useSelector((state: any) => state.AIs.list);
  const aisHealth = useSelector((state: any) => state.AIs.health);

  return (
    <BasicPageLayout
      title="AI implementations"
      action={
        <LinkWrapper to={paths.aiImplementationRegistration()}>
          <Tooltip title="Register new AI implementation">
            <IconButton>
              <CreateIcon />
            </IconButton>
          </Tooltip>
        </LinkWrapper>
      }
    >
      <AiImplementationManagerComponent
        aiImplementations={aisList}
        aisHealth={aisHealth}
        deleteAiImplementation={deleteAiImplementation}
      />
    </BasicPageLayout>
  );
};

export default AiImplementationManagerContainer;
