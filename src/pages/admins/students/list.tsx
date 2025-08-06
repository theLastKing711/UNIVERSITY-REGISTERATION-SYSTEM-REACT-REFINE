import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useDelete } from "@refinedev/core";
import { Space, Table } from "antd";
import { GetStudentsResponseData } from "../../../types/admins/students";
import { PER_PAGE } from "../../../constants";

export const StudentsList = () => {
  const { tableProps } = useTable<GetStudentsResponseData>({
    syncWithLocation: true,
    pagination: {
      pageSize: PER_PAGE,
    },
  });

  console.log(tableProps);

  const { mutate: remove } = useDelete();

  const removeItem = (record: any) => {
    console.log("record", record);
    remove({
      resource: "admin",
      id: record.id,
      successNotification: (data, values, resourses) => ({
        message: "حذف مستخدم",
        description: "تم حذف السمتخدم بنجاح",
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
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="المعرف" />
        <Table.Column dataIndex="national_id" title="رقم الهوية" />
        <Table.Column dataIndex="name" title="الاسم" />
        <Table.Column dataIndex="birthdate" title="تاريخ الميلاد" />
        <Table.Column dataIndex="enrollment_date" title="تاريخ التسجيل" />
        <Table.Column dataIndex="phone_number" title="رقم الهاتف" />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
