// import 'core-js/es'  
// import 'react-app-polyfill/ie9'  
// import 'react-app-polyfill/stable'
import 'polyfill-array-includes';
import React, { Component } from 'react';
import { ConfigProvider } from 'antd';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import store from './redux/store';
import App from './App';
import zh_CN from 'antd/es/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import moment from 'moment';

import './index.scss';  

moment.locale('zh-cn');
ReactDOM.render(
  <ConfigProvider locale={zh_CN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>, 
  document.getElementById('root')
);
