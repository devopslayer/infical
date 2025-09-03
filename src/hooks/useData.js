import { useEffect, useState } from "react";
import { fetchData } from "../services/api";

function useData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (err) {
      setError(err);
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { data, loading, error };
}

export default useData;
