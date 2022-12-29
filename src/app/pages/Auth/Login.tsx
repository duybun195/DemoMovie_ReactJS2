import LoadingButton from "app/components/LoadingButton/LoadingButton"
import { useEffect, useState } from "react"
import { ChevronsRight, Eye, EyeOff } from "react-feather"
import { Helmet } from "react-helmet-async"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Form, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Label } from "reactstrap"
import { logout, setUserLogin, useLoginMutation } from "services/authService"
import { LoginRequest, LoginResponse } from "types/auth"
import { useAppDispatch } from "utils/hook/appHook"
import "./login.scss"
import { LoaderHelper } from "utils/loaderHelper"
import logoCompany from "../../../assets/images/logo/logo-demo-white.svg"

export function Login({ location }) {
  const dispatch = useAppDispatch()
  const [inputVisibility, setInputVisibility] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>("")
  const [login, { isLoading }] = useLoginMutation()
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginRequest>({
    mode: "onSubmit",
    defaultValues: {
      // language: "vi-VN",
      // deviceName: "string",
      // deviceID: "string",
    },
  })
  const onLoginSubmit: SubmitHandler<LoginRequest> = async loginInfo => {
    try {
      debugger
      var response = await login(loginInfo).unwrap()
      if (response?.statusCode === 200) {
        const result = response.result as LoginResponse

        dispatch(setUserLogin(result))
        if (location.state) {
          const { from } = location.state
          window.location.href = from
        } else {
          window.location.href = "/"
        }
      } else {
        setErrorMessage(response?.message || "Đã có lỗi xảy ra!")
        LoaderHelper.showHide(false)
      }
    } catch (err) {
      setErrorMessage("Đã có lỗi xảy ra!")
      console.error(err)
      LoaderHelper.showHide(false)
    }
  }
  useEffect(() => {
    LoaderHelper.showHide(false)
    dispatch(logout())
  }, [])
  return (
    <div className="auth-wrapper auth-v1 px-2 body-login">
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <div className="content-login">
        <div className="screen-login">
          <div className="screen-content">
            <Form className="login" onSubmit={handleSubmit(onLoginSubmit)}>
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Tên đăng nhập
                </Label>
                <Controller
                  rules={{ required: true }}
                  name={"userName"}
                  control={control}
                  render={({ field: { onChange } }) => (
                    <Input className="login-input" placeholder="Tên đăng nhập" onChange={onChange} />
                  )}
                />
                {errors.userName && <span className="text-danger text-error">Vui lòng nhập tài khoản</span>}
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="login-email">
                  Mật khẩu
                </Label>
                <InputGroup className="input-group-merge">
                  <Controller
                    name={"password"}
                    rules={{ required: true }}
                    control={control}
                    render={({ field: { onChange } }) => (
                      <Input
                        className="login-input"
                        placeholder="Mật khẩu"
                        type={inputVisibility ? "text" : "password"}
                        onChange={onChange}
                      />
                    )}
                  />
                  <InputGroupAddon addonType="append" onClick={() => setInputVisibility(!inputVisibility)}>
                    <InputGroupText className="cursor-pointer">
                      {inputVisibility ? <Eye size="14" /> : <EyeOff size="14" />}
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {errors.password && <span className="text-danger text-error">Vui lòng nhập mật khẩu</span>}
              </FormGroup>
              {errorMessage && <div className="alert alert-danger text-center">{errorMessage}</div>}
              <LoadingButton className="button login-submit" type="submit" block loading={isLoading}>
                <span className="button-text">Đăng nhập</span> <ChevronsRight className="button-icon" size={22} />
              </LoadingButton>
            </Form>
            <div className="brand-logo-login">
              <img className="img-fluid logo-login" src={logoCompany} alt="Not authorized page" />
              <h3>Demo Movie</h3>
            </div>
          </div>
          <div className="screen-background">
            <span className="screen-background-shape screen-background-shape4"></span>
            <span className="screen-background-shape screen-background-shape3"></span>
            <span className="screen-background-shape screen-background-shape2"></span>
            <span className="screen-background-shape screen-background-shape1"></span>
          </div>
        </div>
      </div>
      <ul className="bg-bubbles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ul className="bg-bubbles-top">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}
