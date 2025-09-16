import { Edit, useForm } from "@refinedev/antd";
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  TimePicker,
} from "antd";
import { useGetTeachers } from "../../../hooks/API/select/useGetTeachers";
import { useGetClassroomList } from "../../../hooks/API/select/useGetClassroomList";
import {
  getDayJsValue,
  getDayJsValueFromTime,
  getTimeStringFromDayJs,
} from "../../../helpers";
import { BaseRecord, HttpError } from "@refinedev/core";
import { GetExamRequestData } from "../../../types/admins/exams";
import { useGetOpenCourseRegisterations } from "../../../hooks/API/select/useGetOpenCourseRegisterations";
import FormSection from "../../../components/ui/From/FormSection";
import { useGetStudents } from "../../../hooks/API/select/useGetStudents";
import FormItemsContainer from "../../../components/ui/From/FormItemsContainer";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";

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

  // const { studentsSelectProps } = useGetStudents(selectedCourse);

  const { classroomsSelectProps } = useGetClassroomList();

  const selectedCourse = form.getFieldValue("course_id");

  const { studentsSelectProps } = useGetStudents(selectedCourse);

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
            {
              type: "number",
              min: 0,
              max: 60,
              message: "العلامة يجب أن تكون بين 0 و 60",
            },
          ]}
        >
          <InputNumber />
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

        <FormSection title="علامات الطلاب">
          <Form.List
            name="exam_students"
            // initialValue={studentsSelectProps.options?.map((item) => ({
            //   student_id: item.id,
            //   is_student_present: false,
            // }))}
          >
            {(fields) => (
              <>
                {fields.map((field) => (
                  <FormItemsContainer key={field.key}>
                    <Form.Item
                      {...field}
                      key={0}
                      name={[field.key, "student_id"]}
                      label="الاسم"
                      rules={[{ required: true, message: "القسم مطلوب" }]}
                    >
                      <CustomSearchSelect
                        disabled
                        style={{ width: 200 }}
                        placeholder="اختر طالب"
                        {...studentsSelectProps}
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      key={1}
                      name={[field.key, "mark"]}
                      label="العلامة النهائية"
                      rules={[
                        { required: true, message: "العلامة النهائية مطلوبة" },
                        {
                          type: "number",
                          min: 0,
                          max: 60,
                          message: "العلامة يجب أن تكون بين 0 و 60",
                        },
                      ]}
                    >
                      <InputNumber
                        style={{ width: 200 }}
                        placeholder="حدد العلامة النهائية"
                        {...studentsSelectProps}
                      />
                    </Form.Item>
                  </FormItemsContainer>
                ))}
              </>
            )}
          </Form.List>
        </FormSection>
      </Form>
    </Edit>
  );
};
