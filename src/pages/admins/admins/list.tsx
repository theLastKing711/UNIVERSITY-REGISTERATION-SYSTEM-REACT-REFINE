import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
} from "@refinedev/antd";
import { type BaseRecord, useDelete } from "@refinedev/core";
import { Space, Table } from "antd";
import { GetAdminsResponseData } from "../../../types/admins/admins";
import { useGetGlobalQueryFilters } from "../../../hooks/useGetGlobalQueryFilters";

export const AdminList = () => {
  // const { filters } = useGetGlobalQueryFilters();

  // console.log("filters 2", filters);
  //
  const { tableProps } = useTable<GetAdminsResponseData>({
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

  const { mutate: remove } = useDelete();

  const removeItem = (record: any) => {
    console.log("record", record);
    remove({
      resource: "admin",
      id: record.id,
      successNotification: (data, values, resourses) => ({
        message: "حذف مستخدم",
        description: "تم حذف السمتخدم بنجاح",
        type: "success",
      }),
    });
  };

  return (
    <List
      headerProps={{
        onBack: () => console.log("clicked"),
        subTitle: "Subtitle",
      }}
    >
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="المعرف" />
        <Table.Column dataIndex="name" title="اسم الستخدم" />
        <Table.Column
          title={"Actions"}
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
