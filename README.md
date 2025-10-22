# test-login-screen
# Test task for react dev position at Kotelnikov I.R.

# deploy: https://timofeynaryshkin.github.io/test-login-screen/index.html

## Вариации ответа API и необходимые параметры:
### Login screen:
1. email === "test@mail.com" && password === "123456" - success
2. email === "test@mail.com" && password !== "123456" - wrong password
3. email === "nouser@mail.com" - user doesn't exist
4. email === "error@mail.com" - server error

### OTP screen--:
1. otp === OTP - succes
2. otp !== OTP - invalid code

### Login screen сделан без роутинга, поэтому для возврата с User screen необходимо перезагрузить страницу
