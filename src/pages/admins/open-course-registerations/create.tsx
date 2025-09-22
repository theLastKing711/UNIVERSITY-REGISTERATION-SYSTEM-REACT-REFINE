import { Create, useForm } from "@refinedev/antd";
import { Button, Form, Input, Switch } from "antd";
import { useGetAcademicYearSemesters } from "../../../hooks/API/select/useGetAcademicYearSemesters";
import { useGetCourses } from "../../../hooks/API/select/useGetCourses";
import { useGetTeachers } from "../../../hooks/API/select/useGetTeachers";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import FormItemsContainer from "../../../components/ui/From/FormItemsContainer";
import FormSection from "../../../components/ui/From/FormSection";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";

export const OpenCourseRegisterationsCreate = () => {
  const { formProps, saveButtonProps, query } = useForm();

  const { academicYearSemestersSelectProps } = useGetAcademicYearSemesters();

  const { coursesSelectProps } = useGetCourses();

  const { teachersSelectProps } = useGetTeachers();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="السنة والفصل الدراسي"
          name="academic_year_semester_id"
          rules={[
            {
              required: true,
              message: "السنة والفصل الدراسي مطلوبين",
            },
          ]}
        >
          <CustomSearchSelect {...academicYearSemestersSelectProps} />
        </Form.Item>

        <Form.Item
          label="المادة"
          name="course_id"
          rules={[
            {
              required: true,
              message: "المادة مطلوبة",
            },
          ]}
        >
          <CustomSearchSelect {...coursesSelectProps} />
        </Form.Item>

        <Form.Item label="السعر بالدولار" name={["price_in_usd"]}>
          <Input />
        </Form.Item>

        <FormSection title="المدرسين">
          <Form.List name="teachers" initialValue={[]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <FormItemsContainer key={field.key}>
                    <Form.Item
                      {...field}
                      name={[field.name, "id"]}
                      label="الاسم"
                      rules={[{ required: true, message: "الأستاذ مطلوب" }]}
                      initialValue={false}
                    >
                      <CustomSearchSelect
                        style={{ width: 200 }}
                        placeholder="اختر أستاذ"
                        {...teachersSelectProps}
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="أستاذالمادة الرئيسي"
                      name={[field.name, "is_main_teacher"]}
                      initialValue={false}
                    >
                      <Switch />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </FormItemsContainer>
                ))}

                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    أضف أستاذ
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </FormSection>
      </Form>
    </Create>
  );
};
