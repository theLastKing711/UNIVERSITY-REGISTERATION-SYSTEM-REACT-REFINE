import { AxiosError } from 'axios';
import dayjs, { Dayjs } from "dayjs";
import { CrudFilter, HttpError, Pagination, useDelete, ValidationErrors } from "@refinedev/core";
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


export const areDatesEqual = (day1: Dayjs, day2: Dayjs) => {

  return (
                dayjs(day1).isSame(day2, "year") &&
                dayjs(day1).isSame(day2, "month") &&
                dayjs(day1).isSame(day2, "day")
              );
  
}


export const formatDateTime = (datetime: Dayjs) => {

  return datetime.format("HH-mm-ss A")
  
}


export const getFiltersQuery = (filters: CrudFilter[] | undefined) => {
    let query = '';
    filters?.forEach((item, index) => {
    
    if(item.value)
    {
      let lastChar = item.field[item.field.length - 1];
      if(Array.isArray(item.value))
      {
        item.value.forEach((listItem, index) => {
          query += '&' + item.field + "=" + listItem;
        });
      }
      else {
        query += '&' + item.field + "=" + item.value;
      }
    }

    })
    return query;
}
export const getPaginationQuery = (pagination: Pagination | undefined) => {
  
  let query = '';
  if(pagination)
  {
    const pageNumber = pagination?.current;
    const pageSize = pagination.pageSize;

    query += `&page=${pageNumber}`;
    query += `&perPage=${pageSize}`;
  }
  return query;
}

export const getCursorPaginationQuery = (pagination: Pagination | undefined) => {
  
  let query = '';
  if(pagination)
  {
    const pageNumber = pagination.current;
    const pageSize = pagination.pageSize;

    query += `&cursor=${pageNumber}`;
    query += `&perPage=${pageSize}`;
  }

  console.log("query", query);
  
  return query;
}

export const getSortersQuery = (sorters: CrudSort[] | undefined) => {

  if(!sorters || sorters?.length === 0)
  {
    return "";
  }

  // console.log("sorters", sorters);
  
  const query = sorters?.reduce(((prev,curr, index) => {
    if(curr.order === "asc")
    {
      return prev + "&sort=" + curr.field + "&dir=asc";
    }
    if(curr.order)
    {
      return prev + "&sort=" + curr.field + "&dir=desc";
    }
  }), "")

  return query;
}


export const getQueryQuestionMarkOrEmpty = (...values: string[]) =>
{
  if(values.length === 0)
    {
        return "";
    }
  return values.some(query => query.length > 0) ? "?" : "";
}

export const  parseAxiosErrorsToList = (err: unknown) => {
  const axiosError = err as AxiosError;

  // console.log("error", (axiosError.response?.data as any).errors);

  const x:ValidationErrors = {}

  const errorsObject = ((axiosError.response?.data) as any).errors as Record<string, any>
  
  const errorsList = Object.values(errorsObject).flat() as string[];

  return errorsList;
    
}


export const getMutationResponseHttpError = (err: unknown) => {

   const httpError: HttpError = {
        errors: {
          // data: errorsList
         ...err.response.data.errors,
          // from: err.response.data.message,

        },
        message: err.response.data.message,
        statusCode: 422,
      };
    return httpError;
  
}