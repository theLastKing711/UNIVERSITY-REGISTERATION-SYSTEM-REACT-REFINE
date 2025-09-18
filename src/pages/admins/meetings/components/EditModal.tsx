import { DatePicker, Form, Select } from "antd";
import React from "react";
import { useGetAdminList } from "../../../../hooks/API/select/useGetAdminList";

import { useModalForm } from "@refinedev/antd";
import { UpdateAttendanceData } from "../../../../types/admins/meetings";
import { getDayJsValue } from "../../../../helpers";
import CustomModal from "../../../../components/ui/AntDesgin/CustomModal";
import CustomEditModal from "../../../../components/ui/AntDesgin/CustomEditModal";

export type EditModalProps = {
  id: number;
  onClose: () => void;
};

const EditModal = ({ id, onClose }: EditModalProps) => {
  const { adminsSelectProps } = useGetAdminList();

  const { form, formProps, onFinish, modalProps, formLoading } = useModalForm({
    action: "edit",
    id,
    queryOptions: {
      select: (data) => {
        return {
          ...data,
          data: {
            ...data.data,
            attendances: data.data.attendances.map(
              (attendance) => attendance.id
            ),
          },
        };
      },
    },
    onMutationSuccess(data, variables, context, isAutoSave) {
      onClose();
    },
    successNotification: (data, values, resourses) => ({
      message: "تعديل الاجتماع",
      description: "تم تعديل الاجتماع بنجاح",
      type: "success",
    }),
  });

  const handleOnFinish = (values) => {
    onFinish({
      ...values,
      attendances: values.attendances.map<UpdateAttendanceData>((item) => ({
        id: item,
      })),
    });
  };

  return (
    <CustomEditModal
      {...modalProps}
      resourseTitle="الاجتماح"
      title="تعديل بيانت الاجتماع"
      onCancel={() => onClose()}
      id={id}
      onSubmit={() => form.submit()}
      onClose={() => onClose()}
      onDeleteSuccessMessage="تم حذف الاجتماع بنجاح"
      submitLoading={formLoading}
    >
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="وقت الاجتماع"
          name="happens_at"
          rules={[
            {
              required: true,
              message: "وقت الاجتماع مطلوب",
            },
          ]}
          getValueProps={getDayJsValue}
        >
          <DatePicker showTime />
        </Form.Item>

        <Form.Item
          label="الحضور"
          name="attendances"
          rules={[
            {
              required: true,
              message: "يرجى إضافة حضور",
            },
          ]}
        >
          <Select {...adminsSelectProps} mode="multiple" />
        </Form.Item>
      </Form>
    </CustomEditModal>
  );
};

export default EditModal;
