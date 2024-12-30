import logoLight from "@/assets/logo-light.png";
import logo from "@/assets/logo.png";
import AppBar from "@/components/AppBar";
import AppMenu from "@/components/AppMenu";
import { darkTheme, lightTheme } from "@/main"; // Import themes from main
import globalStore from "@/store/globalStore";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Divider, Layout } from "antd";
import React, { useState, useEffect } from "react";
import { Outlet, Route, BrowserRouter as Router, Routes, Switch } from "react-router-dom";
import { useSnapshot } from "valtio";

const { Header, Sider, Content } = Layout;

const Project = () => {
  const snap = useSnapshot(globalStore); // Use the global store
  const [theme, setTheme] = useState(snap.theme); // Add state for theme
  // const [siderWidth, setSiderWidth] = useState("200px");

  useEffect(() => {
    setTheme(snap.theme); // Synchronize state with global store
  }, [snap.theme]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth < 768) {
  //       setSiderWidth("100%");
  //     } else {
  //       setSiderWidth("200px");
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleClickNav = () => {
    globalStore.toggleMenu();
  };

  return (
    <Layout style={{ overflow: "hidden" }}>
      <Layout>
        <Sider
          style={{
            boxShadow: "6px 0px 6px -4px rgba(0,0,0,0.08)",
            position: "relative",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", height: "60px", alignItems: "center" }}>
            <Button
              icon={<MenuOutlined />}
              onClick={handleClickNav}
              style={{
                fontSize: "24px",
                color: snap.theme === "customDarkTheme" ? "#f2c361" : "#000",
                backgroundColor: "transparent",
                borderColor: "transparent",
                borderRadius: "0",
              }}
            />
            <img
              width={110}
              src={snap.theme === "customDarkTheme" ? logo : logoLight}
              alt="John"
              style={{ marginLeft: "16px" }}
            />
          </div>
          <AppMenu />
        </Sider>
        <Content
          style={{
            overflowY: "auto",
            height: "calc(100vh)",
            scrollbarWidth: "thin",
            scrollbarColor: "#666 transparent",
          }}
        >
          <AppBar onThemeChange={handleThemeChange} />
          <div className="pt-60px">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Project;
