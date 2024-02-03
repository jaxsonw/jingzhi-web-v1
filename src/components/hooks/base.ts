import React, { useState, useEffect } from "react";
import { getUserInfo } from "../../services/index";
 
const CommonHooks = () => {
  const [userInfo, setUserInfo] = useState(null);

  const init = async () => {
    const res = await getUserInfo();
    if (res?.code !== 0) {
      setUserInfo(null);
      return;
    }
    setUserInfo(res?.data);
  };
  useEffect(() => {
    init();
  }, []);

  return {
    userInfo,
  };
};

export default CommonHooks;
