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
        Axios.post('/article/create', values)
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
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>缘分天空</Breadcrumb.Item>
                <Breadcrumb.Item>发表主题</Breadcrumb.Item>
              </Breadcrumb>
        </div>
        <Form
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            onFinish={onFinish}
            >
            <Form.Item label="主题标题" name="title">
                <Input />
            </Form.Item>
            <Form.Item label="发帖类型" name='type'>
                <Radio.Group>
                    <Radio value={'normal'}>普通</Radio>
                    <Radio value={'academic'}>学术消息</Radio>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="高级选项" name='choice'>
                <Switch>接收消息提醒</Switch>
            </Form.Item>
            <Form.Item label="主题内容" name='content'>
            <ReactWEditor
                defaultValue={'<h1>标题</h1>'}
                linkImgCallback={(src,alt,href) => {
                    // 插入网络图片的回调事件
                    console.log('图片 src ', src)
                    console.log('图片文字说明',alt)
                    console.log('跳转链接',href)
                }}
                onlineVideoCallback={(video) => {
                    // 插入网络视频的回调事件
                    console.log('插入视频内容', video)
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