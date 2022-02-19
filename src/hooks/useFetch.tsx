import { useState, useEffect } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState<object | null>(null);
  const [error, setError] = useState<unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("No Data Found");
        }
        const json = await res.json();
        setData(json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, loading };
};

export default useFetch;
