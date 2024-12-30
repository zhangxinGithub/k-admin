import { ajax } from "@/api/ajax";
import { Button, Card, Col, ConfigProvider, Progress, Row, Switch, Tabs, message } from "antd";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import BackConfigurePage from "./backConfigurePage"; // 引入BackConfigurePage组件

const { TabPane } = Tabs;

const Robot = () => {
  const items = [
    {
      label: "抖音",
      key: "1",
      disabled: true,
    },
    {
      label: "视频号",
      key: "2",
      disabled: true,
    },
    {
      label: "快手",
      key: "3",
      disabled: true,
    },
    {
      label: "小红书",
      key: "4",
    },
  ];

  const navigate = useNavigate(); // Initialize useNavigate
  const [isBackConfigureVisible, setIsBackConfigureVisible] = useState(false); // 添加状态管理

  useEffect(() => {
    getAiConfig();
  }, []);

  const getAiConfig = async () => {
    const res = await ajax({
      url: "/aiConfig/getAiConfig",
    });
    console.log(res);
  };

  const submit = async (values) => {
    console.log("submit", values);
    message.success("保存成功");
  };

  const handleConfigureClick = () => {
    navigate("/project/configure");
  };

  const handleAnotherConfigureClick = () => {
    setIsBackConfigureVisible(true); // 显示BackConfigurePage
  };

  const handleBackConfigureClose = () => {
    setIsBackConfigureVisible(false); // 隐藏BackConfigurePage
  };

  return (
    <div>
      {/* AI数字人 */}
      <div
        className="bg-#fff px-20px py-16px"
        style={{ background: " linear-gradient( 180deg, #E5ECFF 0%, #FFFFFF 40%, #FFFFFF 100%)" }}
      >
        <div className="flex justify-between items-center">
          <div className="text-20px line-height-28px font-600">AI数字人</div>
          <Switch checkedChildren="开" unCheckedChildren="关" />
        </div>
        <div className="border border-solid border-color-#FF822A26 bg-#FF822A14 rounded-4px px-10px py-8px mt-10px text-#FF822A">
          数字人将在新媒体私信中，自动帮您接待客户，进行多轮沟通，达到引导客户留资等营销目的。
        </div>
        <div className="mt-30px">
          <div className="font-600 text-20px line-height-28px">问题个性化设置</div>
          <div className="text-#999 text-12px mt-7px line-height-17px">
            根据您的经营策略和不同的客户场景，打造您的专属AI数字人，让AI与个性化定制完美融合，助您持续提升销售力！
          </div>
          <div className="mt-20px">
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <div
                  style={{
                    boxShadow: "0px 4px 8px rgba(0,0,0,0.08)",
                    border: " 1px solid #E4E4E4",
                    borderRadius: "8px",
                    padding: "20px",
                  }}
                >
                  <div className="flex justify-between items-center mb-6px">
                    <span className="text-16px line-height-20px">车辆报价与优惠</span>
                    <span
                      className="text-12px line-height-20px border border-solid rounded-3px px-8px"
                      style={{ color: "#2DBE1E", backgroundColor: "#2DBE1E14", borderColor: "#2DBE1E26" }}
                    >
                      已完成
                    </span>
                  </div>
                  <Progress percent={50} size="small" status="active" showInfo={false} strokeColor="#376AFF" />
                  <div className="mt-6px">
                    <span className="text-14px line-height-20px">进度：</span>
                    <span className="text-14px line-height-20px">
                      已完成<span>4</span>/8项
                    </span>
                  </div>
                  <div
                    className="text-14px line-height-20px mt-12px cursor-pointer text-#376AFF"
                    onClick={handleConfigureClick}
                  >
                    去配置
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className="mt-16px bg-#fff px-20px py-16px">
        <Tabs defaultActiveKey="4">
          {items.map((item) => (
            <TabPane tab={item.label} key={item.key} disabled={item.disabled}>
              {/* 根据key显示内容 */}
              {item.key === "4" && (
                <div>
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div className="card-container">
                        <div className="flex justify-between items-center">
                          <div className="mb-20px">
                            <span className="text-16px font-500 line-height-22px mr-10px">线索挽回</span>
                            <span className="text-12px text-#999 line-height-20px ">线索挽回生效中...</span>
                          </div>
                          <Switch></Switch>
                        </div>
                        <p className="text-14px line-height-20px ">*对有沟通未留资⽤户主动触达</p>
                        <div className="flex justify-between items-center">
                          <p className="text-14px text-#999 line-height-20px m-0">线索挽回配置：</p>
                          <div>
                            <p
                              className="text-14px cursor-pointer m-0 text-#376AFF"
                              onClick={handleAnotherConfigureClick}
                            >
                              去配
                            </p>
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="card-container">
                        <div className="flex justify-between items-center ">
                          <div className="mb-18px">
                            <span className="text-16px font-500 line-height-22px mr-10px">3分钟回复</span>
                            <span className="text-12px text-#999 line-height-20px">3分钟回复率提升生效中...</span>
                          </div>
                          <Switch></Switch>
                        </div>
                        <p className="text-14px line-height-20px m-0">
                          针对已经转人工，但人工在2分钟30秒内未针对已经转人工，但人工在2分钟30秒内未承接的客户，AI将结合上下文自动承接
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </TabPane>
          ))}
        </Tabs>
      </div>
      {isBackConfigureVisible && (
        <BackConfigurePage onClose={handleBackConfigureClose} onCancel={handleBackConfigureClose} />
      )}
    </div>
  );
};

export default Robot;
