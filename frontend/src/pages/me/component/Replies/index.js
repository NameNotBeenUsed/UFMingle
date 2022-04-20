import React, {useState} from 'react';
import sty from "../../../reply/index.module.scss";
import {Avatar, Badge, Button, List} from "antd";
import {ManOutlined, UserOutlined} from "@ant-design/icons";
import Axios from "axios";

export default ()=>{
    const [comment, setComment] = useState([[]])
    const getComment= () => {
        Axios.get('http://localhost:8080/article/personol_comment/' + sessionStorage.getItem('lt_token'), {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then((r) => {
            console.log(r);
            setComment(r.data)
        });
    };
    React.useEffect(() => {
        getComment();
    }, []);
    const [page, setPage] = useState(1)
    return <>
    <List
        className="comment-list"
        dataSource={comment}
        pagination={{ onChange: page => { setPage(page) }, pageSize: 5, }} //list内部分页
        renderItem={(item, index) => (
            <li>
                <p>comment_time: {item.commentTime}</p>
                <p dangerouslySetInnerHTML={{ __html: item.content }}></p>
                <div className={sty.contentCard}>
                    {/*<div className={sty.contentLeft}>*/}
                    {/*  /!*  <div className={sty.avatarLeft}>*!/*/}
                    {/*  /!*      <h3>{item.comment_author}</h3>*!/*/}
                    {/*  /!*      /!* <p>articles 0</p> *!/*!/*/}
                    {/*  /!*      /!* <p>flowers 0</p>*!/*/}
                    {/*  /!*<p>reputation 0</p>*!/*/}
                    {/*  /!*<p>mingle coin 0</p>*!/*/}
                    {/*  /!*<p>last time log in 0</p> *!/*!/*/}
                    {/*  /!*  </div>*!/*/}
                    {/*    /!*<div className={sty.avatarRight}>*!/*/}
                    {/*    /!*    <Badge count={<ManOutlined style={{ color: '#fff' }} />}>*!/*/}
                    {/*    /!*        <Avatar size={64} icon={<UserOutlined />} />*!/*/}
                    {/*    /!*    </Badge>*!/*/}
                    {/*    /!*    <div>*!/*/}
                    {/*    /!*        <Button size='small' shape="round">*!/*/}
                    {/*    /!*            Subscribe*!/*/}
                    {/*    /!*        </Button>*!/*/}
                    {/*    /!*        <Button size='small' shape="round">*!/*/}
                    {/*    /!*            Message*!/*/}
                    {/*    /!*        </Button>*!/*/}
                    {/*    /!*    </div>*!/*/}
                    {/*    */}
                    {/*    /!*</div>*!/*/}
                    {/*</div>*/}

                    {/*<div className={sty.contentRight} >*/}
                    {/*    <p dangerouslySetInnerHTML={{ __html: item.content }}></p>*/}
                    {/*</div>*/}
                    {/*<span className={sty.contentPage}>{(page - 1) * 5 + (index + 1)}</span>*/}
                </div>
            </li>
        )}
    />
    <div>my reply</div>
    </>
}