import React, {
    useEffect,
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
import {useLocation, useParams} from "react-router-dom";

function Article() {
    const [article, setArticle] = useState([])
    const {id : articleId} = useParams()
    console.log("This is article ID ")
    const onFinish = () => {
        Axios.get('http://localhost:8080/article/view/'+articleId,
            {headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                withCredentials: true
            })
            .then((response)=>{
                setArticle(response.data);
            })
            .catch((e)=>{
                message.info(e);
            })
    };
    useEffect(() => {
        onFinish()
    }, [articleId])
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
                <h1>{article.title}</h1>


                <pre>{article.content}</pre>

            </div>
        </div >
    )
}

// function getArticle() {
//     var url = "http://localhost:8080/article/view"
//
// }

export default Article;