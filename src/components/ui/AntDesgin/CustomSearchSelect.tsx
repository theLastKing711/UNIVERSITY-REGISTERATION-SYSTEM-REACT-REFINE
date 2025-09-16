import { Select, SelectProps } from "antd";
import React from "react";

export type CustomSearchSelectProps = SelectProps;

const CustomSearchSelect = ({ ...props }: CustomSearchSelectProps) => {
  return (
    <Select
      {...props}
      filterOption={(input, option) =>
        (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
      }
    />
  );
};

export default CustomSearchSelect;
