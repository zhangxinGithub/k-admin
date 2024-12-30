import "antd/dist/reset.css";
import "dayjs/locale/zh-cn";
import "./styles/style.css";

import Routers from "@/router";
import globalStore from "@/store/globalStore"; // Import globalStore
import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import ReactDOM from "react-dom/client";
import { useSnapshot } from "valtio";

const ELE_ID = "root"; // Define the root element ID

const App = () => {
  return (
    <ConfigProvider
      getPopupContainer={(triggerNode) => {
        if (triggerNode?.parentElement) {
          return triggerNode.parentElement;
        }
        return document.getElementById(ELE_ID);
      }}
      prefixCls="my-app"
      locale={zhCN}
    >
      <Routers />
    </ConfigProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById(ELE_ID));
root.render(<App />);
