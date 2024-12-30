import React, { useState, useEffect } from "react";
import { message } from "antd";

const GlobalAlert = () => {
  const [alertMap, setAlertMap] = useState(new Map());

  useEffect(() => {
    const handleNewAlert = (type, msg) => {
      const id = Math.random().toString();
      setAlertMap((prev) => new Map(prev).set(id, { type, message: msg }));
      displayAlert(type, msg);
      deleteAlert(id);
    };

    // Subscribe to alert events
    const unsubscribe = subscribeToAlerts(handleNewAlert);
    return () => unsubscribe();
  }, []);

  const deleteAlert = (id) => {
    setTimeout(() => {
      setAlertMap((prev) => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
    }, 3000);
  };

  const displayAlert = (type, msg) => {
    if (type === "success") {
      message.success(msg);
    } else if (type === "error") {
      message.error(msg);
    } else if (type === "info") {
      message.info(msg);
    } else if (type === "warning") {
      message.warning(msg);
    }
  };

  return <div className="alert-container">{/* Render alerts if needed */}</div>;
};

// Mock function to simulate alert subscription
const subscribeToAlerts = (callback) => {
  // Simulate an alert event
  setTimeout(() => callback("success", "This is a success message"), 1000);
  setTimeout(() => callback("error", "This is an error message"), 2000);

  // Return an unsubscribe function
  return () => {};
};

export default GlobalAlert;
