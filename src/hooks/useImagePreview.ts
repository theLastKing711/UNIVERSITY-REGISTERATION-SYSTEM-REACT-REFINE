import { useState } from "react";
import { CustomUploadFile } from "../types/shared";


export const useImagePreview = () => {

    const [previewImage, setPreviewImage] = useState("");
    
    const [isPreviewImageOpen, setIsPreviewImageOpen] = useState(false);
      

    const openPreviewImage = () => {
        setIsPreviewImageOpen(true);
    };

    const onImagePreview = async (file: CustomUploadFile) => {
        console.log("file", file);
    
        // if (!file.url && !file.preview) {
        //   file.preview = await getBase64(file.originFileObj);
        // }
    
        setPreviewImage(file.url!);
    
        openPreviewImage();
      };



    return {
        previewImage,
        setPreviewImage,
        isPreviewImageOpen,
        setIsPreviewImageOpen,
        openPreviewImage,
        onImagePreview,
    }
}