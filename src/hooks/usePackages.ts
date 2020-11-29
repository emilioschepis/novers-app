import { useEffect, useState } from 'react';

import api from '../api/api';
import Package from '../models/package';

export default (names: string[]) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Package[] | undefined>();
  const [error, setError] = useState<any | undefined>();
  const [cache, setCache] = useState<Package[]>([]);

  useEffect(() => {
    if (names.length === 0) {
      return;
    }

    let localNames = new Set(names);
    let localPackages = new Set<Package>([]);
    for (const cachedPackage of cache) {
      if (localNames.has(cachedPackage.name)) {
        localPackages.add(cachedPackage);
        localNames.delete(cachedPackage.name);
      }
    }

    if (localNames.size === 0) {
      // We already have information about all packages
      setData(Array.from(localPackages));
      return;
    }

    setLoading(true);

    api
      .fetchPackages(Array.from(localNames))
      .then((packages) => {
        setCache(current => current.concat(packages));
        setData(Array.from(localPackages).concat(packages));
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
