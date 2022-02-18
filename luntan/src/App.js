import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Loadable from "react-loadable";

import sty from "./app.module.scss";

function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        height: "100%",
      }}
    >
      <Spin />
    </div>
  );
}

const Index = Loadable({
  loader: () => import("./pages/Index"),
  loading: Loading,
});


function ToIndex() {
  return <Redirect to="/home" />;
}

class App extends Component {
  componentDidMount() {
 
  }

  render() {
    return (
      <div className={sty.app}>
        <Router>
          <div>
            <Switch>
   
              <Route path='/' exact component={Index} />
                                
            </Switch> 

          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUserinfo(payload) {
      dispatch({
        type: "UPDATE_USERINFO",
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(App);
