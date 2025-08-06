import { UploadFile } from "antd";

export type MediaData = {
    id: string;
    file_url: string;
    thumbnail_url: string | null;
};



export type fileUploadDirectory = 
    "school_files" | "profile_picture";


export type CustomUploadFile = 
    UploadFile & {
        id: number | null
    };