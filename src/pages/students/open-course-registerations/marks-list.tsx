import { useTable, List } from "@refinedev/antd";
import { Button, Card, Col, Form, Input, Row, Space, Table } from "antd";

import {
  GetCoursesMarksRequestData,
  GetCoursesMarksResponseData,
  GetCoursesMarksThisSemesterResponseData,
} from "../../../types/students/open-course-registerations";
import { HttpError } from "@refinedev/core";

export const StudentOpenCourseRegisterationsMarksList = () => {
  const { tableProps, searchFormProps } = useTable<
    GetCoursesMarksResponseData,
    HttpError,
    GetCoursesMarksRequestData
  >({
    syncWithLocation: true,
    onSearch: (values) => {
      return [
        {
          field: "query",
          operator: "contains",
          value: values.query,
        },
      ];
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Card title="الفلاتر" style={{ marginTop: "1rem" }}>
          <Form {...searchFormProps}>
            <Space style={{ display: "block" }}>
              <Form.Item label="الاسم" name="query">
                <Input placeholder="ادخل اسم أو كود مادة" />
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
            <Table.Column
              dataIndex="course"
              title="الاسم"
              render={(
                course: GetCoursesMarksThisSemesterResponseData["course"]
              ) => <span>{course.name}</span>}
            />
            <Table.Column
              dataIndex="course"
              title="الكود"
              render={(
                course: GetCoursesMarksThisSemesterResponseData["course"]
              ) => <span>{course.code}</span>}
            />
            <Table.Column
              dataIndex="course"
              title="النقاط"
              render={(
                course: GetCoursesMarksThisSemesterResponseData["course"]
              ) => <span>{course.credits}</span>}
            />
            <Table.Column dataIndex="final_mark" title="العلامة النهائية" />
            <Table.Column dataIndex="exam_mark" title="العلامة القصوى" />
          </Table>
        </List>
      </Col>
    </Row>
  );
};
