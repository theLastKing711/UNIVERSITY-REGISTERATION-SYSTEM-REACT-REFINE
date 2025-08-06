import React from "react";

import { Edit, useForm } from "@refinedev/antd";

import { Form, Input } from "antd";
import { UpdateAdminRequestData } from "../../../types/admins/admins";

export const AdminEdit = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
    query,
  } = useForm<UpdateAdminRequestData>({
    successNotification: (data, values, resourses) => ({
      message: "تعديل مستخدم",
      description: "تم تعديل المستخدم بنجاح",
      type: "success",
    }),
  });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  if (!query?.data) {
    return <div>Loading...</div>;
  }

  return (
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="تعديل بيانات مستخدم"
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
          initialValue={mutationResult?.data?.data.name}
        >
          <Input />
        </Form.Item>
        <Form.Item label="كلمة المرور" name="password">
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
    </Edit>
  );
};
