import { useTable, List } from "@refinedev/antd";
import { Table } from "antd";
import { GetAcademicYearsSemestersResponseData } from "../../../types/admins/academic-year-semesters";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";

export const AcademicYearSemesterList = () => {
  const { tableProps } = useTable<GetAcademicYearsSemestersResponseData>({
    syncWithLocation: true,
  });

  return (
    <List>
      <CustomTable {...tableProps}>
        <Table.Column dataIndex="year" title="السنة" />
        <Table.Column dataIndex="semester" title="الفصل" />
        <Table.Column
          dataIndex="semester"
          title="الأقسام المفتوحة"
          render={(_, record: GetAcademicYearsSemestersResponseData) =>
            record.departments.map((item) => item.name).join(",")
          }
        />
      </CustomTable>
    </List>
  );
};
