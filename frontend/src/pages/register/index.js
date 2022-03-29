import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';

import sty from './index.module.scss';

import Nav from '../../components/nav'

import lo from '../../img/login.png';
// import { http } from '../../utils/http'
import axios from "axios"


const FormRight = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
    axios.post('http://localhost:8080/u/register', {
      ...values
    })
      .then(async(data) => {
        if(data.status === 200){

            // message.info(data);
          // sessionStorage.setItem("lt_token", data) 避免注册成功后自动登录
        
         await message.success('Registration Successful'); // 打印message后再跳转
         window.location.href = "/login";
          
        }
        
      })
      .catch((e) => {
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
      <h2>Account Registration</h2>
        <Form.Item
            label="Gatorlink"
            name="gatorlink"
            rules={[
                {
                    required: true,
                    message: 'Please input your gatorID!',
                },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            label="GatorPW"
            name="gatorPW"
            rules={[
                {
                    required: true,
                    message: 'Please input your gatorID password!',
                },
            ]}
        >
            <Input.Password />
        </Form.Item>
        <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please create your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please create your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Gender"
        name="gender"
        rules={[
          {
            required: true,
            message: 'Please input your gender!',
          },
        ]}
      >
        <Radio.Group>
          <Radio value={1}>Male</Radio>
          <Radio value={2}>Female</Radio>
        </Radio.Group>
      </Form.Item> */}

      <Form.Item
        wrapperCol={{
          offset: 4,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          register account
        </Button>
      </Form.Item>
    </Form>
  );
};

class Register extends Component {

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
            <img src={lo} alt="" srcset="" />
          </div>
          <div className={sty.right}>
            <FormRight></FormRight>
          </div>
        </div>

      </div >
    );
  }
}

export default Register;
