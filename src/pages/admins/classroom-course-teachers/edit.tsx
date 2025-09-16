import { Edit, useForm } from "@refinedev/antd";
import { Form, Select, TimePicker } from "antd";
import { useGetTeachers } from "../../../hooks/API/select/useGetTeachers";
import { DAYS } from "../../../constants";
import { useGetClassroomList } from "../../../hooks/API/select/useGetClassroomList";
import {
  getDayJsValueFromTime,
  getTimeStringFromDayJs,
} from "../../../helpers";
import { BaseRecord, HttpError } from "@refinedev/core";
import { useGetOpenCourseRegisterations } from "../../../hooks/API/select/useGetOpenCourseRegisterations";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";

export const ClassroomCourseTeacherEdit = () => {
  const { formProps, saveButtonProps, onFinish, form } = useForm<
    BaseRecord,
    HttpError
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
          <CustomSearchSelect
            placeholder="اختر مادة"
            {...openCourseRegisterationssSelectProps}
            onChange={(option) => {
              // form.resetFields() set it to inital value which is the value of get inital request
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
          <CustomSearchSelect
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
          <CustomSearchSelect
            placeholder="اختر قاعة"
            {...classroomsSelectProps}
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
          <CustomSearchSelect options={DAYS} />
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
