import { ajax } from "@/api/ajax";
import ChatClient from "@/components/ChatClient";
import { Avatar, Card, Col, Divider, Form, Input, List, Row, Select, Tabs } from "antd";
import debounce from "lodash-es/debounce";
import React, { useEffect, useState } from "react";

const { Option } = Select;
const { TabPane } = Tabs;

const Chat = () => {
  const [tab, setTab] = useState("");
  const [search, setSearch] = useState("");
  const [platform, setPlatform] = useState("DouYin");
  const [platformCountInVague, setPlatformCountInVague] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [currentPlatformList, setCurrentPlatformList] = useState([]);
  const [chatDetail, setChatDetail] = useState({});
  const [userTag, setUserTag] = useState({});
  const [chatHistory, setChatHistory] = useState([]);

  const tabItems = [
    { title: "全部会话", value: "" },
    { title: "AI会话", value: "ai" },
    { title: "人工会话", value: "user" },
  ];

  const debouncedSearch = debounce(() => {
    getAllList();
  }, 250);

  const clearSearch = () => {
    setSearch("");
    getAllList();
  };

  const triggerClick = () => {
    setChatDetail((prev) => ({
      ...prev,
      thisServantType: prev.thisServantType === "ai" ? "user" : "ai",
    }));
  };

  const listItemClick = async (item) => {
    console.log("详情:::::", item);
    const res = await ajax({
      url: "/conversation/getOneDetail",
      params: { sessionId: item.sessionId },
    });
    console.log(res);
    const { code, records } = res;
    if (code === 0) {
      setChatDetail(item);
      const formattedRecords = records.conversationLines.map((line) => ({
        ...line,
        formatData: `${line.occurTime} <span class="text-primary">${line.message}</span>`,
      }));
      setChatHistory((prevState) => ({
        ...prevState,
        list: formattedRecords,
      }));
    }
    getUserTag(item.UserId);
  };

  const addChatHistory = (item) => {
    setChatHistory((prev) => [...prev, item]);
  };

  const getDouYinList = async () => {
    const res = await ajax({
      url: "/sys/boundUser/boundUserPage",
      params: { page: 1, size: -1 },
    });
    console.log("全部账号", res);
    if (res.code === 0) {
      const formattedList = res.records.list.map((item) => ({
        ...item,
        title: `${item.nickname}(${item.userTypeString})`,
      }));
      setCurrentPlatformList(formattedList);
    }
  };

  const getAllList = async () => {
    console.log("获取列表详情");
    const res = await ajax({
      url: "/conversation/getConversationList",
      params: {
        page: 1,
        size: 100000,
        nickNameInVague: search,
        servantType: tab,
        platform,
      },
    });
    console.log(res);
    const { code, records } = res;
    if (code === 0) {
      setListItems(records.list);
    }
  };

  const getUserTag = async (platformUserId) => {
    const res = await ajax({
      url: "/conversation/getUserTags",
      params: { platformUserId },
    });
    console.log("用户标签", res);
    if (res.code === 0) {
      setUserTag(res.records);
    }
  };

  useEffect(() => {
    getDouYinList();
    getAllList();
  }, []);

  useEffect(() => {
    if (listItems.length > 0) {
      listItemClick(listItems[0]);
    }
  }, [listItems]);

  return (
    <div className="pa-4 project-chat">
      <Card className="rounded-sm">
        <Form layout="inline" className="">
          <Form.Item label="平台">
            <Select
              value={platform}
              onChange={(value) => {
                setPlatform(value);
                debouncedSearch();
              }}
              allowClear
              style={{ width: 200 }}
            >
              <Option value="DouYin">抖音</Option>
              <Option value="KuaiShou" disabled>
                快手
              </Option>
              <Option value="ShiPinHao" disabled>
                视频号
              </Option>
              <Option value="XiaoHongShu" disabled>
                小红书
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="账号">
            <Select value={platformCountInVague} onChange={setPlatformCountInVague} allowClear style={{ width: 200 }}>
              {currentPlatformList.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Card>
      <Card className="mt-4 rounded-sm" style={{ minHeight: 500 }}>
        <Row className="chat-body">
          <Col span={6} className="chat-list">
            <Tabs
              activeKey={tab}
              onChange={(key) => {
                setTab(key);
                clearSearch();
              }}
              tabBarGutter={0}
            >
              {tabItems.map((item) => (
                <TabPane tab={item.title} key={item.value} />
              ))}
            </Tabs>
            <Input
              placeholder="昵称"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                debouncedSearch();
              }}
              allowClear
            />
            <Card>
              <Tabs activeKey={tab}>
                {tabItems.map((tabChild) => (
                  <TabPane key={tabChild.value}>
                    <List
                      className="tab-list"
                      itemLayout="horizontal"
                      dataSource={listItems}
                      renderItem={(item) => (
                        <List.Item onClick={() => listItemClick(item)}>
                          <List.Item.Meta
                            avatar={<Avatar src={item.avatarUrl} />}
                            title={<b>{item.nickName}</b>}
                            description={item.lastMsg}
                          />
                        </List.Item>
                      )}
                    />
                  </TabPane>
                ))}
              </Tabs>
            </Card>
          </Col>
          <Col span={18}>
            <ChatClient
              chatDetail={chatDetail}
              chatHistory={chatHistory}
              userTag={userTag}
              triggerClick={triggerClick}
              listItemClick={listItemClick}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Chat;
