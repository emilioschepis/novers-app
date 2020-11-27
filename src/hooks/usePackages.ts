import { useEffect, useState } from 'react';

import api from '../api/api';
import Package from '../models/package';

export default (names: string[]) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Package[] | undefined>();
  const [error, setError] = useState<any | undefined>();

  useEffect(() => {
    setLoading(true);

    api
      .fetchPackages(names)
      .then((packages) => {
        setData(packages);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [names]);

  return { loading, error, data };
};
