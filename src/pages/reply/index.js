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
                  <p>缘分天空</p>
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
                  <p>帖数 0</p>
                  <p>粉丝 0</p>
                  <p>威望 0</p>
                  <p>风评 0</p>
                  <p>最后登录 0</p>
                </div>
                <div className={sty.avatarRight}>
                  <Badge count={<ManOutlined  style={{ color: '#fff' }} />}>
                    <Avatar size={64} icon={<UserOutlined />} />
                  </Badge>
                  <div>
                    <Button size='small' shape="round">
                      关注
                    </Button>
                    <Button size='small' shape="round">
                      私信
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
                  <h3>hhhhh</h3>
                  <p>帖数 0</p>
                  <p>粉丝 0</p>
                  <p>威望 0</p>
                  <p>风评 0</p>
                  <p>最后登录 0</p>
                </div>
                <div className={sty.avatarRight}>
                  <Badge count={<ManOutlined  style={{ color: '#fff' }} />}>
                    <Avatar size={64} icon={<UserOutlined />} />
                  </Badge>
                  <div>
                    <Button size='small' shape="round">
                      关注
                    </Button>
                    <Button size='small' shape="round">
                      私信
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
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>版面列表</Breadcrumb.Item>
                <Breadcrumb.Item>缘分天空</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <ReactWEditor
            className={sty.editor}
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
            回复
          </Button>
          </div>
          
        </div>
      </div >
    );
}

export default Reply;