import { List, useTable } from "@refinedev/antd";
import { useDelete } from "@refinedev/core";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";
import { Table } from "antd";

export const MeetingList = () => {
  const { tableProps } = useTable({
    syncWithLocation: false,
  });

  const { mutate: remove } = useDelete();

  const removeItem = (record: any) => {
    console.log("record", record);
    remove({
      resource: "admin",
      id: record.id,
      successNotification: (data, values, resourses) => ({
        message: "حذف اجتماع",
        description: "تم حذف السمتخدم بنجاح",
        type: "success",
      }),
    });
  };

  return (
    <List>
      <CustomTable {...tableProps}>
        <Table.Column dataIndex="id" title="المعرف" />
        <Table.Column dataIndex="name" title="اسم الستخدم" />
      </CustomTable>
    </List>
  );
};
