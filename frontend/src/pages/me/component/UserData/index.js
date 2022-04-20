import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, DatePicker, message } from 'antd';
import styles from './index.module.scss';
import Axios from 'axios';
import moment from 'moment';

const { Option } = Select;

export default () => {
  const [form] = Form.useForm();
  const [flag, setFlag] = React.useState(false);

  // const postHandle = () => {
  //   setFlag(true);
  //   form.setFieldsValue({
  //     ...data,
  //     birthday: moment(moment(data.birthday).valueOf()).format('YYYY-MM-DD'),
  //   });
  // };

  const monthList = [
    'Jan',
    'Feb',
    'March',
    'April',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
  ];
  const [gender, setGender] = React.useState(null);
  const genderChange = (e) => {
    setGender(e);
  };
  const [passwords, setPasswords] = React.useState('');
  const passWordChane = (e) => {
    setPasswords(e.target.value);
    console.log(typeof e.target.value, e);
  };
  const [yearValue, setyearValue] = useState('');
  const yearChange = (e) => {
    setyearValue(e);
  };
  const [monthValue, setMonthValue] = useState(null);
  const monthChange = (e) => {
    setMonthValue(e);
  };

  const [dayValue, setDayValue] = useState(null);
  const dayChange = (e) => {
    setDayValue(e);
  };
  const [data, setData] = React.useState({});
  const getobj = () => {
    Axios.get('http://localhost:8080/u/info', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then((r) => {
      setGender(r.data.gender);
      setPasswords(r.data.password);

      var a = moment(moment(r.data.birthday).valueOf()).format('YYYY-MM-DD');
      var timeArr = a.replace(' ', ':').replace(/\:/g, '-').split('-');
      setyearValue(moment(timeArr[0]));
      setMonthValue(timeArr[1]);
      setDayValue(timeArr[2]);
      setData(r.data);
    });
  };
  React.useEffect(() => {
    getobj();
  }, []);

  const submitHandle = () => {
    let params = {
      gender: gender,
      password: passwords,
      birthday: `${moment(yearValue).format('YYYY')}-${monthValue}-${dayValue}`,
    };
    Axios.patch('http://localhost:8080/u/info', params, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    }).then((r) => {
      message.success('update successfully');
      getobj();
    });
  };
  // useEffect(() => {
  //   var a = moment(moment('2020-12-30T00:00:00Z').valueOf()).format(
  //     'YYYY-MM-DD',
  //   );
  //   var timeArr = a.replace(' ', ':').replace(/\:/g, '-').split('-');
  //   setyearValue(moment(timeArr[0]));
  //   setMonthValue(timeArr[1] + '月');
  //   setDayValue(timeArr[2]);
  // }, []);
  return (
    <div className={styles.header}>
      <div className={styles.flexItem}>
        <div className={styles.flexItemLeftName}>gender:</div>
        <div className={styles.flexItemRightIpt}>
          <Select
            onChange={genderChange}
            placeholder="please choose"
            style={{ width: 100 }}
            value={gender}
          >
            {/* <Option value="unkown">unkown</Option> */}
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </div>
      </div>
      {/* <div className={styles.flexItem}>
        <div className={styles.flexItemLeftName}>邮箱:</div>
        <div className={styles.flexItemRightIpt}>
          <Input placeholder="请输入邮箱" style={{ width: 400 }} />
        </div>
      </div> */}
      <div className={styles.flexItem}>
        <div className={styles.flexItemLeftName}>password:</div>
        <div className={styles.flexItemRightIpt}>
          <Input
            onChange={(e) => passWordChane(e)}
            type="password"
            placeholder="please type in password"
            style={{ width: 400 }}
            value={passwords}
          />
        </div>
      </div>
      <div className={styles.flexItem}>
        <div className={styles.flexItemLeftName}>birthday:</div>
        <div className={styles.flexItemRightIpt}>
          {/* <div className={styles.flexYear}></div> */}
          <DatePicker
            value={yearValue}
            picker="year"
            placeholder="please choose year"
            onChange={(e) => yearChange(e)}
          />
          &emsp;
          <Select
            style={{ width: 150 }}
            value={monthValue}
            placeholder="please choose month"
            onChange={(e) => monthChange(e)}
          >
            {monthList.map((item) => {
              return <Option key={item}>{item}</Option>;
            })}
          </Select>
          &emsp;
          <Select
            value={dayValue}
            onChange={(e) => dayChange(e)}
            placeholder="please choose date"
            style={{ width: 150 }}
          >
            {day.map((item) => {
              return <Option key={item}>{item}</Option>;
            })}
          </Select>
        </div>
      </div>
      <div>
        <Button onClick={() => submitHandle()}>submit</Button>
        <Button>reset</Button>
      </div>
    </div>
  );

  // return (
  //   <div className={styles.header}>
  //     {!flag ? (
  //       <>
  //         <div>
  //           <div>
  //             姓名:<span>{data.username}</span>
  //           </div>
  //           <div>
  //             邮箱:<span>{data.gatorlink}</span>
  //           </div>
  //           <div>
  //             password:<span>{data.password}</span>
  //           </div>
  //           <div>
  //             性别:<span>{data.gender}</span>
  //           </div>
  //           <div>
  //             生日:<span>{moment(moment(data.birthday).valueOf()).format('YYYY-MM-DD')}</span>
  //           </div>
  //         </div>
  //         <Button
  //           onClick={() => {
  //             postHandle();
  //           }}
  //         >
  //           修改
  //         </Button>
  //       </>
  //     ) : (
  //       <>
  //         <Form form={form}>
  //           <Form.Item label="姓名" name="username">
  //             <Input style={{ width: 300 }} />
  //           </Form.Item>
  //           <Form.Item label="邮箱" name="gatorlink">
  //             <Input style={{ width: 300 }} />
  //           </Form.Item>
  //           <Form.Item label="密码" name="password">
  //             <Input style={{ width: 300 }} />
  //           </Form.Item>
  //           <Form.Item label="性别" name="gender">
  //             <Input style={{ width: 300 }} />
  //           </Form.Item>
  //           <Form.Item label="生日" name="birthday">
  //             <Input style={{ width: 300 }} />
  //           </Form.Item>
  //         </Form>
  //         <div>
  //           <Button
  //             onClick={() => {
  //               setFlag(false);
  //             }}
  //           >
  //             返回
  //           </Button>
  //           &emsp;&emsp;
  //           <Button type="primary" onClick={()=>submit()}>确定</Button>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );
};
