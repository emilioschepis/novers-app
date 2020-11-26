import Axios from 'axios';

import Package from '../models/package';

const client = Axios.create({
  baseURL: 'https://ot98gjespj.execute-api.eu-west-1.amazonaws.com/Prod',
});

async function fetchPackages(names: string[]): Promise<Package[]> {
  return client
    .get('/registry', {
      params: {
        packages: names.join(','),
      },
    })
    .then(({ data }) => data);
}

export default {
  fetchPackages,
};
