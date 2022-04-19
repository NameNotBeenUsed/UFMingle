import React, { Component } from 'react';
import { Menu } from 'antd';

import sty from './index.module.scss';

import Nav from '../../components/nav'

import { Breadcrumb, Card, Avatar, Image, Tag, Divider } from 'antd';
import {
  HomeOutlined,
  PushpinOutlined,
  LaptopOutlined,
  ProfileOutlined,
  LayoutOutlined,
} from '@ant-design/icons';

import Followers from './component/Followers';
import PersonalPage from './component/PersonalPage';
import Replies from './component/Replies';
import Subscribes from './component/Subscribes';
import UserData from './component/UserData';


function Reply() {
  const [menuKey,setMenuKey]=React.useState('1')
  const menuClick =(e)=>{
    console.log(e)
    setMenuKey(e.key)
  }
  return (
    <div className={sty.box}>
      <Nav></Nav>

      {/* 中间区域 */}
      <div className={sty.contentBox}>
        <div className={sty.breadcrumbBox}>
          <Breadcrumb>
            <Breadcrumb.Item>personal center</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={sty.meBox}>
          <div className={sty.meLeftBox}>
            <Menu
              style={{ width: 200, height: "100%" }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              onClick={menuClick}
            >
              <Menu.Item key="1" icon={<HomeOutlined />}>
                Personal Page
              </Menu.Item>
              <Menu.Item key="2" icon={<ProfileOutlined />}>
                Update User Data
              </Menu.Item>
              <Menu.Item key="3" icon={<PushpinOutlined />}>
                Myreply
              </Menu.Item>
              <Menu.Item key="4" icon={<LaptopOutlined />}>
                Subscribes
              </Menu.Item>
              <Menu.Item key="5" icon={<LayoutOutlined />}>
                Followers
              </Menu.Item>
            </Menu>
          </div>
          <Card style={{ width: "68%" }}>
            {menuKey ==='1'?<PersonalPage />:menuKey==='2'?<UserData />:menuKey==='3'?<Replies />:menuKey==='4'?<Subscribes />:menuKey==='5'?<Followers />:''}
            {/* <div className={sty.meRightTop}>
              <Avatar size={150} src={<Image src="http://localhost:8080/image/avatar/user1" style={{ width: '150px ' }} />} />
              <div className={sty.meright}>
                <div className={sty.top}>
                  <span className={sty.name}>{(sessionStorage.getItem('lt_token'))}</span><span className={sty.samll}>registered user</span> <Tag color="magenta">likes received</Tag><Tag className={sty.tag} color="#ff0000">0</Tag> <Tag color="#ff0000">message</Tag>
                </div>
                <div className={sty.bottom}>
                  <p><span>gender male</span> <span>past_post_num 0</span> </p>
                  <p><span>register time 00：00：00</span> <span>last time login 00：00：00</span> </p>
                </div>
              </div>
            </div>
            <h3 className={sty.m40}>past post</h3>
            <div className={sty.repo}>
              <p><span className={sty.blue}>hello</span>2020-29-20 10:10:10</p>
              <p>hello, world</p>
              <Divider></Divider>
            </div>
            <div className={sty.repo}>
              <p><span className={sty.blue}>hello</span>2020-29-20 10:10:10</p>
              <p>hello, world</p>
              <Divider></Divider>
            </div>
            <div className={sty.repo}>
              <p><span className={sty.blue}>hello</span>2020-29-20 10:10:10</p>
              <p>hello, world!</p>
              <Divider></Divider>
            </div> */}
          </Card>
        </div>
      </div>
    </div >
  );
}

export default Reply;
