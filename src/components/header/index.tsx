import {
  useSelect,
  type RefineThemedLayoutV2HeaderProps,
} from "@refinedev/antd";
import {
  Layout as AntdLayout,
  Avatar,
  Button,
  Divider,
  Dropdown,
  Flex,
  Form,
  MenuProps,
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
import { ADMIN_DEPARTMENT_URI, NOTIFICATION_URI } from "../../constants";
import {
  useGetIdentity,
  useGo,
  useInfiniteList,
  useInvalidate,
  useNotification,
  useParse,
  useParsed,
  useResource,
  useSubscription,
} from "@refinedev/core";
import { useGetAcademicYearSemesters } from "../../hooks/API/select/useGetAcademicYearSemesters";
import { useGetGlobalQueryFilters } from "../../hooks/useGetGlobalQueryFilters";
import { useLocation } from "react-router";
import { BellFilled, NotificationFilled } from "@ant-design/icons";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item
      </a>
    ),
  },
];

export const Header: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  sticky = true,
}) => {
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  const {
    data,
    isError,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteList({
    resource: NOTIFICATION_URI,
    // pagination: {
    //   pageSize: 20,
    //   current: 1,
    // },
    queryOptions: {
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage", lastPage.data);
        console.log("allPages", allPages);

        return lastPage.cursor;
      },
      initialData: undefined,
    },
    meta: { isCursorPagiantion: true },
  });

  const { token } = useToken();
  const { data: user } = useGetIdentity<IUser>();
  const { mode, setMode } = useContext(ColorModeContext);

  const user_id = localStorage.getItem("user_id");

  const { open } = useNotification();

  useSubscription({
    // channel: `App.Models.User.${user_id}`,
    channel: `App.Models.User.${user_id}`,
    onLiveEvent: (event) => {
      open?.({
        type: "success",
        message: event.payload["message"],
      });
      console.log("event", event);
    },
  });

  const openNotificationDropdown = () => {
    setIsNotificationDropdownOpen(!isNotificationDropdownOpen);
  };

  const closeNotificationDropdown = () => {
    setIsNotificationDropdownOpen(false);
  };

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    // justifyContent: "flex-end",
    alignItems: "center",
    padding: "16px 24px",
    height: "64px",
    justifyContent: "space-between",
  };

  if (sticky) {
    headerStyles.position = "sticky";
    headerStyles.top = 0;
    headerStyles.zIndex = 1;
  }

  const { departmentSelectProps } = useGetDepratments();

  const { academicYearSemestersSelectProps } = useGetAcademicYearSemesters();

  const go = useGo();

  const {
    department_id_query_parameter,
    academic_year_semester_id_query_parameter,
  } = useGetGlobalQueryFilters();

  const { resource } = useParsed();

  const menuStyle: React.CSSProperties = {
    boxShadow: "none",
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };

  return (
    <AntdLayout.Header style={headerStyles}>
      {/* <Space> */}
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
      {/* <Space
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "flex-start",
        }}
      > */}
      {/* <Flex justify="space-between"> */}
      <Space
        style={{
          display: "flex",
          gap: "1rem",
        }}
      >
        <Form.Item label="القسم" style={{ marginBottom: 0 }}>
          <Select
            {...departmentSelectProps}
            placeholder="اختر قسم"
            allowClear
            onClear={() => {
              go({
                // to: currentPath,
                to: resource?.name,
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
              go({
                // to: currentPath,
                to: resource?.name,
                query: {
                  department_id: department_id,
                },
                options: {
                  keepQuery: true,
                  keepHash: true,
                },
              });
            }}
          />
        </Form.Item>
        <Form.Item label="السنةوالفصل الدراسي" style={{ marginBottom: 0 }}>
          <Select
            {...academicYearSemestersSelectProps}
            placeholder="اختر السنة والفصل الدراسي "
            allowClear
            onClear={() => {
              go({
                // to: currentPath,
                to: resource?.name,
              });
            }}
            style={{ width: 300 }}
            value={academic_year_semester_id_query_parameter}
            onChange={(academic_year_semester_id) => {
              localStorage.setItem(
                "academic_year_semester_id_query_parameter",
                academic_year_semester_id as unknown as string
              );
              go({
                // to: currentPath,
                to: resource?.name,
                query: {
                  academic_year_semester_id,
                },
                options: {
                  keepQuery: true,
                  keepHash: true,
                },
              });
            }}
          />
        </Form.Item>
      </Space>
      <div>
        {/* </Flex> */}
        <Dropdown
          menu={{ items }}
          placement="bottomLeft"
          open={isNotificationDropdownOpen}
          popupRender={(menu) => (
            <div style={contentStyle}>
              {React.cloneElement(
                menu as React.ReactElement<{
                  style: React.CSSProperties;
                }>,
                { style: menuStyle }
              )}
              <Divider style={{ margin: 0 }} />
              <Space style={{ padding: 8 }}>
                <Button type="primary">Click me!</Button>
              </Space>
            </div>
          )}
        >
          <Button
            shape="circle"
            icon={<BellFilled />}
            size="large"
            onClick={openNotificationDropdown}
          />
        </Dropdown>
        {/* </Space> */}
      </div>
    </AntdLayout.Header>
  );
};
