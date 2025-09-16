import React from "react";
import { useTable, List } from "@refinedev/antd";
import { Table, Space, Row, Col, Card, Form, Select, Button } from "antd";
import { useGetOpenCourseRegisterations } from "../../../hooks/API/select/useGetOpenCourseRegisterations";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";
import CustomSearchSelect from "../../../components/ui/AntDesgin/CustomSearchSelect";

export const LectureList = () => {
  const { tableProps, searchFormProps } = useTable({
    syncWithLocation: true,
    onSearch: (values) => {
      console.log("values", values);

      return [
        {
          field: "course_id",
          operator: "contains",
          value: values.course_id,
        },
      ];
    },
  });

  const { openCourseRegisterationssSelectProps } =
    useGetOpenCourseRegisterations();
  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Card title="الفلاتر" style={{ marginTop: "1rem" }}>
          <Form {...searchFormProps}>
            <Space style={{ display: "block" }}>
              <Form.Item label="المادة" name="course_id">
                <CustomSearchSelect
                  allowClear
                  placeholder="اختر مادة"
                  {...openCourseRegisterationssSelectProps}
                  style={{ width: 100 }}
                />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item>
                <Button htmlType="submit">ابحث</Button>
              </Form.Item>
            </Space>
          </Form>
        </Card>
      </Col>
      <Col lg={18} xs={24}>
        <List>
          <CustomTable {...tableProps}>
            <Table.Column dataIndex="id" title="#" />
            <Table.Column dataIndex="course_name" title="المادة" />
            <Table.Column dataIndex="teacher_name" title="الأستاذ" />
            <Table.Column dataIndex="happened_at" title="تاريخ المحاضرة" />
          </CustomTable>
        </List>
      </Col>
    </Row>
  );
};
