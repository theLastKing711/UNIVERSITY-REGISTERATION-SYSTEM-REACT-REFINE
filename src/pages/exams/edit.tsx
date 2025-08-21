import { Edit, useForm } from "@refinedev/antd";
import { DatePicker, Form, Input, Select, Switch, TimePicker } from "antd";
import { useGetTeachers } from "../../hooks/API/select/useGetTeachers";
import { useGetClassroomList } from "../../hooks/API/select/useGetClassroomList";
import {
  getDayJsValue,
  getDayJsValueFromTime,
  getTimeStringFromDayJs,
} from "../../helpers";
import { BaseRecord, HttpError } from "@refinedev/core";
import { GetExamRequestData } from "../../types/admins/exams";
import dayjs, { Dayjs } from "dayjs";
import { useGetOpenCourseRegisterations } from "../../hooks/API/select/useGetOpenCourseRegisterations";

export const ExamEdit = () => {
  const { formProps, saveButtonProps, onFinish, form } = useForm<
    BaseRecord,
    HttpError,
    GetExamRequestData
  >({});

  const { openCourseRegisterationssSelectProps } =
    useGetOpenCourseRegisterations();

  const { teachersSelectProps } = useGetTeachers(
    form.getFieldValue("course_id")
  );

  const { classroomsSelectProps } = useGetClassroomList();

  const handleOnFinish = (values) => {
    onFinish({
      ...values,
      from: getTimeStringFromDayJs(values.from),
      to: getTimeStringFromDayJs(values.to),
    }).catch((err) => {
      console.log("errs", err);
    });
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="المادة"
          name="course_id"
          rules={[
            {
              required: true,
              message: "اسم المادة مطلوب",
            },
          ]}
        >
          <Select
            placeholder="اختر مادة"
            {...openCourseRegisterationssSelectProps}
            onChange={(option) => {
              form.setFieldValue("teacher_id", undefined);
            }}
          />
        </Form.Item>

        <Form.Item
          label="الأستاذ"
          name="teacher_id"
          rules={[
            {
              required: true,
              message: "اسم الأستاذ مطلوب",
            },
          ]}
        >
          <Select
            disabled={!form.getFieldValue("course_id")}
            placeholder="اختر أستاذ"
            {...teachersSelectProps}
          />
        </Form.Item>

        <Form.Item
          label="القاعة"
          name="classroom_id"
          rules={[
            {
              required: true,
              message: "القاعة مطلوبة",
            },
          ]}
        >
          <Select placeholder="اختر قاعة" {...classroomsSelectProps} />
        </Form.Item>

        <Form.Item
          label="امتحان نهائي"
          name="is_main_exam"
          initialValue={false}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="العلامة النهائية"
          name="max_mark"
          rules={[
            {
              required: true,
              message: "العلامة النهائية مطلوبة",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="اليوم"
          name={["date"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={getDayJsValue}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          label="من"
          name={["from"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={getDayJsValueFromTime}
        >
          <TimePicker />
        </Form.Item>

        <Form.Item
          label="إلى"
          name={["to"]}
          rules={[
            {
              required: true,
            },
          ]}
          getValueProps={getDayJsValueFromTime}
        >
          <TimePicker />
        </Form.Item>
      </Form>
    </Edit>
  );
};
