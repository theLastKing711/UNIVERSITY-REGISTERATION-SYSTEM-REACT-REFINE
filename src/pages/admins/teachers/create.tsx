import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";

export const TeacherCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const { departmentSelectProps } = useGetDepratments();

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
    </Create>
  );
};
