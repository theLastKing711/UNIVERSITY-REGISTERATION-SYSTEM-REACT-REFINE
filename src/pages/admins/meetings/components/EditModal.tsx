import { DatePicker, Form, Modal, Select } from "antd";
import React from "react";
import { useGetAdminList } from "../../../../hooks/API/select/useGetAdminList";

import { useModalForm } from "@refinedev/antd";
import { useModalReturnType } from "@refinedev/core";
import dayjs from "dayjs";
import {
  CreateAttendanceData,
  UpdateAttendanceData,
} from "../../../../types/admins/meetings";
import { getDayJsValue } from "../../../../helpers";

export type EditModalProps = {
  id: number;
  onClose: () => void;
  // close: useModalReturnType["close"];
  // visible: useModalReturnType["visible"];
};

const EditModal = ({ id, onClose }: EditModalProps) => {
  console.log("id", id);

  // const {
  //   formProps,
  //   saveButtonProps,
  //   mutation: mutationResult,
  //   query,
  // } = useForm({
  //   successNotification: (data, values, resourses) => ({
  //     message: "تعديل مستخدم",
  //     description: "تم تعديل المستخدم بنجاح",
  //     type: "success",
  //   }),
  // });

  const { adminsSelectProps } = useGetAdminList();

  const { formProps, close, onFinish, modalProps } = useModalForm({
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

  // console.log("form", form.getFieldValue("attendances"));

  const handleOnFinish = (values) => {
    onFinish({
      ...values,
      attendances: values.attendances.map<UpdateAttendanceData>((item) => ({
        id: item,
      })),
    });
  };

  return (
    <Modal
      {...modalProps}
      title="تعديل بيانت الاجتماع"
      onCancel={() => onClose()}
      open={true}
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
          //   getValueProps={(values) => {
          //     console.log("values", values);
          //     return { value: values?.map((item) => item.id) };
          //   }}
        >
          <Select {...adminsSelectProps} mode="multiple" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditModal;
