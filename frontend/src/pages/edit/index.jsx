import React, {
    useState
} from 'react';
import {
    Form,
    Input,
    Button,
    Radio,
    Breadcrumb,
    Switch,
    message
} from 'antd';

import sty from './index.module.scss';

import Nav from '../../components/nav'
import ReactWEditor from 'wangeditor-for-react';
import Axios from 'axios';

function Edit() {

    const onFinish = (values) => {
        console.log('Success:', values);
        Axios.post('http://localhost:8080/article/create', values)
        .then((data)=>{
            message.info(data);
        })
        .catch((e)=>{
            message.info(e);
        })
    };

    return (  
    <div className={sty.box}>
        <Nav></Nav>

        {/* 中间区域 */}
        <div className={sty.contentBox}>
        <div className={sty.breadcrumbBox}>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>UFmingle</Breadcrumb.Item>
                <Breadcrumb.Item>POST</Breadcrumb.Item>
              </Breadcrumb>
        </div>
        <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            onFinish={onFinish}
            >
            <Form.Item label="title" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="article type" name='type'>
                <Radio.Group>
                    <Radio value={'normal'}>normal</Radio>
                    <Radio value={'academic'}>Love Story Shareing</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="advance" name='choice'>
                <Switch>receive message alert</Switch>
            </Form.Item>
            <Form.Item label="content" name='content'>
            <ReactWEditor
                defaultValue={'<h1>title</h1>'}
                linkImgCallback={(src,alt,href) => {
                    // 插入网络图片的回调事件
                    console.log('image src ', src)
                    console.log('word illustration for image',alt)
                    console.log('link',href)
                }}
                onlineVideoCallback={(video) => {
                    // 插入网络视频的回调事件
                    console.log('insert video', video)
                }}
                />
            </Form.Item>
            <Form.Item wrapperCol={{
                offset: 12,
                span: 16,
            }}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
            </Form>
            
        </div>
      </div >
    )}


export default Edit;