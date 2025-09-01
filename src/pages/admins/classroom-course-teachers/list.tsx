import { BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { getDayOfWeek } from "../../../constants";

export const ClassroomCourseTeacherList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
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
        <Table.Column
          title="Actions"
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
