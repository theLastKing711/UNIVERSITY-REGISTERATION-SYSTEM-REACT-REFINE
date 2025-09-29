import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";
import {
  useNotification,
  useSubscription,
  useTranslation,
} from "@refinedev/core";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";

export const TeacherEdit = () => {
  const { translate } = useTranslation();

  const { formProps, saveButtonProps, id } = useForm({
    successNotification: (data, values, resource) => {
      return {
        message: translate("notifications.editSuccess", {
          resource: translate("resources.teacher"),
        }),
        description: translate("notifications.success"),
        type: "success",
      };
    },
    errorNotification: (data, values, resource) => {
      return {
        message: translate("notifications.editError", {
          resource: translate("resources.teacher"),
        }),
        description: translate("notifications.error"),
        type: "error",
      };
    },
  });

  const { departmentSelectProps } = useGetDepratments();

  const { open } = useNotification();

  useSubscription({
    channel: `teachers.${id}`,
    types: [".updated"],
    onLiveEvent: (event) => {
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
          <CustomSearchSelect
            placeholder="اختر قسم"
            {...departmentSelectProps}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
