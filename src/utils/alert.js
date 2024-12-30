import { message } from "antd";

export const errorAlert = (msg) => {
  message.error(msg);
};

export const successAlert = (msg) => {
  message.success(msg);
};

export const infoAlert = (msg) => {
  message.info(msg);
};

export const warningAlert = (msg) => {
  message.warning(msg);
};
