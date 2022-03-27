import React, {useEffect, useState} from 'react'
import sty from './index.module.scss'
import logo from '../../img/logo.png';
import {
  useNavigate,
} from 'react-router-dom'
import { Divider, Select, Input, Avatar, Badge, Icon } from 'antd';
import axios from 'axios'

const { Search } = Input;
const InputGroup = Input.Group;

const { Option } = Select;


export default function Nav() {
  const history = useNavigate()
 
  const [islogin, setislogin] = useState(false)
  const tologin = (value) => {
    history(value)
  }

  useEffect(
    ()=>{
      const temp = sessionStorage.getItem('lt_token')
      if(temp){
        setislogin(true)
      }else{
        setislogin(false)
      }
    },[])

const logoutHandle=()=>{
  sessionStorage.removeItem('lt_token')
  var url = "http://localhost:8080/u/logout"
  axios.get(url, {
    headers:{
      'Accept': 'application/json'
    },
    withCredentials: true
  }).then(response => {
    // console.log(response.data)
    if(response.status === 200){
      setislogin(false);
    }
  })
  window.location.href='/'
}

  return <div className={sty.headBox}>
    <div className={sty.headCenter}>
      <div className={sty.headLeft}>
        <img className={sty.logo} src={logo} alt="" srcset="" />
        <div className={sty.logoName}>
          UFmingle
        </div>
        <Divider type="vertical" />
        <div className={sty.navItem} onClick={()=> tologin('/')}>
          block list
        </div>
        <div className={sty.navItem}>
          new article
        </div>
        <div className={sty.navItem}>
          follow
        </div>
        <div>
          <InputGroup compact>
            <Select style={{ width: '100px' }} defaultValue="InsideUfmingle">
              <Option value="InsideUfmingle">InsideUfmingle</Option>

            </Select>

            <Search style={{ width: 400 }} placeholder="Please insert what you wanna search" />
          </InputGroup>
        </div>

      </div>
      {islogin ? <div className={sty.headRight}>
        <Badge dot>
          <Icon type="notification" />
        </Badge>
        {/* <Avatar className={sty.avatar} style={{ backgroundColor: '#87d068' }} icon="user" /> */}
        <Avatar className={sty.avatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
        <div className={sty.username}>
          IVYJANG
        </div>
        <a onClick={()=>logoutHandle()}>logout</a>
      </div>
      : <div className={sty.headRight}>
        <div className={sty.login} onClick={() => tologin('/login')}>
          Login
        </div>
        <div className={sty.login} onClick={() => tologin('/register')}>
          Register
        </div>
      </div>
      }
    </div>
  </div>
}