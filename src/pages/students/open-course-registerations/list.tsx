import { useTable, List, CreateButton, DeleteButton } from "@refinedev/antd";
import { Button, Card, Col, Form, Input, Row, Space, Table } from "antd";
import {
  BaseKey,
  BaseRecord,
  HttpError,
  useCreate,
  useDelete,
  useInvalidate,
} from "@refinedev/core";
import {
  GetOpenCoursesThisSemesterRequestData,
  GetOpenCoursesThisSemesterResponseData,
  GetStudentRegisteredOpenCoursesThisSemesterResponseData,
} from "../../../types/students/open-course-registerations";
import { STUDENT_OPEN_COURSE_REGISTERATION_URI } from "../../../constants";

export const StudentOpenCourseRegisterationsThisSemesterList = () => {
  const { tableProps, searchFormProps } = useTable<
    GetOpenCoursesThisSemesterResponseData,
    HttpError,
    GetOpenCoursesThisSemesterRequestData
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

  const {
    tableProps: studentRegisteredCoursesTableProps,
    searchFormProps: studentRegisteredCoursesSearchProps,
  } = useTable<
    GetStudentRegisteredOpenCoursesThisSemesterResponseData,
    HttpError,
    GetOpenCoursesThisSemesterRequestData
  >({
    resource: `${STUDENT_OPEN_COURSE_REGISTERATION_URI}/registered-courses/this-semester`,
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

  const { mutate } = useCreate();

  const invalidate = useInvalidate();

  const { mutate: deleteMutate } = useDelete();

  const registerInCourse = (id: BaseKey | undefined) => {
    mutate(
      {
        resource: `${STUDENT_OPEN_COURSE_REGISTERATION_URI}/${id}`,
        values: {},
      },
      {
        onSuccess: (data, variables, context) => {
          invalidate({
            resource: STUDENT_OPEN_COURSE_REGISTERATION_URI,
            invalidates: ["list"],
          });
          invalidate({
            resource: `${STUDENT_OPEN_COURSE_REGISTERATION_URI}/registered-courses/this-semester`,
            invalidates: ["list"],
          });
        },
      }
    );
  };

  const unRegisterInCourse = (id: BaseKey) => {
    deleteMutate(
      {
        resource: `${STUDENT_OPEN_COURSE_REGISTERATION_URI}`,
        id: id,
      },
      {
        onSuccess: (data, variables, context) => {
          invalidate({
            resource: STUDENT_OPEN_COURSE_REGISTERATION_URI,
            invalidates: ["list"],
          });
          invalidate({
            resource: `${STUDENT_OPEN_COURSE_REGISTERATION_URI}/registered-courses/this-semester`,
            invalidates: ["list"],
          });
        },
      }
    );
  };

  return (
    <>
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
              <Table.Column dataIndex="name" title="الاسم" />
              <Table.Column dataIndex="code" title="الكود" />
              <Table.Column dataIndex="credits" title="النقاط" />
              <Table.Column dataIndex="price" title="السعر" />
              <Table.Column
                title="Actions"
                dataIndex="actions"
                render={(_, record: GetOpenCoursesThisSemesterResponseData) => (
                  <Space>
                    {record.is_student_registered_in_open_coruse ? (
                      <DeleteButton
                        confirmCancelText="هل أنت متأكد تريد سحب المادة"
                        // confirmOkText="نعم"
                        onClick={() => unRegisterInCourse(record.id)}
                        size="small"
                      >
                        سحب
                      </DeleteButton>
                    ) : (
                      <CreateButton
                        onClick={() => registerInCourse(record.id)}
                        size="small"
                      >
                        تسجيل
                      </CreateButton>
                    )}
                  </Space>
                )}
              />
            </Table>
          </List>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col lg={6} xs={24}>
          <Card title="الفلاتر" style={{ marginTop: "1rem" }}>
            <Form {...studentRegisteredCoursesSearchProps}>
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
          <List title="موادي">
            <Table {...studentRegisteredCoursesTableProps} rowKey="id">
              <Table.Column dataIndex="id" title="#" />
              <Table.Column
                dataIndex="course"
                title="الاسم"
                render={(
                  course: GetStudentRegisteredOpenCoursesThisSemesterResponseData["course"]
                ) => <span>{course.name}</span>}
              />
              <Table.Column
                dataIndex="course"
                title="الكود"
                render={(
                  course: GetStudentRegisteredOpenCoursesThisSemesterResponseData["course"]
                ) => <span>{course.code}</span>}
              />
              <Table.Column
                dataIndex="course"
                title="النقاط"
                render={(
                  course: GetStudentRegisteredOpenCoursesThisSemesterResponseData["course"]
                ) => <span>{course.credits}</span>}
              />
              <Table.Column dataIndex="price_in_usd" title="السعر" />
              <Table.Column
                title="Actions"
                dataIndex="actions"
                render={(_, record: GetOpenCoursesThisSemesterResponseData) => (
                  <Space>
                    <DeleteButton
                      confirmCancelText="هل أنت متأكد تريد سحب المادة"
                      // confirmOkText="نعم"
                      onClick={() => unRegisterInCourse(record.id)}
                      size="small"
                    >
                      سحب
                    </DeleteButton>
                  </Space>
                )}
              />
            </Table>
          </List>
        </Col>
      </Row>
    </>
  );
};
