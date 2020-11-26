import React from 'react';

type PackagesContextType = {
  names: string[];
  addName: (name: string) => void;
  removeName: (name: string) => void;
};

const PackagesContext = React.createContext<PackagesContextType>({
  names: [],
  addName: () => {},
  removeName: () => {},
});

export default PackagesContext;
