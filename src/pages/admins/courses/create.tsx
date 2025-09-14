import React from "react";
import { Create, useForm } from "@refinedev/antd";
import {
  Form,
  Input,
  Checkbox,
  DatePicker,
  Switch,
  Select,
  Button,
} from "antd";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";
import FormSection from "../../../components/ui/From/FormSection";
import FormItemsContainer from "../../../components/ui/From/FormItemsContainer";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { useGetCourses } from "../../../hooks/API/select/useGetCourses";

export const CourseCreate = () => {
  const { formProps, saveButtonProps, query } = useForm();

  const { departmentSelectProps } = useGetDepratments();

  const { coursesSelectProps } = useGetCourses();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="القسم" name="department_id">
          <Select
            placeholder=""
            {...departmentSelectProps}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
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
                      <Select
                        style={{ width: 200 }}
                        placeholder="اختر مادة"
                        {...coursesSelectProps}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
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
                      <Select
                        style={{ width: 200 }}
                        placeholder="اختر مادة"
                        {...coursesSelectProps}
                        filterOption={(input, option) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
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
    </Create>
  );
};
