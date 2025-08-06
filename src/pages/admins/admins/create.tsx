import React from "react";

import { Create, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";

import { CreateAdminRequestData } from "../../../types/admins/admins";

export const AdminCreate = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
  } = useForm<CreateAdminRequestData>({
    successNotification: (data, values, resourses) => ({
      message: "إنشاء مستخدم جديد",
      description: "تم إنشاء مستخدم جديد بنجاح",
      type: "success",
    }),
  });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  return (
    <Create
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="إنشاء مستخدم جديد"
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="اسم المستخدم"
          name="name"
          rules={[
            {
              required: true,
              message: "اسم المستخدم مطلوب",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[
            {
              required: true,
              message: "كلمة المرور مطلوبة",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {errorsList && (
          <div style={{ color: "red" }}>
            {errorsList.map((error) => (
              <h5>{error}</h5>
            ))}
          </div>
        )}
      </Form>
    </Create>
  );
};
