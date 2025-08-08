import { useState } from "react";
import { AntDesginImageResponse, CustomUploadFile, FileUploadDirectory } from "../types/shared";
import { UploadProps } from "antd";
import { ADMIN_UPLOAD_IMAGE_URI } from "../constants";
import { apiClient } from "../libs/axios/config";


export const useImageUpload = (fileUploadDirectory: FileUploadDirectory, uploadType: "single" | "multi" = "multi") => {


     const [isUploadingImage, setIsUploadingImage] = useState<boolean>(false);
    
    const [filesToUploadIds, setFilesToUploadIds] = useState<number[]>([]);

    const [filesToDeleteIds, setfilesToDeleteIds] = useState<
        number[]
      >([]);

    const [uploadFiles, setUploadFiles] = useState<
    CustomUploadFile[]
    >([]);


    const uploadFile = 
        uploadFiles[0];

    const onFileRemove = (file: CustomUploadFile) => {
        const files = uploadFiles.filter((item) => item.uid != file.uid);

        if (file.response?.id) {
            setfilesToDeleteIds([...filesToDeleteIds, file.response.id]);
        }
    
        setUploadFiles(files);
    };


    const upload : UploadProps<AntDesginImageResponse>["customRequest"] = async (
        options
        ) => {
            try {
        
                const x = options.file;
        
                const beforeUplaod: CustomUploadFile = {
                    ...x,
                    status: "uploading",
                };

                console.log("old files",uploadFiles);
                
        
                if(uploadType === "multi")
                {
                    setUploadFiles((oldfiles) => [
                        ...oldfiles,
                        { ...beforeUplaod, name: x.name! },
                    ]);
        
                }

                if(uploadType === "single")
                {
                    setUploadFiles(
                        [{ ...beforeUplaod, name: x.name! }]
                    );
                }
        
                const uploadImageUri = 
                    `${ADMIN_UPLOAD_IMAGE_URI}?fileUploadDirectory=${fileUploadDirectory}`;
        
                setIsUploadingImage(true);
                
                const result = await apiClient.postForm(
                    uploadImageUri,
                    {
                        file: options.file,
                        uid: options.file.uid,
                    },
                    {
                        onUploadProgress: (progressEvent) => {},
                    }
                    );
        
                const responseFile: CustomUploadFile = {
                    response: result.data.response,
                    uid: result.data.uid,
                    name: x.name!,
                    thumbUrl: result.data.file_url,
                    url: result.data.file_url,
                };
        
                setUploadFiles((oldFiles) =>
                    oldFiles.map((item) =>
                        item.uid === responseFile.uid ? { ...responseFile } : { ...item }
                    )
                );
        
                options.onSuccess?.(result.data);
            } catch (error) {
        
                setUploadFiles((oldFiles) =>
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
        };

    return {
        isUploadingImage,
        setIsUploadingImage,
        filesToUploadIds,
        setFilesToUploadIds,
        uploadFiles,
        uploadFile,
        setUploadFiles,
        onFileRemove,
        upload,

        filesToDeleteIds,
        setfilesToDeleteIds
    }
}