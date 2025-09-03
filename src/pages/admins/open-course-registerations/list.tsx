import { useTable, List } from "@refinedev/antd";
import { Table } from "antd";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";

export const OpenCourseRegisterationsList = () => {
  const { tableProps } = useTable({});

  return (
    <List>
      <CustomTable {...tableProps}>
        <Table.Column dataIndex="course_name" title="الاسم" />
        <Table.Column dataIndex="year" title="السنة" />
        <Table.Column dataIndex="semester" title="الفصل" />
        <Table.Column dataIndex="price_in_usd" title="السعر" />
      </CustomTable>
    </List>
  );
};
