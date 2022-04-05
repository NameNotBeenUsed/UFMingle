import React, { useState, useEffect, Component } from 'react';
import { Pagination, Tag, Table, Divider, Input, Select, Avatar, Badge, Icon, Breadcrumb, Button, message } from 'antd';


import yf from '../img/yf.png';
import hot from '../img/hot.png';
import banner from '../img/banner.png';
import sty from './index.module.scss';

import Nav from '../components/nav'
import axios from "axios"
import { Link, Route } from "react-router-dom";
import Article from "./article";



const { Option } = Select;
function editSource(text) {

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
    key: 'id',
    width: 400,
    render: (text, record) => {
      return (
        <div>
          <a className="edit-data" onClick={() => {
            if (!sessionStorage.getItem("lt_token")) {
              message.error('Please login first');
              setTimeout(() => {
                window.location.href = '/login';
              }, 2000)
            } else {
              window.location.href = `/reply/${record.id}`
            }
          }}>{text}</a>
          {/* <Link className="edit-data" to={'/reply/' + record.id}>{text}</Link> */}
        </div>

        // <div style={{
        //   display: 'flex',
        //   alignItems: 'center'
        // }}>
        //   <img src={hot} alt="" srcset="" />
        //   <div>
        //     {/*<a className="edit-data" href={'/article/' + record.id}>{text}</a>*/}
        //     <Link className="edit-data" to={'/reply/' + record.id}>{text}</Link>
        //   </div>
        // </div>
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

function Index() {
  const [articles, setArticles] = useState([])
  const [refreshData, setRefreshData] = useState(false)
  const [selectValue, setSelectval] = useState('title')
  const onSearch = (value) => {
    const array = [];
    if (selectValue === "title") {
      articles.forEach(item => {
        if (item.title.includes(value)) {
          array.push(item)
        }
      })
    } else if (selectValue === "author") {
      articles.forEach(item => {
        if (item.author.includes(value)) {
          array.push(item)
        }
      })
    }else{
      articles.forEach(item => {
        if (item.content.includes(value)) {
          array.push(item)
        }
      })
    }


    console.log(array);
    setArticles(array)
  }
  const onSelectChange = (e) => {
    console.log(e)
    setSelectval(e)
  }
  useEffect(() => {
    getAllArticles();
  }, [])

  if (refreshData) {
    setRefreshData(false);
    getAllArticles();
  }

  return (
    <div className={sty.box}>
      <Nav
        onSearch={(e) => { onSearch(e) }}
        onSelectChange={(e) => { onSelectChange(e) }}
      />

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
            <Table pagination={{ pageSize: 5 }} columns={columns} dataSource={articles} />

          </div>

        </div>

      </div>

    </div >
  );

  function getAllArticles() {
    var url = "http://localhost:8080/"
    axios.get(url, {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      // console.log(response.data)
      if (response.status === 200) {

        setArticles(response.data.reverse())
      }
    })
  }

}

export default Index;