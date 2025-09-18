import { Edit, useForm } from "@refinedev/antd";
import { AntdInferencer } from "@refinedev/inferencer/antd";
import { DatePicker, Form, Input, Select } from "antd";
import { useGetAdminList } from "../../../hooks/API/select/useGetAdminList";
import dayjs from "dayjs";
import { getDayJsValue } from "../../../helpers";

export const MeetingEdit = () => {
  const { formProps, saveButtonProps, onFinish, form } = useForm({
    queryOptions: {
      select: (data) => {
        return {
          ...data,
          data: {
            ...data.data,
            // happens_at: dayjs(data.data.happens_at),
            attendances: data.data.attendances.map(
              (attendance) => attendance.id
            ),
          },
        };
      },
    },
  });

  const { adminsSelectProps } = useGetAdminList();

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
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="تعديل بيانات مستخدم"
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
    </Edit>
  );
};
