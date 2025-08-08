import React from "react";

import { useForm, useSelect, getValueFromEvent, Edit } from "@refinedev/antd";

import { DatePicker, Form, Image, Input, Select, Space, Upload } from "antd";

import { GetDepartmentsResponseData } from "../../../types/admins/departments";
import { ADMIN_DEPARTMENT_URI } from "../../../constants";
import {} from "../../../types/shared";
import {
  GetStudentResponseData,
  GetStudentTransformedResponseData,
} from "../../../types/admins/students";
import {
  getDayJsValue,
  getIdFromCustomUploadFile,
  getIdsFromCustomUploadFiles,
} from "../../../helpers";
import { HttpError } from "@refinedev/core";
import { useImageUpload } from "../../../hooks/useUploadImage";
import { useImagePreview } from "../../../hooks/useImagePreview";

export const StudentsEdit = () => {
  const {
    formProps,
    saveButtonProps,
    mutation: mutationResult,
    form,
    onFinish,
  } = useForm<
    GetStudentResponseData,
    HttpError,
    Record<string, string>,
    GetStudentTransformedResponseData,
    GetStudentResponseData,
    HttpError
  >({
    successNotification: (data, values, resourses) => ({
      message: "تعديل بيانات التلميذ",
      description: "تم تعديل بيانات التلميذ بنجاح",
      type: "success",
    }),
    queryOptions: {
      select: (data) => {
        return {
          ...data,
          data: {
            ...data.data,
            profilePicture: data.data.profilePicture
              ? [data.data.profilePicture!]
              : [],
          },
        };
      },
    },
  });

  const { selectProps: departmentSelectProps } =
    useSelect<GetDepartmentsResponseData>({
      resource: ADMIN_DEPARTMENT_URI,
      optionValue: "id",
      optionLabel: "name",
    });

  const errorsList = mutationResult?.error?.errors?.data as [] | undefined;

  const {
    isPreviewImageOpen,
    onImagePreview,
    previewImage,
    setPreviewImage,
    setIsPreviewImageOpen,
  } = useImagePreview();

  const {
    uploadFiles: profilePictureUploadFiles,
    uploadFile: profilePictureUploadFile,
    onFileRemove: onProfilePictureFileRemove,
    upload: uploadProfilePictureFile,
  } = useImageUpload("profile_picture", "single");

  const {
    filesToDeleteIds: schoolFilesToDeleteIds,
    uploadFiles: schoolUploadFiles,
    onFileRemove: onSchoolFilesRemove,
    upload: uploadSchoolFiles,
  } = useImageUpload("school_files");

  console.log("upload files", schoolUploadFiles);

  const handleOnFinish = (values) => {
    const { schoolFiles, ...newValues } = values;

    onFinish({
      ...newValues,
      school_files_ids_to_add: getIdsFromCustomUploadFiles(schoolUploadFiles),
      school_files_ids_to_delete: schoolFilesToDeleteIds,
      temporary_profile_picture_id: getIdFromCustomUploadFile(
        profilePictureUploadFile
      ),
    });
  };

  return (
    <Edit
      saveButtonProps={{ ...saveButtonProps, children: "حفظ" }}
      title="تعديل بيانات تلميذ"
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
            style={{ width: 300 }}
            {...departmentSelectProps}
          />
        </Form.Item>

        <Form.Item
          name="profilePicture"
          label="الصورة الشخصية"
          valuePropName="fileList"
          getValueFromEvent={getValueFromEvent}
        >
          <Upload.Dragger
            fileList={profilePictureUploadFiles}
            maxCount={1}
            name="file"
            listType="picture"
            onPreview={onImagePreview}
            onRemove={onProfilePictureFileRemove}
            customRequest={uploadProfilePictureFile}
          >
            <p className="ant-upload-text">اسحب الصور لهذة المنطقة.</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          name="schoolFiles"
          label="صور المدرسة"
          valuePropName="fileList"
          getValueFromEvent={getValueFromEvent}
        >
          <Upload.Dragger
            fileList={schoolUploadFiles}
            name="file"
            listType="picture"
            maxCount={5}
            multiple
            onPreview={onImagePreview}
            onRemove={onSchoolFilesRemove}
            // onChange={({ fileList }) => setSchoolUploadFiles(fileList)}
            //it runs once per uploaded file
            customRequest={uploadSchoolFiles}
          >
            <p className="ant-upload-text">اسحب الصور لهذة المنطقة.</p>
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

        <Form.Item label="كلمة المرور" name="password">
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

        <Form.Item
          label="تاريخ الميلاد"
          name="birthdate"
          getValueProps={getDayJsValue}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          label="تاريخ التسجيل"
          name="enrollment_date"
          getValueProps={getDayJsValue}
        >
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
    </Edit>
  );
};
