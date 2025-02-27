"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store"; // Ensure the correct path

export default function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
