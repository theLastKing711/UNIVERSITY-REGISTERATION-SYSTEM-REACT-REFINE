import { Edit, useForm } from "@refinedev/antd";
import { DatePicker, Form, Select, Switch } from "antd";
import { useGetTeachers } from "../../../hooks/API/select/useGetTeachers";
import { BaseRecord, HttpError } from "@refinedev/core";
import { useGetOpenCourseRegisterations } from "../../../hooks/API/select/useGetOpenCourseRegisterations";
import FormSection from "../../../components/ui/From/FormSection";
import FormItemsContainer from "../../../components/ui/From/FormItemsContainer";
import { useGetStudents } from "../../../hooks/API/select/useGetStudents";
import { CreateLectureRequestData } from "../../../types/admins/lectures";
import { getDayJsValue } from "../../../helpers";

export const LectureEdit = () => {
  const { formProps, saveButtonProps, form } = useForm<
    BaseRecord,
    HttpError,
    CreateLectureRequestData
  >({});

  const selectedCourse = form.getFieldValue("course_id");

  const { openCourseRegisterationssSelectProps } =
    useGetOpenCourseRegisterations();

  const { teachersSelectProps } = useGetTeachers(selectedCourse);

  const { studentsSelectProps } = useGetStudents(selectedCourse);

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
            disabled={!selectedCourse}
            placeholder="اختر أستاذ"
            {...teachersSelectProps}
          />
        </Form.Item>

        <Form.Item
          label="تاريخ المحاضرة"
          name="happened_at"
          rules={[
            {
              required: true,
              message: "تاريخ المحاضرة مطلوب",
            },
          ]}
          getValueProps={getDayJsValue}
        >
          <DatePicker />
        </Form.Item>

        <FormSection title="بيانات الحضور">
          <Form.List
            name="course_attendance"
            initialValue={studentsSelectProps.options?.map((item) => ({
              student_id: item.id,
              is_student_present: false,
            }))}
          >
            {(fields) => (
              <>
                {fields.map((field) => (
                  <FormItemsContainer key={field.key}>
                    <Form.Item
                      {...field}
                      name={[field.name, "student_id"]}
                      label="الاسم"
                      rules={[{ required: true, message: "القسم مطلوب" }]}
                    >
                      <Select
                        disabled
                        style={{ width: 200 }}
                        placeholder="اختر طالب"
                        {...studentsSelectProps}
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="الطالب متواجد"
                      name={[field.name, "is_student_present"]}
                      initialValue={false}
                    >
                      <Switch />
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
