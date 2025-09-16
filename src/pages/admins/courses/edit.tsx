import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Switch, Button } from "antd";
import FormSection from "../../../components/ui/From/FormSection";
import FormItemsContainer from "../../../components/ui/From/FormItemsContainer";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";
import { useGetCourses } from "../../../hooks/API/select/useGetCourses";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";

export const CourseEdit = () => {
  const { formProps, saveButtonProps, query } = useForm();

  const Data = query?.data?.data;

  const { departmentSelectProps } = useGetDepratments();

  const { coursesSelectProps } = useGetCourses();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="القسم" name="department_id">
          <CustomSearchSelect {...departmentSelectProps} />
        </Form.Item>

        <Form.Item
          label="Name"
          name={["name"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="الكود"
          name={["code"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="فعالة"
          valuePropName="checked"
          name={["is_active"]}
          initialValue={true}
        >
          <Switch />
        </Form.Item>

        <Form.Item
          label="النقاط"
          name={["credits"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="مفتوحة لطلاب سنة"
          name={["open_for_students_in_year"]}
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <FormSection title="المتطلبات">
          <Form.List name="prerequisites" initialValue={[]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <FormItemsContainer key={field.key}>
                    <Form.Item
                      {...field}
                      name={[field.name, "id"]}
                      label="الاسم"
                      rules={[{ required: true, message: "الاسم مطلوب" }]}
                    >
                      <CustomSearchSelect
                        style={{ width: 200 }}
                        placeholder="اختر مادة"
                        {...coursesSelectProps}
                      />
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
                    أضف متطلب
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </FormSection>

        <FormSection title="مواد لها نفس الاسم">
          <Form.List name="cross_listed_courses" initialValue={[]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <FormItemsContainer key={field.key}>
                    <Form.Item
                      {...field}
                      name={[field.name, "id"]}
                      label="الاسم"
                      rules={[{ required: true, message: "الاسم مطلوب" }]}
                    >
                      <CustomSearchSelect
                        style={{ width: 200 }}
                        placeholder="اختر مادة"
                        {...coursesSelectProps}
                      />
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
                    أضف مادة
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
