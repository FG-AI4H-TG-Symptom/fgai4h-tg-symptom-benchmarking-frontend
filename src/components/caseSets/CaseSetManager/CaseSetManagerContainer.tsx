import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box } from '@material-ui/core';

import CaseSetManagerComponent from './CaseSetManagerComponent';
import BasicPageLayout from '../../common/BasicPageLayout';
import LinkWrapper from '../../common/LinkWrapper';
import { paths } from '../../../routes';

import { fetchDatasets, deleteDataset } from '../../../data/datasetDuck';
import { queueNotification } from '../../../data/application/applicationActions';

const CaseSetManagerContainer: React.FC = () => {
  const dispatch = useDispatch();

  const datasetsList = useSelector((state: any) => state.datasets.list);
  const sessions = useSelector((state: any) => state.sessions.list);

  // fetch Datasets once, when the component is mounted
  useEffect(() => {
    dispatch(fetchDatasets());
  }, []);

  const deleteCaseSet = (caseSetId: string): void => {
    const sessionUsingThisCaseSet = sessions
      .filter((session) => session.caseSet === caseSetId)
      .map((session) => session.id);

    if (sessionUsingThisCaseSet.length > 0) {
      dispatch(
        queueNotification({
          message: `Please first delete Benchmarking sessions with the following IDs: ${sessionUsingThisCaseSet.join(
            ', ',
          )} `,
          type: 'error',
        }),
      );
      return;
    }

    dispatch(deleteDataset({ caseSetId }));
  };

  return (
    <BasicPageLayout title="Case sets">
      <CaseSetManagerComponent
        datasetsList={datasetsList.slice().sort((a, b) => a.name.localeCompare(b.name))}
        deleteCaseSet={deleteCaseSet}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <Box>
          <LinkWrapper to={paths.caseSetGenerator()}>
            <Button variant="contained" color="primary">
              Generate Case Set
            </Button>
          </LinkWrapper>
        </Box>
        {/* <Box ml={1}>
          <LinkWrapper to={paths.datasetCreator()}>
            <Button variant="contained" color="primary">
              Create Empty Dataset
            </Button>
          </LinkWrapper>
        </Box> */}
      </Box>
    </BasicPageLayout>
  );
};

export default CaseSetManagerContainer;
