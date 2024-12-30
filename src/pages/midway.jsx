import { ajax } from "@/api/ajax";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Midway = () => {
  const history = useHistory();

  useEffect(() => {
    const authCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const res = await ajax({
        url: "/aath/douyin",
        params: {
          code: params.get("code"),
          state: params.get("state"),
          scopes: params.get("scopes"),
        },
      });
      console.log(res);
      if (res.code === 0) {
        history.push("/project/account/11");
      }
    };

    authCallback();
  }, [history]);

  return <div>跳转中...</div>;
};

export default Midway;
