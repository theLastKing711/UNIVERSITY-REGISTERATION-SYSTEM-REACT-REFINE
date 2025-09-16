import React from "react";
import { Create, useForm } from "@refinedev/antd";
import { DatePicker, Form, Select } from "antd";
import { useGetAdminList } from "../../../hooks/API/select/useGetAdminList";
import { BaseRecord, HttpError } from "@refinedev/core";
import {
  CreateMeetingRequestData,
  CreateAttendanceData,
} from "../../../types/admins/meetings";

export const MeetingCreate = () => {
  const { formProps, saveButtonProps, query, onFinish } = useForm<
    BaseRecord,
    HttpError,
    CreateMeetingRequestData
  >();

  const { adminsSelectProps } = useGetAdminList();

  const handleOnFinish = (values) => {
    onFinish({
      ...values,
      attendances: values.attendances.map<CreateAttendanceData>((item) => ({
        id: item,
      })),
    }).catch((err) => {
      console.log("errs", err);
    });
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
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
    </Create>
  );
};
