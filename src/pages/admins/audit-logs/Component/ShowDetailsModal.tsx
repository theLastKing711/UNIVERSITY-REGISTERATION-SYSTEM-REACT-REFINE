import { Modal, Table } from "antd";
import React from "react";
import { GetAuditLogResposne } from "../../../../types/admins/audit-logs";
import {
  AUDIT_LOG_URI,
  getAuditLogDetailsTableColumns,
} from "../../../../constants";
import { useOne } from "@refinedev/core";
import { ColumnType } from "antd/es/table";

export type ShowDetailsModalPros = {
  id: number;
  onClose: () => void;
};

const ShowDetailsModal = ({ id, onClose }: ShowDetailsModalPros) => {
  const { data } = useOne<GetAuditLogResposne>({
    resource: AUDIT_LOG_URI,
    id,
  });

  const renderTitle: ColumnType["render"] = (value, record, index) => {
    console.log("value", record);
    console.log("value", value);

    return <td style={{ fontWeight: "bold" }}>{value}</td>;
  };

  const { columns, dataSource } = getAuditLogDetailsTableColumns(
    renderTitle,
    data?.data
  );

  return (
    <Modal open={true} onCancel={onClose} onOk={onClose}>
      <Table
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        size="small"
      />
    </Modal>
  );
};

export default ShowDetailsModal;
