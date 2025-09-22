import { List, useModal, useTable } from "@refinedev/antd";
import { useDelete, useLogList } from "@refinedev/core";
import { Button, Modal, Table } from "antd";
import { GetAdminsResponseData } from "../../../types/admins/admins";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";
import { PlusCircleFilled } from "@ant-design/icons";
import ShowDetailsModal from "./Component/ShowDetailsModal";
import { useState } from "react";

export const AuditLogList = () => {
  const [auditLogModalId, setAuditLogModalId] = useState<number | null>(null);

  //   const { data } = useLogList({
  //     resource: "*",

  // queryOptions: {
  //   select: (data) => {
  //     return {
  //       ...data,
  //       data: {
  //         ...data.data,
  //         // happens_at: dayjs(data.data.happens_at),

  //       },

  //     };
  //   },
  // },
  //   });

  const { tableProps } = useTable({
    syncWithLocation: false,
    // filters: {
    //   initial: [
    //     {
    //       field: "department_id",
    //       operator: "eq",
    //       value: 2,
    //     },
    //   ],
    //   permanent: [
    //     {
    //       field: "department_id",
    //       operator: "eq",
    //       value: 2,
    //     },
    //   ],
    //   defaultBehavior: "replace",
    //   // defaultBehavior: "replace",
    // },
    // filters: {
    //   initial: filters,
    // },
  });

  const { show, close, modalProps } = useModal();

  console.log("table props", tableProps);

  return (
    <List
      headerProps={{
        onBack: () => console.log("clicked"),
        subTitle: "Subtitle",
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="#" key="id" />
        <Table.Column dataIndex="resource" title="الكيان" key="resource" />
        <Table.Column dataIndex="action" title="الحدث" key="action" />
        <Table.Column
          dataIndex="details"
          title="التفاصيل"
          key="details"
          render={(_, record) => (
            <div>
              <Button
                icon={<PlusCircleFilled />}
                onClick={() => {
                  setAuditLogModalId(record.id);
                }}
              />
            </div>
          )}
        />
      </Table>
      {auditLogModalId && (
        <ShowDetailsModal
          id={auditLogModalId}
          onClose={() => setAuditLogModalId(null)}
        />
      )}
    </List>
  );
};
