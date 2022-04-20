import React from 'react';
import sty from './index.module.scss';

import { Breadcrumb, Card, Avatar, Image, Tag, Divider } from 'antd';
import Axios from 'axios';
import Item from 'antd/lib/list/Item';


export default () => {
    const [dataList, setDataList] = React.useState([])
    const getobj = () => {
        Axios.get('http://localhost:8080/article/pastposts/user1', {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }).then((r) => {
          console.log(r);
          setDataList(r.data)
        });
      };
      React.useEffect(() => {
        getobj();
      }, []);


    return <>
        <div className={sty.meRightTop}>
            <Avatar size={150} src={<Image src={"http://localhost:8080/image/avatar/" + sessionStorage.getItem('lt_token')} style={{ width: '150px ' }} />} />
            <div className={sty.meright}>
                <div className={sty.top}>
                    <span className={sty.name}>{(sessionStorage.getItem('lt_token'))}</span><span className={sty.samll}>registered user</span> 
                    {/* <Tag color="magenta">likes received</Tag><Tag className={sty.tag} color="#ff0000">0</Tag> 
                    <Tag color="#ff0000">message</Tag> */}
                </div>
                {/* <div className={sty.bottom}>
                    <p><span>gender male</span> <span>past_post_num 0</span> </p>
                    <p><span>register time 00：00：00</span> <span>last time login 00：00：00</span> </p>
                </div> */}
            </div>
        </div>
        <div className={sty.titles}>
            Past Posts
            <Divider></Divider>
        </div>
        {dataList&&dataList.length>0?
            dataList.map(item=>{
                return <div key={item.id}>
                 <h3 className={sty.m40}>{item.title}</h3>
        <div className={sty.repo}>
          
            <p>{item.content}</p>
            <Divider></Divider>
        </div>
                </div>
            })
        :''}
        {/* <h3 className={sty.m40}>past post</h3>
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
    </>

}