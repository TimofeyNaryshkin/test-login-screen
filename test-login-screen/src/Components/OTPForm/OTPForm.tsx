import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Form, Input, message, Typography } from "antd"
import classes from './OTPForm.module.css'
import { useEffect, useRef, useState, type FC } from "react"
import { OTP_TIMEOUT } from "../../shared/constants"
import { useMutation } from "@tanstack/react-query"
import mockApi from "../../shared/mockApi"

const { Title } = Typography

interface Props {
  onClick: () => void
  OTP: string
}

const OTPForm: FC<Props> = ({ onClick, OTP }) => {
  const [timeExpired, setTimeExpired] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
  const [form] = Form.useForm()
  const otpValue = Form.useWatch('otp', form)
  const [hidden, setHidden] = useState(true)
  const [messageApi, contextHolder] = message.useMessage()
  const [verified, setVerified] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setTimeExpired(true)
    }, OTP_TIMEOUT)
  }

  useEffect(() => {
    startTimer()

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const resetTimer = () => {
    setTimeExpired(false)
    form.resetFields()
    startTimer()
  }

  useEffect(() => {
    if (otpValue?.length === OTP.length) {
      setHidden(false)
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [otpValue, OTP])

  const otpVerificationMutation = useMutation({
    mutationFn: () => mockApi.verifyOTP(otpValue),
    onSuccess: (data) => { showWelcomeMessage(data?.name) },
    onError: (error) => { form.setFields([{ name: 'otp', errors: [error.message] }]), setDisabled(true) }
  })

  const showWelcomeMessage = (name?: string) => {
    if (name === undefined) return
    messageApi.open({
      type: 'success',
      content: `Welcome back, ${name}!`
    })
      .then(() => setVerified(true))
  }

  if (verified) {
    return (
      <h1 style={{ color: 'black' }}>User screen</h1>
    )
  }

  const onFinish = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    otpVerificationMutation.mutate()
  }

  const resetValidationError = () => {
    form.setFields([{ name: 'otp', errors: [] }])
    setDisabled(false)
  }

  return (
    <Form form={form} className={classes.form} onFinish={onFinish}>
      {contextHolder}
      <Form.Item style={{ margin: 0 }}>
        <Button type='text' icon={<ArrowLeftOutlined />} onClick={onClick} className={classes.button} />
      </Form.Item>
      <div className={classes.logo}></div>
      <Title className={classes.title} level={3}>Two-Factor Authentication</Title>
      <p className={classes.text}>Enter the 6-digit code from the Google<br /> Authenticator app</p>
      <Form.Item className={classes.inputContainer} name='otp'>
        <Input.OTP onChange={resetValidationError} size="large" formatter={(value) => value.replace(/\D/g, '')} />
      </Form.Item>
      {
        timeExpired &&
        <Form.Item className={classes.buttonContainer}>
          <Button onClick={resetTimer} className={classes.button} type='primary'>Get new</Button>
        </Form.Item>
      }
      {
        !hidden &&
        <Form.Item className={classes.buttonContainer}>
          <Button loading={otpVerificationMutation.isPending} disabled={disabled} htmlType='submit' className={classes.button} type='primary'>Continue</Button>
        </Form.Item>
      }
    </Form>
  )
}

export default OTPForm