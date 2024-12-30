import { Button, Drawer, Form, Input, Select, Switch, message } from "antd";
import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons"; // 引入CloseOutlined图标
import ReactMarkdown from "react-markdown";

const { Option } = Select;

const BackConfigurePage = ({ onClose, onCancel }) => {
  // 接收 onClose 和 onCancel 回调函数
  const [drawerVisible, setDrawerVisible] = useState(true);
  const [markdownContent, setMarkdownContent] = useState("");
  const [form] = Form.useForm();

  const closeDrawer = () => {
    form.resetFields();
    setDrawerVisible(false);
    if (onClose) onClose(); // 调用 onClose 回调函数
  };

  const handleMarkdownChange = (e) => {
    setMarkdownContent(e.target.value);
  };

  const handleSave = (values) => {
    console.log("Form values:", values);
    message.success("保存成功");
    closeDrawer();
  };

  return (
    <div>
      <Drawer
        title={
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>线索挽回配置</span>
            <CloseOutlined onClick={closeDrawer} /> {/* 自定义关闭图标和事件 */}
          </div>
        }
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        width={500}
        closable={false} // 隐藏左侧关闭按钮
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item>
            <span className="mr-24px text-#333 text-14px">线索挽回</span>
            <Switch checkedChildren="开" unCheckedChildren="关" />
          </Form.Item>
          <Form.Item>
            <span className="mr-10px text-#333 text-14px">有沟通超过</span>
            <Select defaultValue="1" style={{ width: "100px", marginRight: "8px" }}>
              {[...Array(10).keys()].map((i) => (
                <Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Option>
              ))}
            </Select>
            <Select defaultValue="秒" style={{ width: "100px", marginRight: "8px" }}>
              <Option value="秒">秒</Option>
              <Option value="分钟">分钟</Option>
              <Option value="小时">小时</Option>
            </Select>
            <span className="text-#333 text-14px">未留资⽤户主动触达</span>
          </Form.Item>
          <Form.Item>
            <Input.TextArea
              rows={4}
              value={markdownContent}
              onChange={handleMarkdownChange}
              placeholder="支持Markdown、换行内容"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "right" }}>
            {" "}
            {/* Align buttons to the right */}
            <Button type="default" onClick={closeDrawer} style={{ marginRight: "8px" }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default BackConfigurePage;
