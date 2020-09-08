import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button } from '@material-ui/core';
import { paths } from '../../../routes';
import { fetchAIs, deleteAI } from '../../../data/aiDuck';

import BasicPageLayout from '../../common/BasicPageLayout';
import LinkWrapper from '../../common/LinkWrapper';
import AiImplementationManagerComponent from './AiImplementationManagerComponent';

const AiImplementationManagerContainer: React.FC = () => {
  const dispatch = useDispatch();

  const deleteAiImplementation = (aiId) => {
    dispatch(deleteAI(aiId));
  };

  // fetch AIs once, when the component is mounted
  useEffect(() => {
    dispatch(fetchAIs());
  }, []);

  const aisList = useSelector((state: any) => state.AIs.list);
  const aisHealth = useSelector((state: any) => state.AIs.health);

  return (
    <BasicPageLayout title="AI implementations">
      <AiImplementationManagerComponent
        aiImplementations={aisList}
        aisHealth={aisHealth}
        deleteAiImplementation={deleteAiImplementation}
      />

      <Box display="flex" justifyContent="flex-end" mt={2}>
        <LinkWrapper to={paths.aiImplementationRegistration()}>
          <Button variant="contained" color="primary">
            Add AI implementation
          </Button>
        </LinkWrapper>
      </Box>
    </BasicPageLayout>
  );
};

export default AiImplementationManagerContainer;
