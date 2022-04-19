import React, { useState, useEffect, Component } from 'react';
import {
  Pagination,
  Tag,
  Table,
  Divider,
  Input,
  Select,
  Avatar,
  Badge,
  Icon,
  Breadcrumb,
  Button,
  message,
  Carousel
} from 'antd';


import yf from '../img/yf.png';
import hot from '../img/hot.png';
import banner from '../img/banner.png';
import banner2 from '../img/banner2.jpg'
import sty from './index.module.scss';

import Nav from '../components/nav'
import axios from "axios"
import { Link, Route } from "react-router-dom";
import Article from "./article";
import moment from 'moment';
import uf_news_1 from "../img/uf_news_1.png";
import uf_news_2 from "../img/uf_news_2.png";
import uf_news_3 from "../img/uf_news_3.png";
import uf_news_4 from "../img/uf_news_4.png";


const { Option } = Select;
function editSource(text) {

}
const columns = [
  {
    // title: (
    //   <div className={sty.titleBox}>
    //     <div className={sty.titleItem}>
    //       all
    //     </div>
    //     <div className={sty.titleItem}>
    //       highly discussed
    //     </div>
    //     <div className={sty.titleItem}>
    //       save
    //     </div>
    //     <Select style={{ width: '100px' }} defaultValue="all">
    //       <Option value="all">all</Option>
    //       <Option value="girls">girls</Option>
    //       <Option value="boys">boys</Option>
    //       <Option value="unknown">unknown</Option>
    //     </Select>
    //   </div>
    // ),
    title:'title',
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
    title: 'postTime',
    key: 'postTime',
    dataIndex: 'postTime',
    render:text=>{
      return moment(moment(text).valueOf()).format("YYYY-MM-DD HH:ss:mm");
    }
  }
  // {
  //   title: 'click',
  //   key: 'clickNum',
  //   dataIndex: 'clickNum',
  //   render: tags => (
  //     <Tag color='blue'>
  //       180k
  //     </Tag>
  //   ),
  // },
  // {
  //   title: 'reply',
  //   key: 'replyNum',
  //   dataIndex: 'replyNum',
  //   render: tags => (
  //     <Tag color='orange'>
  //       180k
  //     </Tag>
  //   ),
  // },
  // {
  //   title: 'last reply time',
  //   dataIndex: 'time',
  //   key: 'time',
  // },
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
  const onBlockListChange  = () => {
    getAllArticles();
  }
  const contentStyle = {
    height: '630px',
    color: '#fff',
    lineHeight: '120px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <div className={sty.box}>
      <Nav
        onSearch={(e) => { onSearch(e) }}
        onSelectChange={(e) => { onSelectChange(e) }}
        onBlockListChange={(e) => {onBlockListChange(e)}}
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
          </div>


          <div className={sty.bannerBox}>
            <Carousel autoplay>
              <div>
                <h3 style={contentStyle} ><img style={contentStyle} src={banner} alt="UF" srcSet="" /></h3>
              </div>
              <div>
                <h3 style={contentStyle}><img style={contentStyle} src={banner2} alt="UF" srcSet="" /></h3>
              </div>
              <div>
                <h3 style={contentStyle}><img style={contentStyle} src={uf_news_3} alt="UF" srcSet="" /></h3>
              </div>
              <div>
                <h3 style={contentStyle}><img style={contentStyle} src={uf_news_4} alt="UF" srcSet="" /></h3>
              </div>
            </Carousel>
            {/*<img className={sty.banner} src={banner} alt="" srcset="" />*/}
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
