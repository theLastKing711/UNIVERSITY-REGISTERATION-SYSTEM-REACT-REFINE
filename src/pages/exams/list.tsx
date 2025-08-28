import { BaseRecord, useCustom, useList } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  BooleanField,
} from "@refinedev/antd";
import { Table, Space, Row, Col, Card, Form, Select, Button } from "antd";
import { useGetOpenCourseRegisterations } from "../../hooks/API/select/useGetOpenCourseRegisterations";
import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";

export const ExamList = () => {
  const { data, isLoading, refetch } = useCustom({
    url: `admins/exams/schedule`,
    method: "get",
    queryOptions: {
      enabled: false,
    },
  });

  const { tableProps, searchFormProps } = useTable({
    syncWithLocation: true,
    onSearch: (values) => {
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

  console.log(
    "openCourseRegisterationssSelectProps",
    openCourseRegisterationssSelectProps.options
  );

  const getExamSchedulePdf = () => {
    refetch();
  };

  const [file, setFile] = useState(null);

  useEffect(() => {
    console.log("type", data?.data);
    if (data?.data instanceof Blob) {
      setFile(data.data as unknown as any);
    } else if (data?.data instanceof ArrayBuffer) {
      setFile(data.data as unknown as any);
    }
  }, [data?.data]);

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
        <Button onClick={getExamSchedulePdf}>جدول الامتحانات</Button>
        {file && (
          <Document file={file}>
            <Page pageNumber={1}></Page>
          </Document>
        )}

        {/* 
        <div>
          <iframe src={file ?? ""} width="100%" height="500px" />
        </div> */}

        {/* <object
          data={file ?? ""}
          type="application/pdf"
          width="100%"
          height="100%"
        >
          <p>
            Alternative text - include a link{" "}
            <a href="http://africau.edu/images/default/sample.pdf">
              to the PDF!
            </a>
          </p>
        </object> */}

        <List>
          <Table {...tableProps} rowKey="id">
            <Table.Column dataIndex="id" title="#" />
            <Table.Column dataIndex="course_name" title="المادة" />
            <Table.Column dataIndex="teacher_name" title="المدرس" />
            <Table.Column dataIndex="max_mark" title="العلامة النهائية" />
            <Table.Column dataIndex="classroom_name" title="القاعة" />
            <Table.Column dataIndex="date" title="تاريخ الامتحان" />
            <Table.Column dataIndex="from" title="من" />
            <Table.Column dataIndex="to" title="إلى" />
            <Table.Column
              dataIndex={["is_main_exam"]}
              title="امتحان نهائي"
              render={(value: any) => <BooleanField value={value} />}
            />
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
