import { useTable, List } from "@refinedev/antd";
import { Table } from "antd";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";

export const TeacherList = () => {
  const { tableProps } = useTable();

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
