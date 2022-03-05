import React, { useState, useEffect, Component } from 'react';
import { Pagination, Tag, Table, Divider, Input, Select, Avatar, Badge, Icon, Breadcrumb, Button } from 'antd';


import yf from '../img/yf.png';
import hot from '../img/hot.png';
import banner from '../img/banner.png';
import sty from './index.module.scss';

import Nav from '../components/nav'
import axios from "axios"
import {Link} from "react-router-dom";



const { Option } = Select;
function editSource(text){

}
const columns = [
  {
    title: (
        <div className={sty.titleBox}>
          <div className={sty.titleItem}>
            all
          </div>
          <div className={sty.titleItem}>
            highly discussed
          </div>
          <div className={sty.titleItem}>
            save
          </div>
          <Select style={{ width: '100px' }} defaultValue="all">
            <Option value="all">all</Option>
            <Option value="girls">girls</Option>
            <Option value="boys">boys</Option>
            <Option value="unknown">unknown</Option>
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

        　　<a className="edit-data" href="/article">{text}</a>


            </div>
          </div>
      );
    },
  },
  {
    title: 'author',
    dataIndex: 'author',
    key: 'author',
  },
  {
    title: 'click',
    key: 'clickNum',
    dataIndex: 'clickNum',
    render: tags => (
        <Tag color='blue'>
          180k
        </Tag>
    ),
  },
  {
    title: 'reply',
    key: 'replyNum',
    dataIndex: 'replyNum',
    render: tags => (
        <Tag color='orange'>
          180k
        </Tag>
    ),
  },
  {
    title: 'last reply time',
    dataIndex: 'time',
    key: 'time',
  },
];

/* const data = [
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
]; */

function Index() {
  // useEffect(() => {
  //   Axios.get("/article").then((data) => {
  //     console.log(data)
  //   }).catch((error) => {

  //   })
  // }, [])

  const [articles, setArticles] = useState([])
  const [refreshData, setRefreshData] = useState(false)

  useEffect(() => {
    getAllArticles();
  }, [])

  if(refreshData){
    setRefreshData(false);
    getAllArticles();
  }

  return (
      <div className={sty.box}>
        <Nav></Nav>

        {/* 中间区域 */}
        <div className={sty.contentBox}>
          <div className={sty.contentCenter}>
            <div className={sty.breadcrumbBox}>
              <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>block list</Breadcrumb.Item>
                <Breadcrumb.Item>UFmingle</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            {/*  */}
            <div className={sty.mainHeadBox}>
              <div className={sty.mainHeadLeft}>
                <img className={sty.mainHeadImg} src={yf} alt="" srcset="" />
                <div className={sty.mainHeadTit}>
                  UFmingle
                </div>
                <div className={sty.mainHeadDesc}>
                  <div>
                    Forum description：Gators meet lover here...
                  </div>
                  <div>
                    administrator：MingJun RL
                  </div>
                </div>
              </div>
              <div className={sty.mainHeadRight}>
                <div className={sty.mainHeadRightItemBox}>
                  <div style={{
                    marginBottom: 10
                  }} className={sty.mainHeadRightItem}>
                    <div className={sty.mainHeadRightItem1}>Today's post</div>
                    <div className={sty.mainHeadRightItem2}>14</div>
                  </div>
                  <div className={sty.mainHeadRightItem}>
                    <div className={sty.mainHeadRightItem1}>Total post</div>
                    <div className={sty.mainHeadRightItem2}>34772</div>
                  </div>
                </div>
                <Button>unsubscribe</Button>
              </div>
            </div>


            <div className={sty.bannerBox}>
              <img className={sty.banner} src={banner} alt="" srcset="" />
            </div>

            <div className={sty.btnBox}>
              <div style={{
                marginRight: 15
              }} className={sty.btn}>
                <a href="/edit" >POST</a>
              </div>

            </div>

            <div className={sty.tableBox}>
              <Table pagination={{pageSize: 5}} columns={columns} dataSource={articles} />

            </div>

          </div>

        </div>

      </div >
  );

  function getAllArticles() {
    var url = "http://localhost:8080/"
    axios.get(url, {
      headers:{
        'Accept': 'application/json'
      }
    }).then(response => {
      if(response.status === 200){
        //console.log(response.data)
        setArticles(response.data)
      }
    })
  }

}

export default Index;