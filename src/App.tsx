import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import * as Styled from './App.style';
import { routes } from './routes';
import NotFound from './components/common/NotFound';
import { RootState } from './data/rootReducer';
import Error from './components/common/Error';
import Notifications from './components/common/Notifications';
import { fetchAIs } from './data/aiDuck';
import { fetchDatasets } from './data/datasetDuck';
import { fetchSessions } from './data/sessionsDuck';
import MiniDrawer from './MiniDrawer';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAIs());
    dispatch(fetchDatasets());
    dispatch(fetchSessions());
  }, []);

  const fatalError = useSelector<RootState, string>((state) => state.application.fatalError);

  return (
    <>
      <Notifications />
      <MiniDrawer>
        <Styled.Main>
          {fatalError ? (
            <Error error={fatalError} />
          ) : (
            <Switch>
              {routes.map(({ id, path, component, exact }) => (
                <Route key={id} path={path} component={component} exact={exact} />
              ))}
              <Route component={NotFound} />
            </Switch>
          )}
        </Styled.Main>
      </MiniDrawer>
    </>
  );
};

export default App;
