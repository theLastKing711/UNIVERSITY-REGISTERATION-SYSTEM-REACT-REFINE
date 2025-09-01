import React from "react";
import { BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space, Row, Col, Card, Form, Select, Button } from "antd";
import { useGetOpenCourseRegisterations } from "../../../hooks/API/select/useGetOpenCourseRegisterations";

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
                <Select
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
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="id" title="#" />
            <Table.Column dataIndex="course_name" title="المادة" />
            <Table.Column dataIndex="teacher_name" title="الأستاذ" />
            <Table.Column dataIndex="happened_at" title="تاريخ المحاضرة" />
            <Table.Column
              title="Actions"
              dataIndex="actions"
              render={(_, record: BaseRecord) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <ShowButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton
                    hideText
                    size="small"
                    recordItemId={record.id}
                  />
                </Space>
              )}
            />
          </Table>
        </List>
      </Col>
    </Row>
  );
};
