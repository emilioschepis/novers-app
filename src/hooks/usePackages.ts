import { useEffect, useState } from 'react';

import api from '../api/api';
import Package from '../models/package';

export default (names: string[]) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Package[] | undefined>();
  const [error, setError] = useState<any | undefined>();

  useEffect(() => {
    api
      .fetchPackages(names)
      .then((packages) => {
        setLoading(false);
        setData(packages);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  }, [names]);

  return { loading, error, data };
};
