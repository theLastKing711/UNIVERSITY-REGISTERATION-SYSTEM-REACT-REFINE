import {
  DeleteButton,
  DeleteButtonProps,
  EditButton,
  ShowButton,
} from "@refinedev/antd";
import { BaseRecord } from "@refinedev/core";
import { Space, Table, TableProps } from "antd";
import React from "react";

export type CustomTableProps<T> = TableProps<T> & {
  children: React.ReactNode;
  actions?: React.ReactNode;
  deleteSuccessNotification?: DeleteButtonProps["successNotification"];
  deleteErrorNotification?: DeleteButtonProps["errorNotification"];
};

const CustomTable = <T,>({
  children,
  // actions,
  ...tableProps
}: CustomTableProps<T>) => {
  return (
    <Table {...tableProps} rowKey="id">
      {children}
      <Table.Column
        title="Actions"
        dataIndex="actions"
        render={(_, record: BaseRecord) => (
          <Space>
            <EditButton hideText size="small" recordItemId={record.id} />
            <ShowButton hideText size="small" recordItemId={record.id} />
            <DeleteButton
              hideText
              size="small"
              recordItemId={record.id}
              successNotification={tableProps.deleteSuccessNotification}
              errorNotification
            />
          </Space>
        )}
      />
    </Table>
  );
};

export default CustomTable;
