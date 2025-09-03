import { List, useTable } from "@refinedev/antd";
import { useDelete } from "@refinedev/core";
import { Table } from "antd";
import { GetAdminsResponseData } from "../../../types/admins/admins";
import CustomTable from "../../../components/ui/AntDesgin/CustomTable";

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
      <CustomTable {...tableProps}>
        <Table.Column dataIndex="id" title="المعرف" />
        <Table.Column dataIndex="name" title="اسم الستخدم" />
      </CustomTable>
    </List>
  );
};
