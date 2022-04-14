import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import styles from './index.module.scss';
import Axios from 'axios';
import moment from 'moment';

export default () => {
  const [form] = Form.useForm();
  const [flag, setFlag] = React.useState(false);

  const postHandle = () => {
    setFlag(true);
    form.setFieldsValue({
      ...data,
      birthday: moment(moment(data.birthday).valueOf()).format('YYYY-MM-DD')
    });
  };
  const[data,setData] =React.useState({})
  const getobj =()=>{
    Axios.get('http://localhost:8080/u/info',{headers: {
        'Content-Type': 'application/json'
    },withCredentials: true}).then(r=>{
      console.log(r.data)
      setData(r.data)
    })

  }
  React.useEffect(()=>{
    getobj()
  },[])
const submit =()=>{
  const VaL = form.getFieldValue()
  console.log(form.getFieldValue())
  Axios.post('http://localhost:8080/u/info',VaL,{headers: {
    'Content-Type': 'application/json'
},withCredentials: true}).then(r=>{
  getobj()
  setFlag(false)
})
}
  return (
    <div className={styles.header}>
      {!flag ? (
        <>
          <div>
            <div>
              姓名:<span>{data.username}</span>
            </div>
            <div>
              邮箱:<span>{data.gatorlink}</span>
            </div>
            <div>
              password:<span>{data.password}</span>
            </div>
            <div>
              性别:<span>{data.gender}</span>
            </div>
            <div>
              生日:<span>{moment(moment(data.birthday).valueOf()).format('YYYY-MM-DD')}</span>
            </div>
          </div>
          <Button
            onClick={() => {
              postHandle();
            }}
          >
            修改
          </Button>
        </>
      ) : (
        <>
          <Form form={form}>
            <Form.Item label="姓名" name="username">
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="邮箱" name="gatorlink">
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="密码" name="password">
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="性别" name="gender">
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="生日" name="birthday">
              <Input style={{ width: 300 }} />
            </Form.Item>
          </Form>
          <div>
            <Button
              onClick={() => {
                setFlag(false);
              }}
            >
              返回
            </Button>
            &emsp;&emsp;
            <Button type="primary" onClick={()=>submit()}>确定</Button>
          </div>
        </>
      )}
    </div>
  );
};
