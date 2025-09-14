import { type RefineThemedLayoutV2HeaderProps } from "@refinedev/antd";
import {
  Layout as AntdLayout,
  Button,
  Divider,
  Dropdown,
  Form,
  List,
  MenuProps,
  notification,
  Select,
  Space,
  theme,
  Typography,
} from "antd";
import React, { useContext, useState } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { useGetDepratments } from "../../hooks/API/select/useGetDepartments";
import {
  useGetIdentity,
  useGo,
  useInfiniteList,
  useInvalidate,
  useNavigation,
  useNotification,
  useParsed,
  useSubscription,
  useUpdate,
} from "@refinedev/core";
import { useGetAcademicYearSemesters } from "../../hooks/API/select/useGetAcademicYearSemesters";
import { useGetGlobalQueryFilters } from "../../hooks/useGetGlobalQueryFilters";
import { BellFilled } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { NOTIFICATION_URI } from "../../constants";
import { GetNotificationsResponseData } from "../../types/admins/notifications";
import { createStyles } from "antd-style";

const { Text } = Typography;
const { useToken } = theme;

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

const useStyles = createStyles(({ token, css }) => ({
  myButton: {
    // backgroundColor: token.colorPrimary,
    "&:hover": {
      // Define hover styles using the '&:hover' selector
      backgroundColor: token.colorLinkHover,
    },
  },
}));

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
  } = useInfiniteList<GetNotificationsResponseData>({
    resource: NOTIFICATION_URI,
    // pagination: {
    //   pageSize: 20,
    //   current: 1,
    // },
    queryOptions: {
      getNextPageParam: (lastPage, allPages) => {
        console.log("lastPage", lastPage.cursor);
        console.log("allPages", allPages);

        return lastPage.cursor;
      },
      initialData: undefined,
    },
    meta: { isCursorPagiantion: true },
  });

  const invalidate = useInvalidate();

  const { mutate } = useUpdate();

  const markNotificationAsRead = (id: any) => {
    mutate(
      {
        resource: NOTIFICATION_URI,
        id,
        values: {},
      },
      {
        onSuccess: () => {
          invalidate({
            resource: NOTIFICATION_URI,
            invalidates: ["list"],
          });
        },
      }
    );
  };

  const notifications = data?.pages.flatMap((page) => page.data);

  const { styles } = useStyles();

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

  const { editUrl, push } = useNavigation();

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
        <Dropdown
          placement="bottomLeft"
          open={isNotificationDropdownOpen}
          popupRender={(menu) => (
            <div style={contentStyle}>
              {/* {React.cloneElement(
                menu as React.ReactElement<{
                  style: React.CSSProperties;
                }>,
                { style: menuStyle }
              )} */}
              <InfiniteScroll
                dataLength={notifications?.length || 0}
                height={400}
                next={fetchNextPage}
                inverse={false}
                hasMore={!!hasNextPage}
                loader={<h4>Loading...</h4>}
              >
                <List
                  style={{
                    minWidth: "600px",
                    // paddingInline: "8px",
                    cursor: "pointer",
                  }}
                  size="large"
                  dataSource={notifications}
                  renderItem={(item) => (
                    <List.Item
                      key={item.id}
                      // className={styles.myButton}
                      style={{
                        backgroundColor: item.read_at
                          ? ""
                          : token.colorLinkHover,
                      }}
                      onClick={() => {
                        markNotificationAsRead(item.id);
                        closeNotificationDropdown();
                        push(item.data.link);
                      }}
                    >
                      {/* <List.Item.Meta
                        // avatar={<Avatar src={item.avatar} />}
                        // title={<a href={item.data.link}>{item.data.link}</a>}
                        description={item.data.message}
                      /> */}
                      <div>{item.data.message}</div>
                    </List.Item>
                  )}
                />
              </InfiniteScroll>
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
      </div>
    </AntdLayout.Header>
  );
};
