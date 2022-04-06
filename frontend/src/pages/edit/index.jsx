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
//import ReactWEditor from 'wangeditor-for-react';
import {extend} from "wangeditor-for-react";
import Axios from 'axios';
import i18next from "i18next";

function Edit() {

    const ReactWEditorOfLang = extend({i18next})

    const onFinish = (values) => {

        Axios.post('http://localhost:8080/article/create', values, {headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then((data)=>{
            message.info(data);
            window.location.href = "/"
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
            {/*<ReactWEditor*/}
            {/*    defaultValue={'<h1>title</h1>'}*/}
            {/*    linkImgCallback={(src,alt,href) => {*/}
            {/*        // 插入网络图片的回调事件*/}
            {/*        console.log('image src ', src)*/}
            {/*        console.log('word illustration for image',alt)*/}
            {/*        console.log('link',href)*/}
            {/*    }}wangEditor: upload image return results error，return results errno=undefined*/}
            {/*    onlineVideoCallback={(video) => {*/}
            {/*        // 插入网络视频的回调事件*/}
            {/*        console.log('insert video', video)*/}
            {/*    }}*/}
            {/*    />*/}
                <ReactWEditorOfLang
                    config = {{
                        lang: 'en',
                        uploadImgServer: 'http://localhost:8080/image/upload',
                        uploadImgHeaders: {
                            Accept: 'application/json'
                        },
                        uploadFileName: 'file[]'
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
