import { Form, Space, Input, Button, FormProps } from "antd";
import React from "react";

export type TableSearchProps = {
  placeholder: string;
  searchFormProps: FormProps;
};

const TableSearch = ({ placeholder, searchFormProps }: TableSearchProps) => {
  return (
    <Form {...searchFormProps}>
      <Space>
        <Form.Item name="query">
          <Input placeholder={placeholder} width={400} />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">ابحث</Button>
        </Form.Item>
      </Space>
    </Form>
  );
};

export default TableSearch;
