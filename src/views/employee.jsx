import { employeeActionApi, employeeListApi } from "@/api";
import { errorAlert, successAlert } from "@/utils/alert"; // Import alert utilities
import { Button, Card, Col, Form, Input, Modal, Row, Table, message } from "antd";
import { debounce } from "lodash-es";
import React, { useState, useEffect, useRef } from "react";

const Employee = () => {
  const [form] = Form.useForm();
  const [search, setSearch] = useState({
    employeeName: "",
    employeeIphone: "",
  });
  const [tableData, setTableData] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    getList();
  }, [pagination.current, pagination.pageSize]);

  const getList = async () => {
    const res = await employeeListApi({
      page: pagination.current,
      size: pagination.pageSize,
      ...search,
    });
    if (res.code === 0) {
      setTableData(res.records.list);
      setPagination({ ...pagination, total: res.records.total });
    }
  };

  const handleSearchChange = debounce((key, value) => {
    setSearch({ ...search, [key]: value });
    setPagination({ ...pagination, current: 1 });
    getList();
  }, 300);

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handleAddEmployee = () => {
    setModalVisible(true);
  };

  const handleDeleteEmployee = (employee) => {
    setCurrentEmployee(employee);
    setDeleteModalVisible(true);
  };

  const handleDeleteConfirm = async () => {
    const res = await employeeActionApi("remove", { id: currentEmployee.id });
    if (res.code === 0) {
      successAlert("删除成功");
      getList();
    } else {
      errorAlert(res.msg);
    }
    setDeleteModalVisible(false);
  };

  const handleFormSubmit = async () => {
    const values = await form.validateFields();
    const res = await employeeActionApi("save", values);
    if (res.code === 0) {
      successAlert("保存成功");
      getList();
      setModalVisible(false);
    } else {
      errorAlert(res.msg);
    }
  };

  const columns = [
    { title: "姓名", dataIndex: "employeeName", key: "employeeName" },
    { title: "手机号", dataIndex: "employeeIphone", key: "employeeIphone" },
    { title: "部门", dataIndex: "department", key: "department" },
    {
      title: "操作",
      key: "action",
      render: (text, record) => (
        <Button type="link" onClick={() => handleDeleteEmployee(record)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <div className="px-20px py-16px">
      <Card>
        <Form layout="inline">
          <Form.Item>
            <Input
              placeholder="请输入员工姓名"
              value={search.employeeName}
              onChange={(e) => handleSearchChange("employeeName", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="请输入员工手机号"
              value={search.employeeIphone}
              onChange={(e) => handleSearchChange("employeeIphone", e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={handleAddEmployee}>
              添加员工
            </Button>
          </Form.Item>
        </Form>
        <Table
          className="mt-20px"
          columns={columns}
          dataSource={tableData}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </Card>
      <Modal title="添加员工" visible={modalVisible} onCancel={() => setModalVisible(false)} onOk={handleFormSubmit}>
        <Form form={form} layout="vertical">
          <Form.Item name="employeeName" label="姓名" rules={[{ required: true, message: "必填" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="employeeIphone" label="手机号" rules={[{ required: true, message: "必填" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="department" label="部门" rules={[{ required: true, message: "必填" }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="删除员工"
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onOk={handleDeleteConfirm}
      >
        确定删除员工？
      </Modal>
    </div>
  );
};

export default Employee;
