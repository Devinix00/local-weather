import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";
import toast from "react-hot-toast";

const apiInstance: AxiosInstance = axios.create({
  baseURL: "",
});

apiInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.error(error);

    const errorMessage =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "알 수 없는 오류가 발생했습니다.";

    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default apiInstance;
