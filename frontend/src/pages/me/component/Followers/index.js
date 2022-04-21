import React, {useState} from 'react';
import Axios from "axios";
import sty from "../../../reply/index.module.scss";
import {Avatar, Badge, Button, List, message} from "antd";
import {ManOutlined, UserOutlined} from "@ant-design/icons";

export default ()=>{
    const [myfollowers, setmyfollowers] = React.useState([[]])
    const getfollowers = () => {
        Axios.get('http://localhost:8080/u/getmyfollowers', {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        }).then((r) => {
            console.log(r);
            setmyfollowers(r.data)
        });
    };
    React.useEffect(() => {
        getfollowers();
    }, []);
    const [page, setPage] = useState(1)
    if (myfollowers != null) {
        return <>
            <div>my followers</div>
            <List
                className="comment-list"
                dataSource={myfollowers}
                pagination={{ onChange: page => { setPage(page) }, pageSize: 5, }} //list内部分页
                renderItem={(item, index) => (
                    <li>
                        <p>{item.username}</p>
                        <div className={sty.contentCard}>
                            <div className={sty.contentLeft}>
                                {/*<div className={sty.avatarLeft}>
                            <h3>{item.comment_author}</h3>
                             <p>articles 0</p>
                             <p>flowers 0</p>
                      <p>reputation 0</p>
                      <p>mingle coin 0</p>
                      <p>last time log in 0</p>
                        </div>*/}
                                <div className={sty.avatarRight}>
                                    <Badge count={<ManOutlined style={{ color: '#fff' }} />}>
                                        <Avatar size={64} icon={<UserOutlined />} src={"http://localhost:8080/image/avatar/" + item.username} />
                                    </Badge>
                                    <div>
                                        {/* <Button size='small' shape="round" onClick={() => {
                                    Axios.post(`http://localhost:8080/u/subscribe/${item.comment_author}`, { thumbsup: 0 }, {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        withCredentials: true,
                                    }).then(async(r) => {
                                        if(r.status === 200){

                                            // message.info(data);
                                            // sessionStorage.setItem("lt_token", data) 避免注册成功后自动登录
                                            await message.success(r.data); // 打印message后再跳转
                                            //await message.success('Subscribe Successfully'); // 打印message后再跳转
                                            //window.location.href = "/login";

                                        }
                                        console(r);
                                    });
                                }}>
                                    Subscribe
                                </Button>*/}
                                        <Button size='small' shape="round" >
                                            Message
                                        </Button>
                                    </div>

                                </div>
                            </div>

                            <div className={sty.contentRight} >
                                <p dangerouslySetInnerHTML={{ __html: item.username }}></p>
                            </div>
                            <span className={sty.contentPage}>{(page - 1) * 5 + (index + 1)}</span>
                        </div>

                    </li>
                )}
            />
        </>
    }
    else {
        return <div>my followers</div>
    }

}