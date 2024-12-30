import { ajax } from "@/api/ajax";
import { errorAlert, successAlert } from "@/utils/alert"; // Import alert utilities
import { Button, Card, Col, Input, Row, Table } from "antd";
import { debounce } from "lodash-es";
import React, { useState, useEffect } from "react";

const Account = () => {
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState({
    pageSize: 10,
    current: 1,
    total: 0,
    list: [],
  });

  useEffect(() => {
    getData();
  }, [dataList.current, dataList.pageSize]);

  const getData = async () => {
    const res = await ajax({
      url: "/sys/boundUser/boundUserPage",
      params: {
        page: dataList.current,
        size: dataList.pageSize,
        nickNameInVague: search,
      },
    });
    if (res.code === 0) {
      setDataList({
        ...dataList,
        list: res.records.list,
        total: res.records.total,
      });
    } else {
      errorAlert("获取数据失败");
    }
  };

  const handleSearchChange = debounce((value) => {
    setSearch(value);
    setDataList({ ...dataList, current: 1 });
    getData();
  }, 300);

  const handleTableChange = (pagination) => {
    setDataList({
      ...dataList,
      current: pagination.current,
      pageSize: pagination.pageSize,
    });
  };

  const openBindAccount = () => {
    window.open(
      "https://open.douyin.com/platform/oauth/connect/?client_key=awio3mao78zr0xjn&response_type=code&jump_type=h5&scope=user_info,tool.image.upload,im.recall_message,im.microapp_card,im.message_card,fans.check,renew_refresh_token,jump.basic,data.external.item,discovery.ent,live.room.base,live.room.audience,live.room.interactive,data.external.billboard_hot_video,hotsearch,open.platform.user_msg,op.business.status,aweme.forward,open.get.ticket,data.external.fans_favourite,data.external.user,fans.data.bind&redirect_uri=https://dex.bdp.yiche.com/dy-smart/midway&state=STATE",
      "_blank",
    );
  };

  const columns = [
    { title: "账号", dataIndex: "nickname", key: "nickname" },
    { title: "账号类型", dataIndex: "userTypeString", key: "userTypeString" },
    { title: "绑定时间", dataIndex: "bondTime", key: "bondTime" },
    { title: "授权到期时间", dataIndex: "expireTime", key: "expireTime" },
  ];

  return (
    <div className="px-20px py-16px">
      <Card className="account-card">
        <Row justify="space-between" className="mb-20px">
          <Col span={6}>
            <Input placeholder="账号" value={search} onChange={(e) => handleSearchChange(e.target.value)} />
          </Col>
          <Col span={6} className="text-right">
            <Button type="primary" onClick={openBindAccount}>
              绑定账号
            </Button>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={dataList.list}
          pagination={{
            current: dataList.current,
            pageSize: dataList.pageSize,
            total: dataList.total,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default Account;
