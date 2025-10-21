import { ArrowLeftOutlined } from "@ant-design/icons"
import { Button, Form, Input, Typography } from "antd"
import classes from './OTPForm.module.css'
import { useEffect, useRef, useState, type FC } from "react"

const { Title } = Typography

interface Props {
  onClick: () => void
}

const OTPForm: FC<Props> = ({ onClick }) => {
  const [timeExpired, setTimeExpired] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const startTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      setTimeExpired(true)
    }, 10000)
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
    startTimer()
  }

  return (
    <Form className={classes.form}>
      <Form.Item>
        <Button type='text' icon={<ArrowLeftOutlined />} onClick={onClick} className={classes.button} />
      </Form.Item>
      <Title className={classes.title} level={3}>Two-Factor Authentication</Title>
      <p className={classes.text}>Enter the 6-digit code from the Google<br /> Authenticator app</p>
      <Form.Item className={classes.inputContainer}>
        <Input.OTP size="large" />
      </Form.Item>
      {
        timeExpired &&
        <Form.Item className={classes.buttonContainer}>
          <Button onClick={resetTimer} className={classes.button} type='primary'>Get new</Button>
        </Form.Item>
      }
    </Form>
  )
}

export default OTPForm