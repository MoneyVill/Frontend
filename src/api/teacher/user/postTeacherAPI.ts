import { defaultInstance } from "@/api/instance";
import { successReturnType, errorReturnType } from "@/types/common/apiReturnTypes";

type paramsType = {
  body: {
    identity: string;
    password: string;
    checkedPassword: string;
    name: string;
  };
};

type responseType = {
  status: number;
  data: successReturnType | errorReturnType;
};

export const postTeacherAPI = async ({ body }: paramsType) => {
  try {
    const response: responseType = await defaultInstance.post("/teacher", body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
