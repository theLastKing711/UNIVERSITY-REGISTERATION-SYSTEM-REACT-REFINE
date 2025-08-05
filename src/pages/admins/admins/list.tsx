import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  MarkdownField,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useDelete, useMany } from "@refinedev/core";
import { Space, Table } from "antd";

export const AdminList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
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
        <Table.Column dataIndex="name" title="اسم الستخدم" />
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
