import { BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  BooleanField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ExamList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="course_name" title="المادة" />
        <Table.Column dataIndex="teacher_name" title="المدرس" />
        <Table.Column dataIndex="max_mark" title="العلامة النهائية" />
        <Table.Column dataIndex="classroom_name" title="القاعة" />
        <Table.Column dataIndex="date" title="تاريخ الامتحان" />
        <Table.Column dataIndex="from" title="من" />
        <Table.Column dataIndex="to" title="إلى" />
        <Table.Column
          dataIndex={["is_main_exam"]}
          title="امتحان نهائي"
          render={(value: any) => <BooleanField value={value} />}
        />
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
