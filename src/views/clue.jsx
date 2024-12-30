import { clueImpartApi, clueSearchApi, employeeSearchApi } from "@/api";
import { errorAlert, successAlert } from "@/utils/alert";
import { Button, Card, DatePicker, Form, Input, Modal, Select, Table, message } from "antd";
import { debounce, throttle } from "lodash-es"; // Import debounce and throttle from lodash-es
import React, { useEffect, useState } from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

const Clue = () => {
  const [form] = Form.useForm();
  const [platform, setPlatform] = useState(null);
  const [query, setQuery] = useState({
    clueId: "",
    iphone: "",
    platfromBindUserName: "",
    platfromUserName: "",
    startTime: "",
    endTime: "",
  });
  const [pagination, setPagination] = useState({ page: 1, size: 10, total: 0 });
  const [tableData, setTableData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [open, setOpen] = useState(false);
  const [cid, setCid] = useState("");
  const [employeeId, setEmployeeId] = useState("");

  const headers = [
    { title: "线索ID", dataIndex: "clueId", key: "clueId" },
    { title: "平台", dataIndex: "platform", key: "platform" },
    {
      title: "账号",
      dataIndex: "platfromBindUserName",
      key: "platfromBindUserName",
    },
    {
      title: "留资用户",
      dataIndex: "platfromUserName",
      key: "platfromUserName",
    },
    { title: "留资来源", dataIndex: "clueFrom", key: "clueFrom" },
    { title: "留资时间", dataIndex: "clueTime", key: "clueTime" },
    { title: "手机号", dataIndex: "iphone", key: "iphone" },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button type="primary" onClick={() => dispatchClue(record)}>
          分配线索
        </Button>
      ),
    },
  ];

  const ql = [
    { label: "请输入线索ID", key: "clueId" },
    { label: "请输入手机号", key: "iphone" },
    { label: "请输入账号", key: "platfromBindUserName" },
    { label: "请输入留资用户", key: "platfromUserName" },
  ];

  useEffect(() => {
    getList();
  }, [pagination.page, pagination.size, query]);

  const getList = async () => {
    try {
      const res = await clueSearchApi({
        page: pagination.page,
        size: pagination.size,
        ...query,
      });
      const { list, total } = res?.records || {};
      setTableData(list || []);
      setPagination((prev) => ({ ...prev, total: total || 0 }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleQueryChange = debounce((key, value) => {
    setQuery((prev) => ({ ...prev, [key]: value }));
    resetPagination();
  }, 100);

  const handleEmployeeSearch = throttle(async (value) => {
    try {
      const { records } = await employeeSearchApi({ search: value });
      setUserList(
        records?.map((item) => ({
          ...item,
          title: `${item.employeeName}/${item.department}/${item.employeeIphone}`,
        })) || [],
      );
    } catch (e) {
      console.error(e);
    }
  }, 1000);

  const dispatchClue = ({ clueId }) => {
    setCid(clueId);
    setOpen(true);
  };

  const handlePageChange = (page, size) => {
    setPagination({ ...pagination, page, size });
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      await clueImpartApi({ clueId: cid, employeeId: values.employeeId });
      successAlert("分配成功");
      resetPagination();
      setOpen(false);
    } catch (e) {
      errorAlert(e.message);
    }
  };

  const resetPagination = () => {
    setPagination({ page: 1, size: 10 });
  };

  return (
    <div className="pa-4">
      <Card className="mb-20px">
        <Form form={form} layout="inline" className="d-flex align-md-center justify-space-between ga-5">
          <Form.Item name="platform">
            <Select
              placeholder="平台"
              value={platform}
              onChange={(value) => handleQueryChange("platform", value)}
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

          {ql.map((item) => (
            <Form.Item key={item.key} name={item.key}>
              <Input
                placeholder={item.label}
                value={query[item.key]}
                onChange={(e) => handleQueryChange(item.key, e.target.value)}
                style={{ width: 200 }}
              />
            </Form.Item>
          ))}
        </Form>
      </Card>

      <Table
        columns={headers}
        dataSource={tableData}
        pagination={{
          current: pagination.page,
          pageSize: pagination.size,
          total: pagination.total,
          onChange: handlePageChange,
        }}
      />

      <Modal title="分配线索" visible={open} onCancel={() => setOpen(false)} onOk={handleSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item name="employeeId" label="请选择员工姓名/部门/手机号" rules={[{ required: true, message: "必填" }]}>
            <Select
              showSearch
              placeholder="请选择员工姓名/部门/手机号"
              onSearch={handleEmployeeSearch}
              filterOption={false}
            >
              {userList.map((user) => (
                <Option key={user.id} value={user.id}>
                  {user.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clue;
