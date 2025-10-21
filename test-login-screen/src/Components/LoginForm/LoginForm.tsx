import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Form, Input, Typography } from 'antd'
import classes from './LoginForm.module.css'
import { useEffect, useState } from 'react';
import { EMAIL_PATTERN } from '../../shared/constants';

const { Title } = Typography;

interface FieldType {
  email: string
  password: string
}

const LoginForm = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch([], form)
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setDisabled(false))
      .catch(() => setDisabled(true))
  }, [form, values])


  return (
    <Form form={form} className={classes.form}>
      <Title level={3}>Sign in to your account to continue</Title>
      <Form.Item<FieldType> className={classes.formItem} name='email' rules={[{ required: true, pattern: EMAIL_PATTERN, message: 'wrong email format' }]}>
        <Input placeholder='Email' prefix={<UserOutlined />} className={classes.input} />
      </Form.Item>
      <Form.Item className={classes.formItem} name='password' rules={[{ required: true }]}>
        <Input.Password placeholder='Password' prefix={<LockOutlined />} className={classes.input} />
      </Form.Item>
      <Form.Item className={classes.formItem}>
        <Button type='primary' htmlType='submit' className={classes.button} disabled={!!disabled}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm