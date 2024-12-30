import globalStore from "@/store/globalStore"; // Import the global store
import { MenuOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Avatar, Button, Image, Layout, Switch } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useSnapshot } from "valtio";

const { Header } = Layout;

const AppBar = () => {
  const navigate = useNavigate();
  const snap = useSnapshot(globalStore); // Use the global store
  const userName = localStorage.getItem("userName"); // Get userName from localStorage

  const handleLogout = () => {
    window.localStorage.removeItem("access-token");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  return (
    <Header
      style={{
        position: "fixed",
        top: 0,
        left: "200px",
        width: "calc(100% - 200px)",
        display: "flex",
        justifyContent: "end",
        padding: "16px",
        boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.05)",
        zIndex: 2,
        height: "60px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <Avatar src="https://cdn.vuetifyjs.com/images/john.jpg" />
        <span style={{ marginLeft: "16px", color: "#333" }}>{userName}</span> {/* Display userName */}
        <Button type="link" onClick={handleLogout} style={{ marginLeft: "16px", color: "#333" }}>
          登出
        </Button>
      </div>
    </Header>
  );
};

export default AppBar;
