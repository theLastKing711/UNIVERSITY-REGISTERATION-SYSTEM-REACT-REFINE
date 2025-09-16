import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Button, Form, Input, Switch } from "antd";
import { GetAcademicYearsSemesterResponseData } from "../../../types/admins/academic-year-semesters";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";
import { Select } from "antd/lib";
import FormSection from "../../../components/ui/From/FormSection";
import FormItemsContainer from "../../../components/ui/From/FormItemsContainer";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";

export const AcademicYearSemesterEdit = () => {
  const { formProps, saveButtonProps, query } =
    useForm<GetAcademicYearsSemesterResponseData>({
      successNotification: (data, values, resourses) => ({
        message: "تعديل الفصل الدراسي",
        description: "تم تعديل بيانات الفصل الدراسي بنجاح.",
        type: "success",
      }),
    });

  const { departmentSelectProps } = useGetDepratments();

  return (
    <Edit
      saveButtonProps={saveButtonProps}
      resource="academic-year-semesters"
      recordItemId={1}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="السنة"
          name="year"
          rules={[
            {
              required: true,
              message: "السنة مطلوبة",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="الفصل"
          name="semester"
          rules={[
            {
              required: true,
              message: "الفصل الدراسي مطلوب",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <FormSection title=" الأقسام المفتوحة للتسجيل:">
          <Form.List name="departments">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <FormItemsContainer key={field.key}>
                    <Form.Item
                      {...field}
                      name={[field.name, "id"]}
                      label="الاسم"
                      rules={[{ required: true, message: "القسم مطلوب" }]}
                    >
                      <CustomSearchSelect
                        style={{ width: 200 }}
                        placeholder="اختر قسم"
                        {...departmentSelectProps}
                      />
                    </Form.Item>

                    <Form.Item
                      {...field}
                      label="التسجيل مفتوح للطلاب ؟"
                      name={[field.name, "is_open_for_students"]}
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
                    أضف قسم
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </FormSection>
      </Form>
    </Edit>
  );
};
