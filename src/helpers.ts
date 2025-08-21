import dayjs, { Dayjs } from "dayjs";
import { useDelete } from "@refinedev/core";
import { CustomUploadFile } from "./types/shared";


export const useRemoveItem = <T extends {id: number}>(item: T, message: string, description: string) => {

      const { mutate: remove } = useDelete();

    const removeItem = (record: T) => {
        console.log("record", record);
        remove({
            resource: "admin",
            id: record.id,
            successNotification: (data, values, resourses) => ({
                message,
                description,
                type: "success",
            }),
        });

    return {
        removeItem
    };
  };
    
}


export const getDayJsValue = (value:any ) => {

    return {value: dayjs(value)};
}


export const getDayJsValueFromTime = (value:any ) => {

    return {value: dayjs(value, 'hh:mm::ss')};
}

export const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getIdsFromCustomUploadFiles = (customUploadFiles: CustomUploadFile[]) => {
  return customUploadFiles.map(getIdFromCustomUploadFile);
};

export const getIdFromCustomUploadFile = (customUploadFile?: CustomUploadFile) => {

  if(!customUploadFile)
    return null;
  
  return customUploadFile.response?.id;
};



export const getDayJsdateFormat = (date: string) => {

  return dayjs(date).format("YYYY-MM-DD");
};


export const getTimeStringFromDayJs = (time: Dayjs | string) => {

  if(typeof(time) === 'string')
  {
      const timeDayJs = dayjs(time, "hh:mm:ss");
    
      const minute = timeDayJs.get('m').toString();

      const minute_string = minute.padStart(2, '0');

      const hour = timeDayJs.get('h').toString();

      const hour_string = hour.padStart(2, '0');

      return `${hour_string}:${minute_string}:00`;
  }

  const minute = time.get('m').toString();

  const minute_string = minute.padStart(2, '0');

  const hour = time.get('h').toString();

  const hour_string = hour.padStart(2, '0');


  return `${hour_string}:${minute_string}:00`;
};

