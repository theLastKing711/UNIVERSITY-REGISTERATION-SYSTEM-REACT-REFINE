import React, { useState } from "react";

import { Create, useForm, useSelect, getValueFromEvent } from "@refinedev/antd";

import {
  DatePicker,
  Form,
  Image,
  Input,
  Select,
  Upload,
  UploadFile,
} from "antd";

import { GetDepartmentsResponseData } from "../../../types/admins/departments";
import {
  ADMIN_DEPARTMENT_URI,
  ADMIN_UPLOAD_IMAGE_URI,
} from "../../../constants";
import { apiClient } from "../../../libs/axios/config";
import { CustomUploadFile } from "../../../types/shared";
import { RegisterStudentRequestData } from "../../../types/admins/students";

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const getIdsFromCustomUploadFiles = (customUploadFiles: CustomUploadFile[]) => {
  return customUploadFiles.map(getIdFromCustomUploadFile);
};

const getIdFromCustomUploadFile = (customUploadFile: CustomUploadFile) => {
  return customUploadFile.id;
};

export const StudentsCreate = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
    form,
    onFinish,
  } = useForm<RegisterStudentRequestData>({
    successNotification: (data, values, resourses) => ({
      message: "إنشاء مستخدم جديد",
      description: "تم إنشاء مستخدم جديد بنجاح",
      type: "success",
    }),

    // autoSave: {
    //   enabled: false,
    //   onFinish: (values) => {
    //     console.log("hello world");

    //     return { ...values };
    //   },
    // },
  });

  console.log("form props", form.getFieldValue("name"));

  const { selectProps: departmentSelectProps } =
    useSelect<GetDepartmentsResponseData>({
      resource: ADMIN_DEPARTMENT_URI,
      optionValue: "id",
      optionLabel: "name",
    });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);

  const [filesToUploadIds, setFilesToUploadIds] = useState<number[]>([]);

  const [schoolUploadFiles, setSchoolUploadFiles] = useState<
    CustomUploadFile[]
  >([]);

  const [previewImage, setPreviewImage] = useState("");

  const [isPreviewImageOpen, setIsPreviewImageOpen] = useState(false);

  const onFileUploadDelete = (file: UploadFile) => {
    const files = schoolUploadFiles.filter((item) => item.uid != file.uid);

    setSchoolUploadFiles(files);
  };

  const openPreviewImage = () => {
    setIsPreviewImageOpen(true);
  };

  const closePreviewImage = () => {
    setIsPreviewImageOpen(false);
  };

  const onImagePreview = async (file: UploadFile) => {
    console.log("file", file);

    // if (!file.url && !file.preview) {
    //   file.preview = await getBase64(file.originFileObj);
    // }

    setPreviewImage(file.url!);

    openPreviewImage();
  };

  console.log("upload files", schoolUploadFiles);

  const handleOnFinish = (values) => {
    const { images, ...newValues } = values;

    onFinish({
      ...newValues,
      school_files_ids_to_add: getIdsFromCustomUploadFiles(schoolUploadFiles),
    });
  };

  return (
    <Create
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="إنشاء مستخدم جديد"
    >
      <Form {...formProps} layout="vertical" onFinish={handleOnFinish}>
        <Form.Item
          label="القسم"
          name="department_id"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            placeholder="اختر القسم"
            style={{ width: 300, marginBottom: "1.5rem" }}
            {...departmentSelectProps}
          />
        </Form.Item>

        <Form.Item
          name="images"
          label="صور"
          valuePropName="file"
          getValueFromEvent={getValueFromEvent}
          noStyle
        >
          <Upload.Dragger
            fileList={schoolUploadFiles}
            name="file"
            listType="picture"
            maxCount={2}
            multiple
            onPreview={onImagePreview}
            onRemove={onFileUploadDelete}
            // onChange={({ fileList }) => setSchoolUploadFiles(fileList)}
            //it runs once per uploaded file
            customRequest={async (options) => {
              try {
                console.log("options", options.file);

                const x = options.file;

                const beforeUplaod: CustomUploadFile = {
                  ...x,
                  id: 25,
                  status: "uploading",
                };

                setSchoolUploadFiles((oldfiles) => [
                  ...oldfiles,
                  { ...beforeUplaod, name: x.name! },
                ]);

                // setIsUploadingImage(true);
                const result = await apiClient.postForm(
                  ADMIN_UPLOAD_IMAGE_URI + "?fileUploadDirectory=school_files",
                  {
                    file: options.file,
                  },
                  {
                    onUploadProgress: (progressEvent) => {},
                  }
                );

                const file: CustomUploadFile = {
                  id: result.data.id,
                  uid: beforeUplaod.uid,
                  name: x.name!,
                  thumbUrl: result.data.thumbnail_url,
                  url: result.data.file_url,
                };

                setSchoolUploadFiles((oldFiles) =>
                  oldFiles.map((item) =>
                    item.uid === beforeUplaod.uid ? { ...file } : { ...item }
                  )
                );

                console.log("result", result.data);
                options.onSuccess?.(result.data);
              } catch (error) {
                console.log("error", error);

                setSchoolUploadFiles((oldFiles) =>
                  oldFiles.map((item) =>
                    item.uid === options.file.uid!
                      ? { ...item, status: "error" }
                      : { ...item }
                  )
                );

                // open?.({
                //   type: "error",
                //   message: "حذث حطأ أثناء تحميل الصورة",
                // });
                options.onError?.({
                  name: "تحميل الصورة",
                  message: "حدث خطأ أثناء تحميل الصورة",
                });
              } finally {
                setIsUploadingImage(false);
              }
            }}
          >
            <p className="ant-upload-text">Drag & drop a file in this area</p>
          </Upload.Dragger>
        </Form.Item>
        {previewImage && (
          <Image
            wrapperStyle={{ display: "none" }}
            preview={{
              visible: isPreviewImageOpen,
              onVisibleChange: (visible) => setIsPreviewImageOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(""),
            }}
            src={previewImage}
          />
        )}

        <Form.Item
          label="اسم المستخدم"
          name="name"
          rules={[
            {
              required: true,
              message: "اسم المستخدم مطلوب",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="كلمة المرور"
          name="password"
          rules={[
            {
              required: true,
              message: "كلمة المرور مطلوبة",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="الرقم الوطني"
          name="national_id"
          rules={[
            {
              required: true,
              message: "الرقم الوطني مطلوب",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          label="رقم الهاتف"
          name="phone_number"
          rules={[
            {
              required: true,
              message: "رقم الهاتف مطلوب",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item label="تاريخ الميلاد" name="birthdate">
          <DatePicker />
        </Form.Item>

        <Form.Item label="تاريخ التسجيل" name="enrollment_date">
          <DatePicker />
        </Form.Item>

        {errorsList && (
          <div style={{ color: "red" }}>
            {errorsList.map((error) => (
              <h5>{error}</h5>
            ))}
          </div>
        )}
      </Form>
    </Create>
  );
};
