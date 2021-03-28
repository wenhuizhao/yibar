import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React from "react";
import YibarComponent from "./YibarComponent";
import GraphComponent from "./GraphComponent";
import MorgageComponent from "./MorgageComponent";
import AboutComponent from "./AboutComponent";
import IndexComponent from './IndexComponent';
import UcComponent from './UcComponent';
import UcDataAllComponent from './UcDataAllComponent';
import UcDataComponent from './UcDataComponent';
import UcRankComponent from './UcRankComponent';
import UcMapComponent from './UcMapComponent';
import SchoolAreaComponent from './SchoolAreaComponent';

const AppRouter = () => {
  const [value, setValue] = React.useState(0);
  console.log("AppRouter: value", value);
  return (
    <div>
      <Router>
        <Switch>
        <Route
            path="/"
            exact
            render={props => (
              <UcComponent {...props} value={value} setValue={setValue} />
            )}
          />
          <Route
            path="/schoolarea"
            render={props => (
              <SchoolAreaComponent {...props} value={value} setValue={setValue} />
            )}
          />
          <Route
            path="/links"
            render={props => (
              <IndexComponent {...props} value={value} setValue={setValue} />
            )}
          />

          <Route
            path="/ucdataall"
            render={props => (
              <UcDataAllComponent {...props} value={value} setValue={setValue} />
            )}
          />

          <Route
            path="/yibar"
            exact
            render={props => (
              <YibarComponent {...props} value={value} setValue={setValue} />
            )}
          />
          <Route
            path="/morgage"
            render={props => (
              <MorgageComponent {...props} value={value} setValue={setValue} />
            )}
          />
          <Route
            path="/graph"
            render={props => (
              <GraphComponent {...props} value={value} setValue={setValue} />
            )}
          />
          <Route
            path="/ucdata"
            render={props => (
              <UcDataComponent {...props} value={value} setValue={setValue} />
            )}
          />
          <Route
            path="/ucrank"
            render={props => (
              <UcRankComponent {...props} value={value} setValue={setValue} />
            )}
          />
          <Route
            path="/ucmap"
            render={props => (
              <UcMapComponent {...props} value={value} setValue={setValue} />
            )}
          />

          <Route
            path="/about"
            render={props => (
              <AboutComponent {...props} value={value} setValue={setValue} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

// const style={
//     //marginTop:'20px'
//     flex:1
// }

export default AppRouter;
