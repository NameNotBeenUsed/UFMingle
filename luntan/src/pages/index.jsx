import React, { Component } from 'react';
import { Pagination, Tag, Table, Divider, Input, Select, Avatar, Badge, Icon, Breadcrumb, Button } from 'antd';


import yf from '../img/yf.png';
import hot from '../img/hot.png';
import banner from '../img/banner.png';
import sty from './index.module.scss';

import Nav from '../components/nav'



const { Option } = Select;

const columns = [
  {
    title: (
      <div className={sty.titleBox}>
        <div className={sty.titleItem}>
          全部
        </div>
        <div className={sty.titleItem}>
          精华
        </div>
        <div className={sty.titleItem}>
          保存
        </div>
        <Select style={{ width: '100px' }} defaultValue="全部">
          <Option value="全部">全部</Option>
          <Option value="全部">全部</Option>
        </Select>
      </div>
    ),
    dataIndex: 'title',
    key: 'title',
    width: 400,
    render: text => {
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center'
        }}>
          <img src={hot} alt="" srcset="" />
          <div>
            {text}
          </div>
        </div>
      );
    },
  },
  {
    title: '作者',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: '点击',
    key: 'clickNum',
    dataIndex: 'clickNum',
    render: tags => (
      <Tag color='blue'>
        18万
      </Tag>
    ),
  },
  {
    title: '回复',
    key: 'replyNum',
    dataIndex: 'replyNum',
    render: tags => (
      <Tag color='cyan'>
        18万
      </Tag>
    ),
  },
  {
    title: '最后回复',
    dataIndex: 'time',
    key: 'time',
  },
];

const data = [
  {
    key: '1',
    title: '[征友] 93年博士 下定决心虎年脱单',
    author: 32,
    replyNum: 2000,
    clickNum: 1000,
    time: '卷卷毛/22-01-24 18:59'
  },
  {
    key: '2',
    title: '[征友] 93年博士 下定决心虎年脱单',
    author: 32,
    replyNum: 2000,
    clickNum: 1000,
    time: '卷卷毛/22-01-24 18:59'
  },
  {
    key: '3',
    title: '[征友] 93年博士 下定决心虎年脱单',
    author: 32,
    replyNum: 2000,
    clickNum: 1000,
    time: '卷卷毛/22-01-24 18:59'
  },
  {
    key: '4',
    title: '[征友] 93年博士 下定决心虎年脱单',
    author: 32,
    replyNum: 2000,
    clickNum: 1000,
    time: '卷卷毛/22-01-24 18:59'
  },
  {
    key: '5',
    title: '[征友] 93年博士 下定决心虎年脱单',
    author: 32,
    replyNum: 2000,
    clickNum: 1000,
    time: '卷卷毛/22-01-24 18:59'
  },
  {
    key: '6',
    title: '[征友] 93年博士 下定决心虎年脱单',
    author: 32,
    replyNum: 2000,
    clickNum: 1000,
    time: '卷卷毛/22-01-24 18:59'
  },
  {
    key: '7',
    title: '[征友] 93年博士 下定决心虎年脱单',
    author: 32,
    replyNum: 2000,
    clickNum: 1000,
    time: '卷卷毛/22-01-24 18:59'
  }
];

function Index() {

    return (
      <div className={sty.box}>
        <Nav></Nav>

        {/* 中间区域 */}
        <div className={sty.contentBox}>
          <div className={sty.contentCenter}>
            <div className={sty.breadcrumbBox}>
              <Breadcrumb>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
                <Breadcrumb.Item>版面列表</Breadcrumb.Item>
                <Breadcrumb.Item>缘分天空</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/*  */}
            <div className={sty.mainHeadBox}>
              <div className={sty.mainHeadLeft}>
                <img className={sty.mainHeadImg} src={yf} alt="" srcset="" />
                <div className={sty.mainHeadTit}>
                  缘分天空
                </div>
                <div className={sty.mainHeadDesc}>
                  <div>
                    版面简介：缘分天空，我们相遇......
                  </div>
                  <div>
                    版主：世界树 呆呆象
                  </div>
                </div>
              </div>
              <div className={sty.mainHeadRight}>
                <div className={sty.mainHeadRightItemBox}>
                  <div style={{
                    marginBottom: 10
                  }} className={sty.mainHeadRightItem}>
                    <div className={sty.mainHeadRightItem1}>今日贴数</div>
                    <div className={sty.mainHeadRightItem2}>14</div>
                  </div>
                  <div className={sty.mainHeadRightItem}>
                    <div className={sty.mainHeadRightItem1}>总主题数</div>
                    <div className={sty.mainHeadRightItem2}>34772</div>
                  </div>
                </div>
                <Button>取关</Button>
              </div>
            </div>


            <div className={sty.bannerBox}>
              <img className={sty.banner} src={banner} alt="" srcset="" />
            </div>

            <div className={sty.btnBox}>
              <div style={{
                marginRight: 15
              }} className={sty.btn}>
                <a href="/edit">发主题</a>
              </div>
              <div className={sty.btn}>
                发投票
              </div>
            </div>

            <div className={sty.tableBox}>
              <Table pagination={false} columns={columns} dataSource={data} />
              <div className={sty.paginationBox}>
                <Pagination size="small" total={50} showSizeChanger showQuickJumper />
              </div>
            </div>

          </div>

        </div>

      </div >
    );
  }

export default Index;