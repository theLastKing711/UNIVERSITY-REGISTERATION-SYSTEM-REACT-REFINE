import { List, useModal, useTable } from "@refinedev/antd";
import { Button, Table, Tag } from "antd";
import { PlusCircleFilled } from "@ant-design/icons";
import ShowDetailsModal from "./Component/ShowDetailsModal";
import { useState } from "react";
import {
  ACTION_COLOR,
  ACTION_EN_TO_AR,
  RESOURCE_EN_TO_AR,
} from "../../../constants";

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
        <Table.Column
          dataIndex="resource"
          title="الكيان"
          key="resource"
          render={(value) => {
            return RESOURCE_EN_TO_AR[value];
          }}
        />
        <Table.Column
          dataIndex="action"
          title="الحدث"
          key="action"
          filters={[
            { text: "إنشاء", value: "create" },
            { text: "تعديل", value: "update" },
            { text: "حذف", value: "delete" },
          ]}
          render={(value) => (
            <Tag color={ACTION_COLOR[value]}>{ACTION_EN_TO_AR[value]}</Tag>
          )}
        />
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
