import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const DepartmentEdit = () => {
  const { formProps, saveButtonProps, query } = useForm();

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
      </Form>
    </Edit>
  );
};
