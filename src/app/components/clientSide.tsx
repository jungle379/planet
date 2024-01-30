"use client";

import { useEffect, useState } from "react";

export const ClientComponent = () => {
  const [test, setTest] = useState();
  const test1 = () => {
    console.log("OK!");
  };
  useEffect(() => {
    if (!test1) return;
    console.log("msg");
  }, [test]);
  return (
    <div className="p-8">
      <h1>トップページ</h1>
      <button onClick={test1}>テスト</button>
    </div>
  );
};
