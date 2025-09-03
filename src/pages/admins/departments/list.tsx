import { useTable, List } from "@refinedev/antd";
import { Table } from "antd";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";

export const DepartmentList = () => {
  const { tableProps } = useTable();

  return (
    <List>
      <CustomTable {...tableProps}>
        <Table.Column dataIndex="id" title="المعرف" />
        <Table.Column dataIndex="name" title="الاسم" />
      </CustomTable>
    </List>
  );
};
