import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, message } from 'antd';
import classes from './LoginForm.module.css';
import { useEffect, useState } from 'react';
import { EMAIL_PATTERN } from '../../shared/constants';
import { useMutation } from '@tanstack/react-query';
import mockApi from '../../shared/mockApi';
import OTPForm from '../OTPForm/OTPForm';

const { Title } = Typography;

interface FieldType {
  email: string
  password: string
}

const LoginForm = () => {
  const [form] = Form.useForm()
  const values = Form.useWatch<FieldType>([], form)

  const [disabled, setDisabled] = useState(true)
  const [OTP, setOTP] = useState({ open: false, code: '' })

  const [messageApi, contextHolder] = message.useMessage()

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setDisabled(false))
      .catch(() => setDisabled(true))
  }, [form, values])

  const showError = (content: string) => {
    messageApi.open({
      type: 'error',
      content
    })
  }

  const loginMutation = useMutation({
    mutationFn: () => mockApi.login(values.email, values.password),
    onSuccess: (data) => { setOTP({ open: true, code: data.OTP }) },
    onError: (error) => { showError(error.message) }
  })


  if (OTP.open) {
    return <OTPForm OTP={OTP.code} onClick={() => setOTP({ open: false, code: '' })} />
  }


  return (
    <Form form={form} className={classes.form} onFinish={loginMutation.mutate}>
      {contextHolder}
      <div className={classes.logo}></div>
      <Title className={classes.title} level={3}>Sign in to your account to continue</Title>
      <Form.Item<FieldType> className={classes.formItem} name='email' rules={[{ required: true, pattern: EMAIL_PATTERN, message: 'wrong email format' }]}>
        <Input placeholder='Email' prefix={<UserOutlined />} className={classes.input} />
      </Form.Item>
      <Form.Item className={classes.formItem} name='password' rules={[{ required: true }]}>
        <Input.Password placeholder='Password' prefix={<LockOutlined />} className={classes.input} />
      </Form.Item>
      <Form.Item className={classes.formItem}>
        <Button loading={loginMutation.isPending} type='primary' htmlType='submit' className={classes.button} disabled={!!disabled}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm