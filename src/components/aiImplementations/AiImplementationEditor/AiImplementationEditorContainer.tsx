import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import { paths } from "../../../routes";
import BasicPageLayout from "../../common/BasicPageLayout";
import { fetchAI } from "../../../data/aiDuck";
import AiImplementationEditorComponent from "./AiImplementationEditorComponent";

const AiImplementationEditorContainer: React.FC<{}> = () => {
  const { aiImplementationId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  // fetch AI once, when the component is mounted
  useEffect(() => {
    dispatch(fetchAI(aiImplementationId));
  }, []);

  const editingAI = useSelector((state: any) => state.AIs.editingAI);

  // eslint-disable-next-line no-unused-vars
  const saveAiImplementation = (aiImplementation) => {
    // TODO: dispatch(saveAI(aiImplementation));
    history.push(paths.aiImplementationManager());
  };

  return (
    <BasicPageLayout title={`Edit ${editingAI?.name} implementation`}>
      <AiImplementationEditorComponent
        onSaveAiImplementation={saveAiImplementation}
        name={editingAI?.name || ""}
        baseUrl={editingAI?.baseUrl || ""}
      />
    </BasicPageLayout>
  );
};

export default AiImplementationEditorContainer;