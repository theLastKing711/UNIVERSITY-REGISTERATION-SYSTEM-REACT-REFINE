import { useTable, List } from "@refinedev/antd";
import { Table } from "antd";
import { getDayOfWeek } from "../../../constants";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";

export const ClassroomCourseTeacherList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <CustomTable {...tableProps}>
        <Table.Column dataIndex="id" title="المعرف" />

        <Table.Column dataIndex="course_name" title="المادة" />

        <Table.Column dataIndex="teacher_name" title="الأستاذ" />

        <Table.Column
          dataIndex="day"
          title="اليوم"
          render={(_, record) => getDayOfWeek(record.day)}
        />

        <Table.Column dataIndex="from" title="من" />

        <Table.Column dataIndex="to" title="إلى" />
      </CustomTable>
    </List>
  );
};
