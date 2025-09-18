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
            happens_at: dayjs(data.data.happens_at),
            attendances: data.data.attendances.map(
              (attendance) => attendance.id
            ),
          },
        };
      },
    },
  });

  // console.log("form", form.getFieldValue("attendances"));

  const handleOnFinish = (values) => {
    onFinish({
      ...values,
      attendances: values.attendances.map<UpdateAttendanceData>((item) => ({
        id: item,
      })),
    })
      .then(() => close())
      .catch((err) => {
        console.log("errs", err);
      });
  };

  return (
    <Modal
      {...modalProps}
      title="تعديل بيانت الاجتماع"
      // onOk={() => form.submit()}
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
    </Modal>
  );
};

export default EditModal;
