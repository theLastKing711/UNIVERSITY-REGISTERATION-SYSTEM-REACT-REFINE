import { Edit, useForm } from "@refinedev/antd";
import { Form, Select, TimePicker } from "antd";
import { useGetTeachers } from "../../hooks/API/select/useGetTeachers";
import { useGetCourses } from "../../hooks/API/select/useGetCourses";
import { DAYS } from "../../constants";
import { useGetClassroomList } from "../../hooks/API/select/useGetClassroomList";
import { useState } from "react";
import { AssignClassroomToCourseTeacherRequestData } from "../../types/admins/classroom-course-teacher";
import {
  getDayJsValue,
  getDayJsValueFromTime,
  getTimeStringFromDayJs,
} from "../../helpers";
import { BaseRecord, HttpError } from "@refinedev/core";
import dayjs from "dayjs";

export const ClassroomCourseTeacherEdit = () => {
  const { formProps, saveButtonProps, query, onFinish, form } = useForm<
    BaseRecord,
    HttpError,
    AssignClassroomToCourseTeacherRequestData
  >({});

  const [selectedCourse, setSelectedCourse] = useState<number | undefined>();

  const { coursesSelectProps } = useGetCourses();

  const { teachersSelectProps } = useGetTeachers(selectedCourse);

  const { classroomsSelectProps } = useGetClassroomList();

  const handleOnFinish = (values) => {
    console.log("valuess", values.to);

    onFinish({
      ...values,
      from: getTimeStringFromDayJs(dayjs(values.from, "hh:mm:ss")),
      to: getTimeStringFromDayJs(dayjs(values.to, "hh:mm:ss")),
    }).catch((err) => {
      console.log("errs", err);
    });
  };

  console.log("form", form.getFieldValue("teacher_id"));

  console.log("form", formProps);

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
            {...coursesSelectProps}
            onChange={(option) => {
              // form.resetFields() set it to inital value which is the value of get inital request
              form.setFieldValue("teacher_id", undefined);

              setSelectedCourse(option);
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
          label="اليوم"
          name={["day"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select options={DAYS} />
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
