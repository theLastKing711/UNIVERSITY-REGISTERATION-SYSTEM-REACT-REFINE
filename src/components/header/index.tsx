import {
  useSelect,
  type RefineThemedLayoutV2HeaderProps,
} from "@refinedev/antd";
import {
  Layout as AntdLayout,
  Avatar,
  Form,
  Select,
  Space,
  Switch,
  theme,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { useGetDepratments } from "../../hooks/API/select/useGetDepartments";
import { GetDepartmentsResponseData } from "../../types/admins/departments";
import { ADMIN_DEPARTMENT_URI } from "../../constants";
import {
  useGetIdentity,
  useGo,
  useInvalidate,
  useParse,
  useParsed,
  useResource,
} from "@refinedev/core";
import { useGetAcademicYearSemesters } from "../../hooks/API/select/useGetAcademicYearSemesters";
import { useGetGlobalQueryFilters } from "../../hooks/useGetGlobalQueryFilters";
import { useLocation } from "react-router";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const { departmentSelectProps } = useGetDepratments();

  const { academicYearSemestersSelectProps } = useGetAcademicYearSemesters();

  const { selectProps: departmentSelectPropss } =
    useSelect<GetDepartmentsResponseData>({
      resource: ADMIN_DEPARTMENT_URI,
      optionValue: "id",
      optionLabel: "name",
    });

  const { resource } = useResource();

  const go = useGo();

  const { department_id_query_parameter } = useGetGlobalQueryFilters();

  console.log("department value", department_id_query_parameter);

  // console.log("filters 4", filters);

  // const [department_id, setDepartment_id] = useState(null);

  // const { params } = useParsed();

  // const department_id =
  //   parseInt(
  //     params?.filters?.find((item) => item.field! === "department_id")?.value
  //   ) || null;

  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <AntdLayout.Header style={headerStyles}>
      <Space>
        {/* <Switch
          checkedChildren="🌛"
          unCheckedChildren="🔆"
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
          defaultChecked={mode === "dark"}
        />
        <Space style={{ marginLeft: "8px" }} size="middle">
          {user?.name && <Text strong>{user.name}</Text>}
          {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
        </Space> */}
        <Select
          {...departmentSelectProps}
          allowClear
          onClear={() => {
            console.log("resourse", resource);
            alert("hello world");

            go({
              to: currentPath,
              query: {
                // filters: [
                //   {
                //     field: "department_id",
                //     operator: "eq",
                //     value: 2,
                //   },
                // ],
              },
              // options: {
              //   keepQuery: true,
              //   keepHash: true,
              // },
            });
          }}
          style={{ width: 300 }}
          value={department_id_query_parameter}
          onChange={(department_id) => {
            // console.log("department_id", department_id);
            localStorage.setItem(
              "department_id_query_parameter",
              department_id as unknown as string
            );
            // invalidate({ resource: "students", invalidates: ["all"] });
            go({
              to: currentPath,
              query: {
                department_id: department_id,
                // filters: [
                //   {
                //     field: "department_id",
                //     operator: "eq",
                //     value: 2,
                //   },
                // ],
              },
              options: {
                keepQuery: true,
                keepHash: true,
              },
            });
          }}
        />
        {/* <Select
          {...academicYearSemestersSelectProps}
          style={{ width: 300 }}
          onChange={(academic_year_semester_id) => {
            // invalidate({ resource: "students", invalidates: ["all"] });
            go({
              to: resource?.name,
              query: {
                // academic_year_semester_id,
                filters: [
                  {
                    field: "academic_year_semester_id",
                    operator: "eq",
                    value: academic_year_semester_id,
                  },
                ],
              },
              options: {
                keepQuery: true,
                keepHash: true,
              },
            });
          }}
        /> */}
      </Space>
    </AntdLayout.Header>
  );
};
