import axios from "axios";
import { useEffect, useState } from "react";

type UseSendDataResult<T> = {
  isLoading: boolean;
  isError: string | null;
  responseData: T | null;
};

const useSendData = <T>(url: string, data: T): UseSendDataResult<T> => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<string | null>(null);
  const [responseData, setResponseData] = useState<T | null>(null);

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      setIsError(null);
      try {
        const response = await axios.post(url, data);
        setResponseData(response.data);
      } catch (error: any) {
        setIsError(error.message || "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (url && data) {
      sendRequest();
    }
  }, [url, data]);

  return { isLoading, isError, responseData };
};

export default useSendData;