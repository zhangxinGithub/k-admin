import { ajax } from "@/api/ajax";
import { Avatar, Button, Card, Divider, Input, List, Tag } from "antd";
import React, { useState, useEffect } from "react";

const ChatClient = ({ chatDetail, chatHistory, userTag, listItemClick, triggerClick }) => {
  const [expand, setExpand] = useState(false);
  const [message, setMessage] = useState(chatDetail.message);

  const handleClick = () => {
    setExpand(!expand);
  };

  const handleTriggerClick = async () => {
    const res = await ajax({
      url: "/conversation/switchServant",
      method: "POST",
      data: {
        sessionId: chatDetail.sessionId,
        toServantType: chatDetail.thisServantType === "ai" ? "user" : "ai",
      },
    });
    if (res.code === 0) {
      listItemClick(chatDetail.sessionId);
      triggerClick();
    }
  };

  return (
    <div className="chat-client">
      <div className="header flex justify-between">
        <div className="nickname cursor-pointer" onClick={handleClick}>
          {chatDetail.nickName}
        </div>
        <Button size="small" type="primary" onClick={handleTriggerClick}>
          {chatDetail.thisServantType === "ai" ? "转人工" : "转AI"}
        </Button>
      </div>
      <Divider />
      <div className="chat-content">
        <div className={`chat-history ${chatDetail.thisServantType === "user" ? "chat-scroll-input" : "chat-scroll"}`}>
          {chatHistory.list?.map((item, i) => (
            <div key={i} className="chat-item">
              {item.direction === -1 && (
                <div className="centered">
                  <Tag>{item.formatData}</Tag>
                </div>
              )}
              {item.direction === 1 && (
                <div className="bot-message">
                  <Avatar src={item.avatarUrl} onClick={handleClick} />
                  <div>{item.message}</div>
                </div>
              )}
              {item.direction === 0 && (
                <div className="user-message">
                  <div>{item.message}</div>
                  <Avatar src="https://cdn.vuetifyjs.com/images/john.jpg" />
                </div>
              )}
            </div>
          ))}
        </div>
        {chatDetail.thisServantType === "user" && (
          <Input.TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="ma-4"
            placeholder="在此输入回复内容，按Enter发送，按Shift+Enter换行"
            rows={3}
            autoSize={{ minRows: 3, maxRows: 5 }}
          />
        )}
      </div>
      {expand && (
        <Card className="user-details" title="用户详情" extra={<Button icon="mdi-close-thick" onClick={handleClick} />}>
          <List
            dataSource={userTag}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={`${item.tagName}:`} description={item.tagValue} />
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default ChatClient;
