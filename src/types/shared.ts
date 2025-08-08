import { UploadFile } from "antd";

export type MediaData = {
    id: number;
    file_name: string;
    file_url: string;
    thumbnail_url: string | null;
};



export type FileUploadDirectory = 
    "school_files" | "profile_picture";


// export type CustomUploadFile = 
//     UploadFile & {
//         id: number | null
//     };


    export type CustomUploadFile = 
    UploadFile<AntDesginImageResponse>;

    export type AntDesginImageResponse = {
        id: number | null
    }
    

export type AntDesginImageResponseData = {
    id: number;
    uid: string;
    name: string;
    url: string;
    type: string;
    size: number;
    percent: number | null;
    status: string | null;
};