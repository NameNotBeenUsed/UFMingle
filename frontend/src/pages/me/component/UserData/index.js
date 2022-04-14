import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import styles from './index.module.scss';

export default () => {
  const [form] = Form.useForm();
  const [flag, setFlag] = React.useState(false);
  const obj = {
    name: '123',
    emil: '123456@qq.com',
    mm: 'Admin@123',
    xb: '男',
    sr: '1995-07-22',
  };
  const postHandle = () => {
    setFlag(true);
    form.setFieldsValue({
      ...obj,
    });
  };
  return (
    <div className={styles.header}>
      {!flag ? (
        <>
          <div>
            <div>
              姓名:<span>{obj.name}</span>
            </div>
            <div>
              邮箱:<span>{obj.emil}</span>
            </div>
            <div>
              性别:<span>{obj.xb}</span>
            </div>
            <div>
              生日:<span>{obj.sr}</span>
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
            <Form.Item label="姓名" name="name">
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="邮箱" name="emil">
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="密码" name="mm">
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="性别" name="xb">
              <Input style={{ width: 300 }} />
            </Form.Item>
            <Form.Item label="生日" name="sr">
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
            <Button type="primary">确定</Button>
          </div>
        </>
      )}
    </div>
  );
};
