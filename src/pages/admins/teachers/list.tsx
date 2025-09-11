import { useTable, List } from "@refinedev/antd";
import { Table } from "antd";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";
import { useSubscription } from "@refinedev/core";

export const TeacherList = () => {
  const { tableProps } = useTable();

  useSubscription({
    channel: "teachers",
    types: [".created"],
    onLiveEvent: (event) => {
      console.log("event consumer", event);
    },
  });

  return (
    <List>
      <CustomTable {...tableProps}>
        <Table.Column dataIndex="id" title="المعرف" />
        <Table.Column dataIndex="name" title="الاسم" />
        <Table.Column dataIndex="department_name" title="القسم" />
      </CustomTable>
    </List>
  );
};
