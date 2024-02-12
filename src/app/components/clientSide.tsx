"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const ClientComponent = () => {
  const [test, setTest] = useState();
  const pathname = usePathname();
  const test1 = () => {
    console.log("OK!");
  };

  useEffect(() => {
    if (!test1) return;
    console.log("msg");
  }, [setTest]);
  return (
    <div className="p-8">
      {pathname == "/" ? <h1>トップページ</h1> : <h1></h1>}
      <button onClick={test1}>テスト</button>
    </div>
  );
};
