import { MessageOutlined, PhoneOutlined, RobotOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { proxy, useSnapshot } from "valtio";
import "@/styles/style.css"; // Import the CSS file

const state = proxy({
  rail: false,
  mobile: false,
});

const AppMenu = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate(); // Initialize useNavigate

  const changeMenuState = () => {
    if (snap.mobile) {
      state.rail = false;
    } else {
      state.rail = !snap.rail;
    }
  };

  const handleMenuClick = (url, id) => {
    navigate(id ? `${url}${id}` : url); // Adjust to handle items without id
  };

  const admins = [
    {
      title: "抖音账号管理",
      url: "/project/account/",
      id: "11",
    },
    {
      title: "小红书账号管理",
      url: "/project/account/",
      id: "12",
      disabled: true,
    },
    {
      title: "快手账号管理",
      url: "/project/account/",
      id: "13",
      disabled: true,
    },
    {
      title: "视频号账号管理",
      url: "/project/account/",
      id: "14",
      disabled: true,
    },
    {
      title: "员工管理",
      url: "/project/employee",
      id: "", // No id for this item
    },
  ];

  useEffect(() => {
    const handleTriggerMenu = () => changeMenuState();
    window.addEventListener("handleTriggerMenu", handleTriggerMenu);
    return () => {
      window.removeEventListener("handleTriggerMenu", handleTriggerMenu);
    };
  }, []);

  return (
    <div className="w-200px">
      <Menu mode="inline">
        <Menu.SubMenu key="Admin" title="系统管理" icon={<UsergroupAddOutlined />}>
          {admins.map(({ title, url, id, disabled }) => (
            <Menu.Item key={id || title} disabled={disabled} onClick={() => handleMenuClick(url, id)}>
              {title}
            </Menu.Item>
          ))}
        </Menu.SubMenu>
        <Menu.Item key="home" icon={<MessageOutlined />} onClick={() => handleMenuClick("/project/chat")}>
          会话管理
        </Menu.Item>
        <Menu.Item key="account" icon={<RobotOutlined />} onClick={() => handleMenuClick("/project/robot")}>
          AI设置
        </Menu.Item>
        <Menu.Item key="clue" icon={<PhoneOutlined />} onClick={() => handleMenuClick("/project/clue")}>
          线索管理
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default AppMenu;
