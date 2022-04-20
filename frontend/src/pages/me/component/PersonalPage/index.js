import React from 'react';
import sty from './index.module.scss';

import { Breadcrumb, Card, Avatar, Image, Tag, Divider, Pagination } from 'antd';
import Axios from 'axios';
import Item from 'antd/lib/list/Item';


export default () => {
    const [dataList, setDataList] = React.useState([]);
    const [total, setTotal] = React.useState(0);
    const [user_data, setuser_data] = React.useState([])
    const getobj = () => {
        Axios.get('http://localhost:8080/article/pastposts/' + sessionStorage.getItem('lt_token'), {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then((r) => {
            console.log(r);
            setDataList(r.data);
            setTotal(r.data.length);
        });
    };
    const getuser= () => {
        Axios.get('http://localhost:8080/u/info', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then((r) => {
            console.log(r);
            setuser_data(r.data)
        });
    };
    React.useEffect(() => {
        getobj();
        getuser();
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
                 <div className={sty.bottom}>
                     <p><span>gender {user_data.gender}</span> </p>
                    {/*<p><span>gender {user_data.gender}</span> <span>past_post_num 0</span> </p>*/}
                    <p><span>birthday {user_data.birthday}</span>  </p>
                </div>
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
                        <div>
                <span>
                    post time : {item.postTime}
                </span>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <div>
                            <span>
                    likes : {item.likes}
                </span></div>
                            &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                            <div>
                            <span>
                    dislikes : {item.dislikes}
                </span>
                            </div>
                        </div>
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

        <Pagination defaultCurrent={1} total={total} pageSize={1} />
    </>

}
