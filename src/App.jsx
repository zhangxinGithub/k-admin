import Project from "@/pages/project/index";
import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

const App = () => {
  return (
    <Layout>
      <Content style={{ maxWidth: "1920px" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default App;
