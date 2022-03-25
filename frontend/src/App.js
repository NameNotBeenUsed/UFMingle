import React, { Component } from "react";
import { connect } from "react-redux";
import { Spin } from "antd";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate
} from 'react-router-dom'
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
const Login = Loadable({
  loader: () => import("./pages/login/index"),
  loading: Loading,
});
const Me = Loadable({
  loader: () => import("./pages/me/index"),
  loading: Loading,
});
const Reply = Loadable({
  loader: () => import("./pages/reply/index"),
  loading: Loading,
});
const Edit = Loadable({
  loader: () => import("./pages/edit/index"),
  loading: Loading,
});
const Register = Loadable({
  loader: () => import("./pages/register/index"),
  loading: Loading,
});
const Article = Loadable({
  loader: () => import("./pages/article/index"),
  loading: Loading,
});
function ToIndex() {
  return <Navigate to="/home" />;
}

class App extends Component {
  componentDidMount() {
 
  }

  render() {
    return (
      <div className={sty.app}>
        <Router>
          <div className={sty.content}>
            <Routes>
              <Route exact path='/' element={<Index/>}></Route>
              <Route path='/login' element={<Login />} />
              <Route path='/edit' element={<Edit />} />
              <Route path='/me' element={<Me />} />
              <Route path='/reply' element={<Reply />} />
              <Route path='/register' element={<Register />} />
              <Route path='/article/:id' element={<Article />} />
            </Routes>
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
