"use client";

import { appStorageKey } from "@/constants/keys";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import store from "store2";

// 本地数据验证
export const LocalDataValidation = () => {
  const router = useRouter();

  useEffect(() => {
    if (!store.get(appStorageKey)) {
      router.push("/");
    }
  }, []);

  return null;
};
