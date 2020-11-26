import React, { useContext, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import SearchBar from '../../components/SearchBar';
import usePackages from '../../hooks/usePackages';
import PackagesContext from '../../state/PackagesContext';
import PackageRow from './components/PackageRow';

const HomeScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const { names, addName, removeName } = useContext(PackagesContext);
  const { loading, error, data } = usePackages(names);

  function handleSearchSubmit(search: string) {
    setSearch('');
    addName(search.toLocaleLowerCase());
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Something went wrong.</Text>
      </View>
    );
  }

  if (loading || data === undefined) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={data.sort((a, b) => a.name.localeCompare(b.name))}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <PackageRow package={item} onRemove={() => removeName(item.name)} />}
        ListHeaderComponent={
          <View style={styles.searchContainer}>
            <SearchBar
              search={search}
              placeholder="Insert the name of a package to check"
              onSearchChange={setSearch}
              onSearchSubmit={handleSearchSubmit}
            />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    margin: 16,
  },
  searchContainer: {
    marginBottom: 16,
  },
});

export default HomeScreen;
