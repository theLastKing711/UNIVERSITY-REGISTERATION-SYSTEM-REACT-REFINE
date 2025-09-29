import React from "react";
import CustomEditModal from "../../../../components/ui/AntDesgin/CustomEditModal";
import { useGetAdminList } from "../../../../hooks/API/select/useGetAdminList";
import { useModalForm } from "@refinedev/antd";
import {
  useNotification,
  useSubscription,
  useTranslation,
} from "@refinedev/core";
import { Form, DatePicker, Select, Input } from "antd";
import { getDayJsValue } from "../../../../helpers";
import CustomSearchSelect from "../../../../components/ui/AntDesgin/CustomSearchSelect";
import { useGetDepratments } from "../../../../hooks/API/select/useGetDepartments";

export type EditModalProps = {
  id: number;
  onClose: () => void;
};

const EditModal = ({ id, onClose }: EditModalProps) => {
  const { translate } = useTranslation();

  const { form, formProps, onFinish, modalProps, formLoading } = useModalForm({
    resource: "admins/teachers",
    action: "edit",
    id,
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
    <CustomEditModal
      {...modalProps}
      resourseTitle={translate("resources.teacher")}
      title="تعديل بيانت الأستاذ"
      onCancel={() => onClose()}
      id={id}
      onSubmit={() => form.submit()}
      onClose={() => onClose()}
      onDeleteSuccessMessage="تم حذف الأستاذ بنجاح"
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
    </CustomEditModal>
  );
};

export default EditModal;
