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

import {
  ADMIN_ACADEMIC_YEAR_SEMESTER_CREATE,
  ADMIN_ACADEMIC_YEAR_SEMESTER_EDIT,
  ADMIN_ACADEMIC_YEAR_SEMESTER_LIST,
  ADMIN_ACADEMIC_YEAR_SEMESTER_SHOW,
  ADMIN_ACADEMIC_YEAR_SEMESTER_URI,
  ADMIN_ADMIN_URI,
  ADMIN_STUDENT_URI,
  BASE_URI,
  CLASSROOM_CREATE,
  CLASSROOM_EDIT,
  CLASSROOM_LIST,
  CLASSROOM_SHOW,
  CLASSROOM_URI,
  COURSE_CREATE,
  COURSE_EDIT,
  COURSE_LIST,
  COURSE_SHOW,
  COURSE_URI,
  OPEN_COURSE_REGISTERATION_CREATE,
  OPEN_COURSE_REGISTERATION_EDIT,
  OPEN_COURSE_REGISTERATION_LIST,
  OPEN_COURSE_REGISTERATION_SHOW,
  OPEN_COURSE_REGISTERATION_URI,
} from "./constants";
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
import {
  AcademicYearSemesterList,
  AcademicYearSemesterCreate,
  AcademicYearSemesterShow,
  AcademicYearSemesterEdit,
} from "./pages/admins/academic-year-semesters";
import {
  CourseCreate,
  CourseEdit,
  CourseList,
  CourseShow,
} from "./pages/admins/courses";
import {
  OpenCourseRegisterationsCreate,
  OpenCourseRegisterationsEdit,
  OpenCourseRegisterationsList,
  OpenCourseRegisterationsShow,
} from "./pages/admins/open-course-registerations";
import { ClassroomList } from "./pages/classrooms/list";
import {
  ClassroomCreate,
  ClassroomEdit,
  ClassroomShow,
} from "./pages/classrooms";

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
                    {
                      name: ADMIN_ACADEMIC_YEAR_SEMESTER_URI,
                      list: ADMIN_ACADEMIC_YEAR_SEMESTER_LIST,
                      create: ADMIN_ACADEMIC_YEAR_SEMESTER_CREATE,
                      edit: ADMIN_ACADEMIC_YEAR_SEMESTER_EDIT,
                      show: ADMIN_ACADEMIC_YEAR_SEMESTER_SHOW,
                      meta: {
                        label: "الفصول الدراسية",
                        canDelete: true,
                      },
                    },
                    {
                      name: COURSE_URI,
                      list: COURSE_LIST,
                      create: COURSE_CREATE,
                      edit: COURSE_EDIT,
                      show: COURSE_SHOW,
                      meta: {
                        label: "المواد الدراسية",
                        canDelete: true,
                      },
                    },
                    {
                      name: OPEN_COURSE_REGISTERATION_URI,
                      list: OPEN_COURSE_REGISTERATION_LIST,
                      create: OPEN_COURSE_REGISTERATION_CREATE,
                      edit: OPEN_COURSE_REGISTERATION_EDIT,
                      show: OPEN_COURSE_REGISTERATION_SHOW,
                      meta: {
                        label: "فتح مواد دراسية",
                        canDelete: true,
                      },
                    },
                    {
                      name: "academic-year-semester",
                      list: "/academic-year-semester",
                      create: "/academic-year-semester/create",
                      edit: "/academic-year-semester/edit/:id",
                      show: "/academic-year-semester/show/:id",
                    },
                    {
                      name: CLASSROOM_URI,
                      list: CLASSROOM_LIST,
                      create: CLASSROOM_CREATE,
                      edit: CLASSROOM_EDIT,
                      show: CLASSROOM_SHOW,
                      meta: {
                        label: "الصفوف",
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

                      <Route path={ADMIN_ACADEMIC_YEAR_SEMESTER_URI}>
                        <Route index element={<AcademicYearSemesterList />} />
                        <Route
                          path="create"
                          element={<AcademicYearSemesterCreate />}
                        />
                        <Route
                          path="show/:id"
                          element={<AcademicYearSemesterShow />}
                        />
                        <Route
                          path="edit/:id"
                          element={<AcademicYearSemesterEdit />}
                        />
                      </Route>

                      <Route path={COURSE_URI}>
                        <Route index element={<CourseList />} />
                        <Route path="create" element={<CourseCreate />} />
                        <Route path="show/:id" element={<CourseShow />} />
                        <Route path="edit/:id" element={<CourseEdit />} />
                      </Route>

                      <Route path={OPEN_COURSE_REGISTERATION_URI}>
                        <Route
                          index
                          element={<OpenCourseRegisterationsList />}
                        />
                        <Route
                          path="create"
                          element={<OpenCourseRegisterationsCreate />}
                        />
                        <Route
                          path="show/:id"
                          element={<OpenCourseRegisterationsShow />}
                        />
                        <Route
                          path="edit/:id"
                          element={<OpenCourseRegisterationsEdit />}
                        />
                      </Route>

                      <Route path={CLASSROOM_URI}>
                        <Route index element={<ClassroomList />} />
                        <Route path="create" element={<ClassroomCreate />} />
                        <Route path="show/:id" element={<ClassroomShow />} />
                        <Route path="edit/:id" element={<ClassroomEdit />} />
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
