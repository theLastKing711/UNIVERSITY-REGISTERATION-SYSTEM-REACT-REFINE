import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";
import { useTranslation } from "@refinedev/core";

export const TeacherCreate = () => {
  const { translate } = useTranslation();

  const { formProps, saveButtonProps } = useForm({
    successNotification: (data, values, resource) => {
      return {
        message: translate("notifications.createSuccess", {
          resource: translate("resources.teacher"),
        }),
        description: translate("notifications.success"),
        type: "success",
      };
    },
    errorNotification: (data, values, resource) => {
      return {
        message: translate("notifications.createError", {
          resource: translate("resources.teacher"),
        }),
        description: translate("notifications.error"),
        type: "error",
      };
    },
  });

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
          <CustomSearchSelect
            placeholder="اختر قسم"
            {...departmentSelectProps}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
