import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { DatePicker, Form, Input } from "antd";

export const MeetingCreate = () => {
  const { formProps, saveButtonProps, query } = useForm();

  ؤخىسف;

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="وقت الاجتماع"
          name="happens_at"
          rules={[
            {
              required: true,
              message: "وقت الاجتماع مطلوب",
            },
          ]}
        >
          <DatePicker showTime />
        </Form.Item>
      </Form>
    </Create>
  );
};
