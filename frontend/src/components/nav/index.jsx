import React, { useEffect, useState } from 'react'
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


export default function Nav(props) {
  const history = useNavigate()
  const { onSearch, onSelectChange, onBlockListChange } = props

  const [islogin, setislogin] = useState(false)
  const tologin = (value) => {
    history(value)
  }

  useEffect(
    () => {
      const temp = sessionStorage.getItem('lt_token')
      if (temp) {
        setislogin(true)
      } else {
        setislogin(false)
      }
    }, [])

  const logoutHandle = () => {
    sessionStorage.removeItem('lt_token')
    var url = "http://localhost:8080/u/logout"
    axios.get(url, {
      headers: {
        'Accept': 'application/json'
      },
      withCredentials: true
    }).then(response => {
      // console.log(response.data)
      if (response.status === 200) {
        setislogin(false);
      }
    })
    window.location.href = '/'
  }

  return <div className={sty.headBox}>
    <div className={sty.headCenter}>
      <div className={sty.headLeft}>
        <img className={sty.logo} src={logo} alt="" srcSet="" />
        <div className={sty.logoName}>
          UFmingle
        </div>
        <Divider type="vertical" />
        <div className={sty.navItem} onClick={() => {tologin('/'); onBlockListChange()} }>
          block list
        </div>
        <div className={sty.navItem} onClick={() => window.location.href = "/edit" }>
          new article
        </div>
        <div>
          <InputGroup compact>
            <Select style={{ width: '100px' }}
              onChange={(e) => onSelectChange(e)}
              defaultValue="title">
              <Option value="title">title</Option>
              <Option value="author">author</Option>
              <Option value="content">content</Option>

            </Select>

            <Search style={{ width: 350 }} onSearch={(e) => {
              onSearch(e)
            }} placeholder="Please insert what you wanna search" />
          </InputGroup>
        </div>

      </div>
      {islogin ? <div className={sty.headRight}>
        <Badge dot>
          <Icon type="notification" />
        </Badge>
        {/* <Avatar className={sty.avatar} style={{ backgroundColor: '#87d068' }} icon="user" /> */}
        {/*<Avatar className={sty.avatar} src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />*/}
        <Avatar className={sty.avatar} src={"http://localhost:8080/image/avatar/" + sessionStorage.getItem('lt_token')} />
        <div className={sty.login} onClick={() => tologin('/me')}>
          {(sessionStorage.getItem('lt_token'))}
        </div>
        <div><a onClick={() => logoutHandle()}>logout</a></div>

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