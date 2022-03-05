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

function Article() {
    const [articles, setArticles] = useState([])
    const onFinish = () => {
        Axios.get('/view/1')
            .then((data)=>{
                setArticles(data);
            })
            .catch((e)=>{
                message.info(e);
            })
    };
    onFinish();
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
                <h1>Hello</h1>


                <pre>hello hello</pre>

            </div>
        </div >
    )
}


export default Article;