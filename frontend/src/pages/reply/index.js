import React, { Component } from 'react';
import { Breadcrumb, Carousel, Badge , Avatar,Button } from 'antd';
import { UserOutlined, ManOutlined } from '@ant-design/icons';

import sty from './index.module.scss';

import Nav from '../../components/nav'
import ReactWEditor from 'wangeditor-for-react';

function Reply() {
  const contentStyle = {
    height: '120px',
    color: '#fff',
    lineHeight: '120px',
    textAlign: 'center',
    background: '#364d79',
  };

    return (
      <div className={sty.box}>
        <Nav></Nav>

        {/* 中间区域 */}
        <div className={sty.contentBox}>
          <div className={sty.bottomBox}>
            <div className={sty.headCard}>
              <div className={sty.headLeft}>
                <div className={sty.titleleft}>
                  <h2>哈哈哈哈哈哈哈哈哈哈哈</h2>
                  <p className={sty.red}>标签：</p>
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
                    <h3 style={contentStyle}>1</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>2</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>3</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>4</h3>
                  </div>
                </Carousel>
              </div>
            </div>

            <div className={sty.contentCard}>
              <div className={sty.contentLeft}>
                <div className={sty.avatarLeft}>
                  <h3>hhhhh</h3>
                  <p>articles 0</p>
                  <p>flowers 0</p>
                  <p>reputation 0</p>
                  <p>mingle coin 0</p>
                  <p>last time log in 0</p>
                </div>
                <div className={sty.avatarRight}>
                  <Badge count={<ManOutlined  style={{ color: '#fff' }} />}>
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
              <div className={sty.contentRight}>
               1111111111111111
                11111111111111111111111111
                111111111111111111111111
                111111111111111111
                1111111111
                111111111111111
                11111111111111112222
                11111111111111111111111111111
                111111111111111
                11111111111111111111111111111111111111
                1111111111111111111111111111111111111
                1111111111111111111111111111111111111
                111111111111111111111111111111111111
                111111111111111111111111111111111
                1111111111111111111111111111111
                1111111111111111111
                111111111111111111
                1111111111
                111111111111111
                11111111111111112222
                11111111111111111111111111111111111111111111
                11111111111111111111111111111111111111
                1111111111111111111111111111111111111
                1111111111111111111111111111111111111
                111111111111111111111111111111111111
                111111111111111111111111111111111
                
                
                1111111111
                111111111111111
                11111111111111112222
                11111111111111111111111111111111111111111111
                11111111111111111111111111111111111111
                1111111111111111111111111111111111111
                1111111111111111111111111111111111111
                111111111111111111111111111111111111
                111111111111111111111111111111111
               
               
                111111111111111
                11111111111111112222
                11111111111111111111111111111111111111111111
                11111111111111111111111111111111111111
                1111111111111111111111111111111111111
                1111111111111111111111111111111111111
                111111111111111111111111111111111111
                111111111111111111111111111111111
                11111111111111111111111111111111111111111111111111
                111111111111111111
                1111111111
                111111111111111
                1111111111111111222211
                111111111111111111111111111111111111111111
                11111111111111111111111111111111111111
                1111111111111111111111111111111111111
                1111111111111111111111111111111111111
                111111111111111111111111111111111111
                111111111111111111111111111111111
                111111111111111111111111
                11111111111111111111111111
                111111111111111111
                1111111111
                111111111111111
                11111111111111112222
                11111111111111111111111111111111111111111111
                11111111111111111111111111111111111111
                1111111111111111111111111111111111111
                1111111111111111111111111111111111111
                111111111111111111111111111111111111
                111111111111111111111111111111111
                1111111111111111111111111
                1111111111111111111111111
                111111111111111111
                1111111111
                111111111111111
                11111111111111112222
              </div>
              <span className={sty.contentPage}>1</span>
            </div>

            <div className={sty.contentCard}>
              <div className={sty.contentLeft}>
                <div className={sty.avatarLeft}>
                  <h3>Ivy</h3>
                  <p>posts 0</p>
                  <p>followers 0</p>
                  <p>reputation 0</p>
                  <p>mingle coin 0</p>
                  <p>last time login 0</p>
                </div>
                <div className={sty.avatarRight}>
                  <Badge count={<ManOutlined  style={{ color: '#fff' }} />}>
                    <Avatar size={64} icon={<UserOutlined />} />
                  </Badge>
                  <div>
                    <Button size='small' shape="round">
                      subscribe
                    </Button>
                    <Button size='small' shape="round">
                      message
                    </Button>
                  </div>
                  
                </div>  
              </div>
              <div className={sty.contentRight}>
                111111111111111
                11111111111111112222
                11111111111111111111111111111
                111111111111111
                11111111111111111111111111111111111111
                1111111111111111111111111111111111111
                1111111111111111111111111111111111111
                111111111111111111111111111111111111
                111111111111111111111111111111111
                1111111111111111111111111111111
                1111111111111111111
                111111111111111111
                1111111111
                111111111111111
                11111111111111112222
                11111111111111111111111111111111111111111111
                11111111111111111111111111111111111111
                1111111111111111111111111111111111111
                1111111111111111111111111111111111111
                111111111111111111111111111111111111
                111111111111111111111111111111111
              </div>
              <span className={sty.contentPage}>2</span>
            </div>  
          </div>
          <div className={sty.replyBox}>
            <div className={sty.breadcrumbBox}>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>block list</Breadcrumb.Item>
                <Breadcrumb.Item>UFmingle</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <ReactWEditor
            className={sty.editor}
            defaultValue={'<h1>title</h1>'}
            linkImgCallback={(src,alt,href) => {
              // 插入网络图片的回调事件
              console.log('image src ', src)
              console.log('image description',alt)
              console.log('href',href)
            }}
            onlineVideoCallback={(video) => {
              // 插入网络视频的回调事件
              console.log('post video content', video)
            }}
            onChange={(html) => {
              console.log('onChange html:', html)
            }}
            onBlur={(html) => {
              console.log('onBlur html:', html)
            }}
            onFocus={(html) => {
              console.log('onFocus html:', html)
            }}
          />
          <Button type="primary" shape="round" danger>
            reply
          </Button>
          </div>
          
        </div>
      </div >
    );
}

export default Reply;