import { Create, useForm } from "@refinedev/antd";
import { Form, Select, TimePicker } from "antd";
import { useGetTeachers } from "../../../hooks/API/select/useGetTeachers";
import { DAYS } from "../../../constants";
import { useGetClassroomList } from "../../../hooks/API/select/useGetClassroomList";
import { useState } from "react";
import { getTimeStringFromDayJs } from "../../../helpers";
import { BaseRecord, HttpError } from "@refinedev/core";
import { useGetOpenCourseRegisterations } from "../../../hooks/API/select/useGetOpenCourseRegisterations";
import { CreateClassroomToCourseTeacherRequestData } from "../../../types/admins/classroom-course-teacher";

export const ClassroomCourseTeacherCreate = () => {
  const { formProps, saveButtonProps, onFinish, form } = useForm<
    BaseRecord,
    HttpError,
    CreateClassroomToCourseTeacherRequestData
  >({});

  const [selectedCourse, setSelectedCourse] = useState<number | undefined>();

  const { openCourseRegisterationssSelectProps } =
    useGetOpenCourseRegisterations();

  const { teachersSelectProps } = useGetTeachers(selectedCourse);

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
    <Create saveButtonProps={saveButtonProps}>
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
              form.resetFields(["teacher_id"]);

              setSelectedCourse(option);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
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
            disabled={!selectedCourse}
            placeholder="اختر أستاذ"
            {...teachersSelectProps}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
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
          <Select
            placeholder="اختر قاعة"
            {...classroomsSelectProps}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
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
          <Select
            options={DAYS}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="من"
          name={["from"]}
          rules={[
            {
              required: true,
            },
          ]}
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
        >
          <TimePicker />
        </Form.Item>
      </Form>
    </Create>
  );
};
