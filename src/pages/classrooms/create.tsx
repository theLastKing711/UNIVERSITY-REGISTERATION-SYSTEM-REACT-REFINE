import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const ClassroomCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="الاسم"
          name={["name"]}
          rules={[
            {
              required: true,
              message: "الاسم مطلوب",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Create>
  );
};
