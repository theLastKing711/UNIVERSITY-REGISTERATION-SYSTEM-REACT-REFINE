import { BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  BooleanField,
  DateField,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const CourseList = () => {
  const { tableProps } = useTable({
    // syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
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
