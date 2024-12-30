import { Col, Menu, Row, Tabs } from "antd";
import React, { useState } from "react";

const { TabPane } = Tabs;

const ConfigurePage = () => {
  const [currentMenu, setCurrentMenu] = useState("1");

  const handleMenuClick = (e) => {
    setCurrentMenu(e.key);
  };

  return (
    <div className="px-20px py-16px">
      <Tabs defaultActiveKey="1" tabPosition="left">
        <TabPane tab="Tab 1" key="1">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Menu mode="vertical" selectedKeys={[currentMenu]} onClick={handleMenuClick} style={{ height: "100%" }}>
                <Menu.Item key="1">菜单项1</Menu.Item>
                <Menu.Item key="2">菜单项2</Menu.Item>
                <Menu.Item key="3">菜单项3</Menu.Item>
              </Menu>
            </Col>
            <Col span={18}>
              {currentMenu === "1" && (
                <div>
                  <h2>菜单项1的内容</h2>
                  <p>这里是菜单项1的内容区域。</p>
                </div>
              )}
              {currentMenu === "2" && (
                <div>
                  <h2>菜单项2的内容</h2>
                  <p>这里是菜单项2的内容区域。</p>
                </div>
              )}
              {currentMenu === "3" && (
                <div>
                  <h2>菜单项3的内容</h2>
                  <p>这里是菜单项3的内容区域。</p>
                </div>
              )}
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Menu mode="vertical" selectedKeys={[currentMenu]} onClick={handleMenuClick} style={{ height: "100%" }}>
                <Menu.Item key="1">菜单项1</Menu.Item>
                <Menu.Item key="2">菜单项2</Menu.Item>
                <Menu.Item key="3">菜单项3</Menu.Item>
              </Menu>
            </Col>
            <Col span={18}>
              {currentMenu === "1" && (
                <div>
                  <h2>菜单项1的内容</h2>
                  <p>这里是菜单项1的内容区域。</p>
                </div>
              )}
              {currentMenu === "2" && (
                <div>
                  <h2>菜单项2的内容</h2>
                  <p>这里是菜单项2的内容区域。</p>
                </div>
              )}
              {currentMenu === "3" && (
                <div>
                  <h2>菜单项3的内容</h2>
                  <p>这里是菜单项3的内容区域。</p>
                </div>
              )}
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ConfigurePage;
