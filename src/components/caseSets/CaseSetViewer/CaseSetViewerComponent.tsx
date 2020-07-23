import React from "react";
import { Paper } from "@material-ui/core";

import { CaseSetInfo } from "../../../data/caseSets/caseSetDataType";
import ViewRaw from "../../common/ViewRaw";
import TabFactory, { TabFactoryEntry } from "../../common/TabFactory";

import CaseSetViewerTable from "./CaseSetViewerTable";
import CaseSetViewerAnalysis from "./CaseSetViewerAnalysis";
import CaseSetEditor from "./CaseSetEditor";

export interface CaseSetComponentProps {
  caseSet: CaseSetInfo;
  saveCaseSet: (caseSet: CaseSetInfo) => void;
  deleteCase: any;
}

const CaseSetViewerComponent: React.FC<CaseSetComponentProps> = ({
  caseSet,
  saveCaseSet,
  deleteCase,
}) => {
  const tabs: TabFactoryEntry[] = [
    {
      id: "table-view",
      name: "Table",
      componentCallback: (): JSX.Element => (
        <CaseSetViewerTable caseSet={caseSet} />
      ),
      noPadding: true,
    },
    {
      id: "editor",
      name: "Editor",
      componentCallback: (): JSX.Element => (
        <CaseSetEditor
          caseSet={caseSet}
          saveCaseSet={saveCaseSet}
          deleteCase={deleteCase}
        />
      ),
      noPadding: true,
    },
    {
      id: "analysis",
      name: "Analysis",
      componentCallback: (): JSX.Element => (
        <CaseSetViewerAnalysis caseSet={caseSet.cases} />
      ),
    },
    {
      id: "raw",
      name: "Raw",
      componentCallback: (): JSX.Element => <ViewRaw data={caseSet} />,
    },
    {
      id: "export",
      name: "Export",
      componentCallback: (): null => null,
      disabled: true,
    },
  ];

  return (
    <Paper>
      <TabFactory
        ariaPrefix="case-set-viewing"
        ariaLabel="case set viewing mode tabs"
        tabs={tabs}
        stateStorage="hash"
      />
    </Paper>
  );
};

export default CaseSetViewerComponent;
