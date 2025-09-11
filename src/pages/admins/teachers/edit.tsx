import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";
import { useNotification, useSubscription } from "@refinedev/core";

export const TeacherEdit = () => {
  const { formProps, saveButtonProps, id } = useForm();

  const { departmentSelectProps } = useGetDepratments();

  const { open } = useNotification();

  useSubscription({
    channel: `teachers.${id}`,
    types: [".updated"],
    onLiveEvent: (event) => {
      console.log("event", event);
      open?.({
        type: "success",
        message: event.payload["message"],
      });
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
        <Form.Item
          label="القسم"
          name="department_id"
          rules={[
            {
              required: true,
              message: "القسم مطلوب",
            },
          ]}
        >
          <Select placeholder="اختر قسم" {...departmentSelectProps} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
