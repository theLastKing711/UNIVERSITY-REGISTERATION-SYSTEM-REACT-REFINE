import { List, useTable } from "@refinedev/antd";
import { type BaseRecord, HttpError, useDelete } from "@refinedev/core";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import {
  GetStudentsFilterData,
  GetStudentsResponseData,
} from "../../../types/admins/students";
import { PER_PAGE } from "../../../constants";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";
import { getDayJsdateFormat } from "../../../helpers";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";

export const StudentList = () => {
  const { tableProps, searchFormProps } = useTable<
    GetStudentsResponseData,
    HttpError,
    GetStudentsFilterData
  >({
    syncWithLocation: true,
    pagination: {
      pageSize: PER_PAGE,
    },
    onSearch: (values) => {
      console.log("values", values);

      const enrollment_year = values.enrollment_date?.$y;

      return [
        {
          field: "query",
          operator: "contains",
          value: values.query,
        },
        {
          field: "department_id",
          operator: "contains",
          value: values.department_id,
        },
        {
          field: "enrollment_year",
          operator: "contains",
          value: enrollment_year,
        },
      ];
    },
  });

  const { departmentSelectProps } = useGetDepratments();

  const { mutate: remove } = useDelete();

  const removeItem = (record: any) => {
    console.log("record", record);
    remove({
      resource: "admin",
      id: record.id,
      successNotification: (data, values, resourses) => ({
        message: "حذف تلميذ",
        description: "تم حذف التلميذ بنجاح",
        type: "success",
      }),
    });
  };

  return (
    // <List
    //   headerProps={{
    //     // onBack: () => console.log("clicked"),
    //     subTitle: "Subtitle",
    //   }}
    // >
    <Row gutter={[16, 16]}>
      <Col lg={6} xs={24}>
        <Card title="الفلاتر" style={{ marginTop: "1rem" }}>
          <Form {...searchFormProps}>
            <Space>
              <Form.Item name="query">
                <Input placeholder="اسم أو رقم أو رقم وطني لتلميذ" />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="القسم" name="department_id">
                <Select
                  placeholder="اختر القسم"
                  {...departmentSelectProps}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                />
              </Form.Item>
            </Space>
            <Space>
              <Form.Item label="سنة التسجيل" name="enrollment_date">
                <DatePicker picker="year" />
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
            <Table.Column
              dataIndex="id"
              title="المعرف"
              sorter={{ multiple: 1 }}
            />
            <Table.Column
              dataIndex="department_name"
              title="القسم"
              sorter={{ multiple: 1 }}
            />
            <Table.Column
              dataIndex="national_id"
              title="رقم الهوية"
              sorter={{ multiple: 1 }}
            />
            <Table.Column
              dataIndex="name"
              title="الاسم"
              sorter={{ multiple: 1 }}
            />
            <Table.Column
              dataIndex="birthdate"
              title="تاريخ الميلاد"
              sorter={{ multiple: 1 }}
              render={(_, record: BaseRecord) => (
                <td>{getDayJsdateFormat(record.birthdate)}</td>
              )}
            />
            <Table.Column
              dataIndex="enrollment_date"
              title="تاريخ التسجيل"
              sorter={{ multiple: 1 }}
              render={(_, record: BaseRecord) => (
                <td>{getDayJsdateFormat(record.enrollment_date)}</td>
              )}
            />
            <Table.Column
              dataIndex="phone_number"
              title="رقم الهاتف"
              sorter={{ multiple: 1 }}
            />
          </CustomTable>
        </List>
      </Col>
    </Row>
    // </List>
  );
};
