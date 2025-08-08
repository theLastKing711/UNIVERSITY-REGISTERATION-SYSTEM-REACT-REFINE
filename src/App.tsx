import { Authenticated, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineThemes,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp, ConfigProvider } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { ADMIN_ADMIN_URI, ADMIN_STUDENT_URI, BASE_URI } from "./constants";
import Login from "./pages/auth/login/Login";
import {
  AdminCreate,
  AdminEdit,
  AdminList,
  AdminShow,
} from "./pages/admins/admins";
import {
  StudentsList,
  StudentsCreate,
  StudentsShow,
  StudentsEdit,
} from "./pages/admins/students";
import { dataProvider } from "./data-provider";
import { ThemeConfig } from "antd/lib";

const theme: ThemeConfig = {
  components: {
    Form: {
      marginLG: 44, // Customizes the default large margin for form items
    },
  },
};

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider direction={"rtl"} theme={RefineThemes.Blue}>
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <AntdApp>
              <DevtoolsProvider>
                <Refine
                  dataProvider={dataProvider(BASE_URI)}
                  notificationProvider={useNotificationProvider}
                  routerProvider={routerBindings}
                  authProvider={authProvider}
                  resources={[
                    // {
                    //   name: "categories",
                    //   list: "/categories",
                    //   create: "/categories/create",
                    //   edit: "/categories/edit/:id",
                    //   show: "/categories/show/:id",
                    //   meta: {
                    //     canDelete: true,
                    //   },
                    // },
                    {
                      name: ADMIN_ADMIN_URI,
                      list: "/admins",
                      create: "/admins/create",
                      edit: "/admins/edit/:id",
                      show: "/admins/show/:id",
                      meta: {
                        label: "الإداريين",
                        canDelete: true,
                      },
                    },
                    {
                      name: ADMIN_STUDENT_URI,
                      list: "/students",
                      create: "/students/create",
                      edit: "/students/edit/:id",
                      show: "/students/show/:id",
                      meta: {
                        label: "التلاميذ",
                        canDelete: true,
                      },
                    },
                  ]}
                  options={{
                    syncWithLocation: true,
                    warnWhenUnsavedChanges: true,
                    useNewQueryKeys: true,
                    projectId: "BsRq8M-JCn5LZ-y3rY11",
                  }}
                >
                  <Routes>
                    <Route path="/login" element={<Login />} />

                    <Route
                      element={
                        <ThemedLayoutV2>
                          <Outlet />
                        </ThemedLayoutV2>
                      }
                    >
                      <Route path="/admins">
                        <Route index element={<AdminList />} />
                        <Route path="create" element={<AdminCreate />} />
                        <Route path="show/:id" element={<AdminShow />} />
                        <Route path="edit/:id" element={<AdminEdit />} />

                        {/* <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} /> */}
                      </Route>

                      <Route path="/students">
                        <Route index element={<StudentsList />} />
                        <Route path="create" element={<StudentsCreate />} />
                        <Route path="show/:id" element={<StudentsShow />} />
                        <Route path="edit/:id" element={<StudentsEdit />} />

                        {/* <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} /> */}
                      </Route>
                    </Route>

                    <Route
                      element={
                        <Authenticated
                          key="authenticated-inner"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <ThemedLayoutV2
                            Header={Header}
                            Sider={(props) => (
                              <ThemedSiderV2 {...props} fixed />
                            )}
                          >
                            <Outlet />
                          </ThemedLayoutV2>
                        </Authenticated>
                      }
                    >
                      <Route path="/login" element={<Login />} />
                      {/* <Route
                        index
                        element={<NavigateToResource resource="blog_posts" />}
                      /> */}
                      {/* <Route path="/blog-posts">
                        <Route index element={<BlogPostList />} />
                        <Route path="create" element={<BlogPostCreate />} />
                        <Route path="edit/:id" element={<BlogPostEdit />} />
                        <Route path="show/:id" element={<BlogPostShow />} />
                      </Route>
                      <Route path="/categories">
                        <Route index element={<CategoryList />} />
                        <Route path="create" element={<CategoryCreate />} />
                        <Route path="edit/:id" element={<CategoryEdit />} />
                        <Route path="show/:id" element={<CategoryShow />} />
                      </Route> */}
                      <Route path="*" element={<ErrorComponent />} />
                    </Route>
                    {/* <Route
                      element={
                        <Authenticated
                          key="authenticated-outer"
                          fallback={<Outlet />}
                        >
                          <NavigateToResource />
                        </Authenticated>
                      }
                    >
                      
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                      />
                    </Route>*/}
                  </Routes>
                  <RefineKbar />
                  <UnsavedChangesNotifier />
                  <DocumentTitleHandler />
                </Refine>
                <DevtoolsPanel />
              </DevtoolsProvider>
            </AntdApp>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
