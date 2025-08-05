import React from "react";

import { Create, Edit, useForm, useSelect } from "@refinedev/antd";

import { Form, Input, message, Select } from "antd";

import MDEditor from "@uiw/react-md-editor";
import { IAdminShow, IUpdateAdmin } from "../types";
import { useNavigation, useOne, useShow } from "@refinedev/core";

export const AdminEdit = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
  } = useForm<IUpdateAdmin>({
    successNotification: (data, values, resourses) => ({
      message: "تعديل مستخدم",
      description: "تم تعديل المستخدم بنجاح",
      type: "success",
    }),
  });

  const postData = mutationResult?.data?.data;

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  if (mutationResult.isLoading) {
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
