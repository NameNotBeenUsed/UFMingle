import React, { Component } from 'react';
import { Menu } from 'antd';

import sty from './index.module.scss';

import Nav from '../../components/nav'

import { Breadcrumb, Card, Avatar, Image ,Tag, Divider  } from 'antd';
import {
  HomeOutlined,
  PushpinOutlined,
  LaptopOutlined,
  ProfileOutlined,
  LayoutOutlined,
} from '@ant-design/icons';

function Reply() {

    return (
      <div className={sty.box}>
        <Nav></Nav>

        {/* 中间区域 */}
        <div className={sty.contentBox}>
          <div className={sty.breadcrumbBox}>
              <Breadcrumb>
                <Breadcrumb.Item>个人中心</Breadcrumb.Item>
              </Breadcrumb>
          </div>
          <div className={sty.meBox}>
            <div className={sty.meLeftBox}>
              <Menu
                style={{ width: 200, height: "100%" }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                  <Menu.Item key="1" icon={<HomeOutlined />}>
                    Option 1
                  </Menu.Item>
                  <Menu.Item key="2" icon={<ProfileOutlined />}>
                    Option 2
                  </Menu.Item>
                  <Menu.Item key="3" icon={<PushpinOutlined />}>
                    Option 3
                  </Menu.Item>
                  <Menu.Item key="4" icon={<LaptopOutlined />}>
                    Option 2
                  </Menu.Item>
                  <Menu.Item key="5" icon={<LayoutOutlined />}>
                    Option 3
                  </Menu.Item>
              </Menu>
            </div>
            <Card style={{ width: "68%" }}>
              <div className={sty.meRightTop}>
                <Avatar size={150} src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: '150px '}} />} />
                <div className={sty.meright}>
                  <div className={sty.top}>
                    <span className={sty.name}>hhha</span><span className={sty.samll}>注册用户</span> <Tag color="magenta">收到的赞</Tag><Tag className={sty.tag} color="#ff0000">0</Tag> <Tag color="#ff0000">私信</Tag>
                  </div>
                  <div className={sty.bottom}>
                    <p><span>性别 男</span> <span>发帖数 0</span> </p>
                    <p><span>注册时间 00：00：00</span> <span>最后登录时间 00：00：00</span> </p>
                  </div>
                </div>
              </div>
              <h3 className={sty.m40}>发表主题</h3>
              <div className={sty.repo}>
                <p><span className={sty.blue}>还会复发</span>2020-29-20 10:10:10</p>
                <p>哈哈奥豪斯大飒飒的还是第三方</p>
                <Divider></Divider>
              </div>
              <div className={sty.repo}>
                <p><span className={sty.blue}>还会复发</span>2020-29-20 10:10:10</p>
                <p>哈哈奥豪斯大飒飒的还是第三方</p>
                <Divider></Divider>
              </div>
              <div className={sty.repo}>
                <p><span className={sty.blue}>还会复发</span>2020-29-20 10:10:10</p>
                <p>哈哈奥豪斯大飒飒的还是第三方</p>
                <Divider></Divider>
              </div>
            </Card>
          </div>
        </div>
      </div >
    );
}

export default Reply;