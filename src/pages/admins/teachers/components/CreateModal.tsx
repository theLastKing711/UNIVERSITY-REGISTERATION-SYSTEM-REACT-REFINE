import React from "react";
import { useModalForm } from "@refinedev/antd";
import {
  useNotification,
  useSubscription,
  useTranslation,
} from "@refinedev/core";
import { Form, Input } from "antd";
import CustomSearchSelect from "../../../../components/ui/AntDesgin/CustomSearchSelect";
import { useGetDepratments } from "../../../../hooks/API/select/useGetDepartments";
import CustomCreateModal from "../../../../components/ui/AntDesgin/CustomCreateModal";

export type EditModalProps = {
  onClose: () => void;
};

const CreateModal = ({ onClose }: EditModalProps) => {
  const { translate } = useTranslation();

  const { form, formProps, modalProps, formLoading } = useModalForm({
    resource: "admins/teachers",
    action: "create",
    onMutationSuccess(data, variables, context, isAutoSave) {
      onClose();
    },
    successNotification: (data, values, resourses) => ({
      message: translate("notifications.success"),
      description: translate("notifications.editSuccess"),
      type: "success",
    }),
  });

  const { departmentSelectProps } = useGetDepratments();

  return (
    <CustomCreateModal
      {...modalProps}
      resourseTitle={translate("resources.teacher")}
      title="تعديل بيانت الأستاذ"
      onCancel={() => onClose()}
      onSubmit={() => form.submit()}
      onClose={() => onClose()}
      submitLoading={formLoading}
    >
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
    </CustomCreateModal>
  );
};

export default CreateModal;
