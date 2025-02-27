import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import propertiesSlice from "./propertiesSlice";
import serviceSlice from "./serviceSlice";

const makeStore = () =>
  configureStore({
    reducer: {
      service: serviceSlice,
      rent: propertiesSlice, 
    },
  });

export const wrapper = createWrapper(makeStore);
