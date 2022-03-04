import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';

import sty from './index.module.scss';

import Nav from '../../components/nav'

import lo from '../../img/lo.jpg';
// import { http } from '../../utils/http'
import axios from "axios"


const FormRight = () => {
    const onFinish = (values) => {
      console.log('Success:', values);
      axios.post('/api/u/login', {
        ...values
      })
      .then((data)=>{
        message.info(data);
        localStorage.setItem("lt_token", data)
      })
      .catch((e)=>{
        message.info(e);
      })
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
          <h2>登录论坛</h2>
        <Form.Item
          label="用户名"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录账号
          </Button>
        </Form.Item>
      </Form>
    );
  };

class Login extends Component {

  state = {

  }

  componentDidMount() {


  }

  render() {
    return (
      <div className={sty.box}>
        <Nav></Nav>

        {/* 中间区域 */}
        <div className={sty.contentBox}>
            <div className={sty.left}>
              <img  src={lo} alt="" srcset="" />
            </div>
            <div className={sty.right}>
                <FormRight></FormRight>
            </div>
        </div>

      </div >
    );
  }
}

export default Login;