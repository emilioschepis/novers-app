import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import usePackages from '../../../hooks/usePackages';
import PackagesContext from '../../../state/PackagesContext';
import PackageRow from './PackageRow';

const PackageList: React.FC = () => {
  const { names, removeName } = useContext(PackagesContext);
  const { loading, error, data } = usePackages(names);

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
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={data.sort((a, b) => a.name.localeCompare(b.name))}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <PackageRow package={item} onRemove={() => removeName(item.name)} />}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    margin: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PackageList;
