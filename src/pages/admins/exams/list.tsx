import { BaseRecord, useCustom } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  BooleanField,
  CreateButton,
  ExportButton,
} from "@refinedev/antd";
import { Table, Space, Row, Col, Card, Form, Select, Button } from "antd";
import { useGetOpenCourseRegisterations } from "../../../hooks/API/select/useGetOpenCourseRegisterations";
import { useEffect, useState } from "react";

export const ExamList = () => {
  const { data, isFetching, refetch } = useCustom({
    url: `admins/exams/schedule`,
    method: "get",
    queryOptions: {
      enabled: false,
    },
  });

  console.log("filename", data?.filename);

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

  // const [file, setFile] = useState(null);

  useEffect(() => {
    if (data?.data instanceof Blob) {
      // setFile(data.data as unknown as any);

      const url = window.URL.createObjectURL(data.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url); // Clean up the object URL
    } else if (data?.data instanceof ArrayBuffer) {
      // setFile(data.data as unknown as any);
    }
  }, [data?.data]);

  console.log("data", data);

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
        {/* in case we use react-pdf {file && (
          <Document file={file}>
            <Page pageNumber={1}></Page>
          </Document>
        )} */}

        <List
          headerButtons={
            <>
              <CreateButton>إنشاء</CreateButton>
              <ExportButton loading={isFetching} onClick={getExamSchedulePdf}>
                تحميل جدول الامتحانات
              </ExportButton>
            </>
          }
        >
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
