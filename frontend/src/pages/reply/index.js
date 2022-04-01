import React, { Component, useState, useEffect } from 'react';
import {Breadcrumb, Carousel, Badge, Avatar, Button, message, Card, List, Comment, Form} from 'antd';
import { UserOutlined, ManOutlined } from '@ant-design/icons';

import sty from './index.module.scss';
import { useLocation, useParams } from "react-router-dom";
import Nav from '../../components/nav'
import ReactWEditor from 'wangeditor-for-react';
import Axios from 'axios';
import uf_news_1 from "../../img/uf_news_1.png";
import uf_news_2 from "../../img/uf_news_2.png";
import uf_news_3 from "../../img/uf_news_3.png";
import uf_news_4 from "../../img/uf_news_4.png";

function Reply() {
  const contentStyle = {
    height: '120px',
    color: '#fff',
    lineHeight: '120px',
    textAlign: 'center',
    background: '#364d79',
  };
  const [article, setArticle] = useState([])
  const [comment, setComment] = useState([[]])
  const { id: articleId } = useParams()
  console.log("This is article ID ")
  const onFinish = () => {
    Axios.all([Axios.get(`http://localhost:8080/article/view/${articleId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        })
        .then((response) => {
          //comment = response.data
          setArticle(response.data);

        })
        .catch((e) => {
          message.info(e);
        }), Axios.get(`http://localhost:8080/article/comment_view/${articleId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          withCredentials: true
        })
        .then((response) => {
          let commentt = response.data
          setComment(response.data);
          console.log(comment)
          //document.getElementById("commentt").innerHTML=commentt;
        })
        .catch((e) => {
          message.info(e);
        })]).then()

  };
  useEffect(() => {
    onFinish()
    //getComment()
  }, [articleId])

  const onComment = (values) =>{
    Axios.post(`http://localhost:8080/article/comment/${articleId}`, values, {headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    })
        .then((data)=>{
          message.info(data);
          if(data.status === 200){
            //await message.success('COMMENT SUCCESS!'); // 打印message后再跳转
            window.location.href = `/reply/${articleId}`;
          }
        })
        .catch((e)=>{
          message.info(e);
        })
  }

  return (
    <div className={sty.box}>
      <Nav></Nav>

      {/* 中间区域 */}
      <div className={sty.contentBox}>
        <div className={sty.bottomBox}>
          <div className={sty.headCard}>
            <div className={sty.headLeft}>
              <div className={sty.titleleft}>
                <h2>{article.title}</h2>
                <p className={sty.red}></p>
              </div>
              <div className={sty.divider}></div>
              <div className={sty.titleright}>
                <p>UFmingle</p>
                <p>13/13456</p>
              </div>
            </div>
            <div className={sty.headRight}>
              <Carousel autoplay>
                <div>
                  <h3 style={contentStyle} ><img  style={contentStyle} src={uf_news_1} alt="UF" srcSet=""/></h3>
                </div>
                <div>
                  <h3 style={contentStyle}><img  style={contentStyle} src={uf_news_2} alt="UF" srcSet=""/></h3>
                </div>
                <div>
                  <h3 style={contentStyle}><img  style={contentStyle} src={uf_news_3} alt="UF" srcSet=""/></h3>
                </div>
                <div>
                  <h3 style={contentStyle}><img  style={contentStyle} src={uf_news_4} alt="UF" srcSet=""/></h3>
                </div>
              </Carousel>
            </div>
          </div>
          <Card style={{ width: "100%" }}>
            <p dangerouslySetInnerHTML={{ __html: article.content }}></p>
          </Card>




          <List
              className="comment-list"
              dataSource={comment}
              renderItem={item => (
                  <li>
                    <div className={sty.contentCard}>
                      <div className={sty.contentLeft}>
                        <div className={sty.avatarLeft}>
                          <h3>Username</h3>
                          <p>articles 0</p>
                          <p>flowers 0</p>
                          <p>reputation 0</p>
                          <p>mingle coin 0</p>
                          <p>last time log in 0</p>
                        </div>
                        <div className={sty.avatarRight}>
                          <Badge count={<ManOutlined style={{ color: '#fff' }} />}>
                            <Avatar size={64} icon={<UserOutlined />} />
                          </Badge>
                          <div>
                            <Button size='small' shape="round">
                              Subscribe
                            </Button>
                            <Button size='small' shape="round">
                              Message
                            </Button>
                          </div>

                        </div>
                      </div>

                      <div className={sty.contentRight} >
                        <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                      </div>
                      <span className={sty.contentPage}>1</span>
                    </div>
                  </li>
              )}
          />
          {/*  <div className={sty.contentCard}>*/}
          {/*    <div className={sty.contentLeft}>*/}
          {/*      <div className={sty.avatarLeft}>*/}
          {/*        <h3>hhhhh</h3>*/}
          {/*        <p>articles 0</p>*/}
          {/*        <p>flowers 0</p>*/}
          {/*        <p>reputation 0</p>*/}
          {/*        <p>mingle coin 0</p>*/}
          {/*        <p>last time log in 0</p>*/}
          {/*      </div>*/}
          {/*      <div className={sty.avatarRight}>*/}
          {/*        <Badge count={<ManOutlined style={{ color: '#fff' }} />}>*/}
          {/*          <Avatar size={64} icon={<UserOutlined />} />*/}
          {/*        </Badge>*/}
          {/*        <div>*/}
          {/*          <Button size='small' shape="round">*/}
          {/*            Subscribe*/}
          {/*          </Button>*/}
          {/*          <Button size='small' shape="round">*/}
          {/*            Message*/}
          {/*          </Button>*/}
          {/*        </div>*/}

          {/*      </div>*/}
          {/*    </div>*/}

          {/*    <div className={sty.contentRight} >*/}
          {/*      <article >{comment[0].content}</article>*/}

          {/*    </div>*/}
          {/*    <span className={sty.contentPage}>1</span>*/}
          {/*  </div>*/}

          {/*<div className={sty.contentCard}>*/}
          {/*  <div className={sty.contentLeft}>*/}
          {/*    <div className={sty.avatarLeft}>*/}
          {/*      <h3>Ivy</h3>*/}
          {/*      <p>posts 0</p>*/}
          {/*      <p>followers 0</p>*/}
          {/*      <p>reputation 0</p>*/}
          {/*      <p>mingle coin 0</p>*/}
          {/*      <p>last time login 0</p>*/}
          {/*    </div>*/}
          {/*    <div className={sty.avatarRight}>*/}
          {/*      <Badge count={<ManOutlined style={{ color: '#fff' }} />}>*/}
          {/*        <Avatar size={64} icon={<UserOutlined />} />*/}
          {/*      </Badge>*/}
          {/*      <div>*/}
          {/*        <Button size='small' shape="round">*/}
          {/*          subscribe*/}
          {/*        </Button>*/}
          {/*        <Button size='small' shape="round">*/}
          {/*          message*/}
          {/*        </Button>*/}
          {/*      </div>*/}

          {/*    </div>*/}
          {/*  </div>*/}
          {/*  <div className={sty.contentRight}>*/}
          {/*    comment 2*/}
          {/*  </div>*/}
          {/*  <span className={sty.contentPage}>2</span>*/}
          {/*</div>*/}
        </div>
        <div className={sty.replyBox}>
          <div className={sty.breadcrumbBox}>
            <Breadcrumb>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>block list</Breadcrumb.Item>
              <Breadcrumb.Item>UFmingle</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <Form
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 20 }}
              layout="horizontal"
              onFinish={onComment}
          >
            <Form.Item label="content" name='content'>
              <ReactWEditor
                className={sty.editor}
                defaultValue={'<h1>title</h1>'}
                linkImgCallback={(src, alt, href) => {
                  // 插入网络图片的回调事件
                  console.log('image src ', src)
                  console.log('image description', alt)
                  console.log('href', href)
                }}

                onlineVideoCallback={(video) => {
                  // 插入网络视频的回调事件
                  console.log('post video content', video)
                }}
                onChange={(html) => {
                  //console.log('onChange html:', html)
                }}
                onBlur={(html) => {
                  console.log('onBlur html:', html)
                }}
                onFocus={(html) => {
                  console.log('onFocus html:', html)
                }}
              />
            </Form.Item>
            <Form.Item wrapperCol={{
              offset: 12,
              span: 16,
            }}>
              <Button type="primary" htmlType="submit">REPLY</Button>
            </Form.Item>
          </Form>
          {/*<Button type="primary" shape="round" danger >*/}
          {/*  reply*/}
          {/*</Button>*/}
        </div>

      </div>
    </div >
  );
}

export default Reply;
