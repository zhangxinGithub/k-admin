import { ajax } from "@/api/ajax";
import loginBg from "@/assets/login-bg.png";
import logo from "@/assets/logo.png";
import { Button, Card, Form, Input, message } from "antd";
import md5 from "js-md5";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async () => {
    setLoading(true);
    const res = await ajax({
      url: "/aath/sysLogin",
      method: "POST",
      data: {
        userName,
        passwordInMd5: md5(password).toUpperCase(),
      },
    });
    setLoading(false);
    if (res.code === 0) {
      window.localStorage.setItem("access-token", res.records);
      localStorage.setItem("userName", userName);
      navigate("/project/account/11");
    } else {
      message.error("账号或密码错误");
    }
  };

  return (
    <div
      className="logo-container"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        className="logo-body"
        style={{
          background: "rgba(0, 0, 0, 0.5)",
          borderColor: "rgb(255,255,255)",
          textAlign: "center",
          padding: "20px",
          width: "500px",
          borderRadius: "10px",
        }}
      >
        <img src={logo} className="m-16px " alt="Logo" />
        <Form onFinish={onFinish}>
          <Form.Item name="userName" rules={[{ required: true, message: "不能为空" }]}>
            <Input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="用户名"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: "不能为空" }]}>
            <Input.Password
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="密码"
              disabled={loading}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
