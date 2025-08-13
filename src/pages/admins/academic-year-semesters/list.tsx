import React from "react";
import { BaseRecord } from "@refinedev/core";
import {
  useTable,
  List,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import { GetAcademicYearsSemestersResponseData } from "../../../types/admins/academic-year-semesters";

export const AcademicYearSemesterList = () => {
  const { tableProps } = useTable<GetAcademicYearsSemestersResponseData>({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="year" title="السنة" />
        <Table.Column dataIndex="semester" title="الفصل" />
        <Table.Column
          dataIndex="semester"
          title="الأقسام المفتوحة"
          render={(_, record: GetAcademicYearsSemestersResponseData) =>
            record.departments.map((item) => item.name).join(",")
          }
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
