import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';

import sty from './index.module.scss';

import Nav from '../../components/nav'

import lo from '../../img/lo.jpg';
// import { http } from '../../utils/http'
import axios from "axios"

// import { Link, useHistory } from 'react-router-dom';

const FormRight = () => {
    // const history = useHistory();
    const onFinish = (values) => {
      console.log('Success:', values);
      axios.post('http://localhost:8080/u/login', {
        ...values
      }, {headers: {
              'Content-Type': 'application/json'
          },
          withCredentials: true
    }).then((data)=>{
        if(data.status === 200){
          console.log(data)
          message.info(data);
          sessionStorage.setItem("lt_token", values.username);
          window.location.href = "/"
        }
        
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
          <h2>login to the forum</h2>
        <Form.Item
          label="username"
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
          label="password"
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
            login account
          </Button>
          {/* <Button type="primary" onClick={()=>{
            history.push('/edit');
          }}>
            login account
          </Button> */}
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