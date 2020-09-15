import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import { Check as CheckIcon, Clear as ClearIcon } from "@material-ui/icons";

import { CaseSetInfo } from "../../../data/caseSets/caseSetDataType";
import { ClinicalFindingState } from "../../../data/caseSets/berlinModelTypes";
import TextWithTooltipSelf from "../../common/TextWithTooltipSelf";

import * as Styled from "./CaseSetViewerTable.style";

const PresenceIcon: React.FC<{ presence: ClinicalFindingState }> = ({
  presence,
}) => (
  <Tooltip title={presence}>
    {presence === "present" ? <CheckIcon /> : <ClearIcon />}
  </Tooltip>
);

const rowsPerPageOptions = [10, 20, 50, 100];

export interface CaseSetComponentProps {
  caseSet: any;
}

const CaseSetViewerTable: React.FC<CaseSetComponentProps> = ({
  caseSet: { cases },
}) => {
  const activeRowsPerPageOptions = rowsPerPageOptions.filter(
    (rowsPerPageOption) => rowsPerPageOption <= cases.length
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  return (
    <>
      {cases.length > rowsPerPageOptions[0] ? (
        <TablePagination
          component="div"
          count={cases.length}
          page={page}
          onChangePage={(event, newPage): void => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={activeRowsPerPageOptions}
          onChangeRowsPerPage={(event): void => {
            setPage(0);
            setRowsPerPage(parseInt(event.target.value, 10));
          }}
        />
      ) : null}
      <TableContainer>
        <Table>
          <caption>{cases.length} cases</caption>
          <TableHead>
            <TableRow>
              <Styled.CaseIdCell>Case ID</Styled.CaseIdCell>
              <TableCell>Case creator</TableCell>
              {/* <TableCell>Description</TableCell> */}
              {/* <TableCell>Spreadsheet case ID</TableCell> */}
              <TableCell>Age</TableCell>
              <TableCell>Biological sex</TableCell>
              <TableCell>Presenting complaints</TableCell>
              <TableCell>Other features</TableCell>
              <TableCell>Condition</TableCell>
              <TableCell>Expected triage level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cases
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((case_) => {
                const { metaData, caseData } = case_.data;
                return (
                  <TableRow key={case_.id}>
                    <Styled.CaseIdCell>
                      <TextWithTooltipSelf>{case_.id}</TextWithTooltipSelf>
                    </Styled.CaseIdCell>

                    <TableCell>
                      WhatIsCaseCreator?
                      {/* {metaData.caseCreator} */}
                    </TableCell>

                    {/* <Styled.CaseDescriptionCell>
                      <TextWithTooltipSelf>
                        {metaData?.description}
                      </TextWithTooltipSelf>
                    </Styled.CaseDescriptionCell> */}

                    <TableCell>
                      {metaData?.spreadsheetCaseId}
                    </TableCell>
                    <TableCell>{caseData.profileInformation.age}</TableCell>
                    <TableCell>
                      {caseData.profileInformation.biologicalSex}
                    </TableCell>
                    <TableCell>
                      {caseData.presentingComplaints.map(
                        ({ id: presentingComplaintId, name, state }) => (
                          <Styled.IconWrapper
                            key={`${case_.id}_${presentingComplaintId}`}
                          >
                            <PresenceIcon presence={state} />
                            {name}
                          </Styled.IconWrapper>
                        )
                      )}
                    </TableCell>
                    <TableCell>
                      {caseData.otherFeatures.map(
                        ({ id: otherFeatureId, name, state }) => (
                          <Styled.IconWrapper
                            key={`${case_.id}_${otherFeatureId}`}
                          >
                            <PresenceIcon presence={state} />
                            {name}
                          </Styled.IconWrapper>
                        )
                      )}
                    </TableCell>
                    <TableCell>
                      {case_.data.valuesToPredict.expectedCondition?.name}
                    </TableCell>
                    <TableCell>
                      {case_.data.valuesToPredict.expectedTriageLevel}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default CaseSetViewerTable;
