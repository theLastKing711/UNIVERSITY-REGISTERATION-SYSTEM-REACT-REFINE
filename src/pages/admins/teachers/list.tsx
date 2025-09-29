import { useTable, List, useModal } from "@refinedev/antd";
import { Table } from "antd";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";
import {
  useNotification,
  useSubscription,
  useTranslation,
} from "@refinedev/core";
import { useState } from "react";
import EditModal from "./components/EditModal";
import CreateModal from "./components/CreateModal";

export const TeacherList = () => {
  const [editModalId, setEditModalId] = useState<number | null>(null);

  const {
    close: closeCreateModal,
    show: openCreateModal,
    modalProps: { open: isCreateModalOpen },
  } = useModal();

  const { translate } = useTranslation();

  const { tableProps } = useTable();

  const { open } = useNotification();

  useSubscription({
    channel: "teachers",
    types: [".created"],
    onLiveEvent: (event) => {
      console.log("event", event);
      open?.({
        type: "success",
        message: event.payload["message"],
      });
    },
  });

  return (
    <>
      <List createButtonProps={{ onClick: openCreateModal }}>
        <CustomTable
          {...tableProps}
          deleteSuccessNotification={(data, values, resource) => {
            return {
              message: translate("notifications.deleteSuccess", {
                resource: translate("resources.teacher"),
              }),
              description: translate("notifications.success"),
              type: "success",
            };
          }}
          deleteErrorNotification={(data, values, resource) => {
            return {
              message: translate("notifications.deleteError", {
                resource: translate("resources.teacher"),
              }),
              description: translate("notifications.error"),
              type: "error",
            };
          }}
          onButtonEdit={(id) => setEditModalId(id)}
        >
          <Table.Column dataIndex="id" title="المعرف" />
          <Table.Column dataIndex="name" title="الاسم" />
          <Table.Column dataIndex="department_name" title="القسم" />
        </CustomTable>
      </List>
      {editModalId && (
        <EditModal onClose={() => setEditModalId(null)} id={editModalId} />
      )}
      {isCreateModalOpen && <CreateModal onClose={closeCreateModal} />}
    </>
  );
};
