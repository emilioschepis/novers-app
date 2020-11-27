import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import SearchBar from '../../components/SearchBar';
import PackagesContext from '../../state/PackagesContext';
import PackageList from './components/PackageList';

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const { addName } = useContext(PackagesContext);

  function handleSearchSubmit(search: string) {
    setSearch('');
    addName(search.toLocaleLowerCase());
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar
          search={search}
          placeholder="Insert the name of a package to check"
          onSearchChange={setSearch}
          onSearchSubmit={handleSearchSubmit}
        />
      </View>
      <PackageList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  searchContainer: {
    margin: 16,
  },
});

export default HomeScreen;
