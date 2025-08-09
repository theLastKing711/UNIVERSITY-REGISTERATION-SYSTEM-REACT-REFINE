import {
  DeleteButton,
  EditButton,
  getValueFromEvent,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import {
  type BaseRecord,
  HttpError,
  useDelete,
  useSelect,
} from "@refinedev/core";
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
import TableSearch from "../../../components/ui/TableSearch";
import { SearchOutlined } from "@ant-design/icons";
import { GetDepartmentsResponseData } from "../../../types/admins/departments";
import { useGetDepratments } from "../../../hooks/API/select/useGetDepartments";
import { getDayJsdateFormat, getDayJsValue } from "../../../helpers";
import dayjs from "dayjs";

export const StudentsList = () => {
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
    <List
      headerProps={{
        onBack: () => console.log("clicked"),
        subTitle: "Subtitle",
      }}
    >
      <Row gutter={[16, 16]}>
        <Col lg={6} xs={24}>
          {/* <Form layout="vertical" {...searchFormProps}>
            <Form.Item label="ابحث" name="query">
              <Input
                placeholder="ID, Title, Content, etc."
                prefix={<SearchOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                فلتر
              </Button>
            </Form.Item>
          </Form> */}
          <Card title="الفلاتر">
            <Form {...searchFormProps}>
              <Space>
                <Form.Item name="query">
                  <Input placeholder="اسم أو رقم أو رقم وطني لتلميذ" />
                </Form.Item>
              </Space>
              <Space>
                <Form.Item label="القسم" name="department_id">
                  <Select placeholder="اختر القسم" {...departmentSelectProps} />
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
            <Table {...tableProps} rowKey="id">
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
              <Table.Column
                title={"Actions"}
                dataIndex="actions"
                render={(_, record: BaseRecord) => (
                  <Space>
                    <EditButton
                      hideText
                      size="small"
                      recordItemId={record.id}
                    />
                    <ShowButton
                      hideText
                      size="small"
                      recordItemId={record.id}
                    />
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
    </List>
  );
};
