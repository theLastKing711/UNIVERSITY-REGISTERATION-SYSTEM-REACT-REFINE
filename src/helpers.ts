import { useDelete } from "@refinedev/core";


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

