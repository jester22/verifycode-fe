import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Routes from './Routes';

import VerifyCode from './components/VerifyCode';
import Success from './components/Success';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={Routes.VERIFY_CODE} exact={true}>
            <VerifyCode codeLength={6}/>
          </Route>
          <Route path={Routes.SUCCESS}>
            <Success />
          </Route>
        </Switch>
  
      </div>
    </Router>
  );
}

export default App;
