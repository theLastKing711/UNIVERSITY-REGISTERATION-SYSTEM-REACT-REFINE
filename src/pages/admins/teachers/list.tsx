import { useTable, List } from "@refinedev/antd";
import { Table } from "antd";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";
import {
  useNotification,
  useSubscription,
  useTranslation,
} from "@refinedev/core";

export const TeacherList = () => {
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
    <List>
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
      >
        <Table.Column dataIndex="id" title="المعرف" />
        <Table.Column dataIndex="name" title="الاسم" />
        <Table.Column dataIndex="department_name" title="القسم" />
      </CustomTable>
    </List>
  );
};
