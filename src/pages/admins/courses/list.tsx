import { useTable, List, BooleanField } from "@refinedev/antd";
import { Table } from "antd";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";

export const CourseList = () => {
  const { tableProps } = useTable();

  return (
    <List>
      <CustomTable {...tableProps}>
        <Table.Column dataIndex="id" title="المعرف" />

        <Table.Column dataIndex="name" title="الاسم" />
        <Table.Column dataIndex="code" title="الكود" />
        <Table.Column
          dataIndex={["is_active"]}
          title="نشطة"
          render={(value: any) => <BooleanField value={value} />}
        />
        <Table.Column dataIndex="credits" title="النقاط" />
        <Table.Column
          dataIndex="open_for_students_in_year"
          title="تفتح في السنة الدراسية"
        />
      </CustomTable>
    </List>
  );
};
