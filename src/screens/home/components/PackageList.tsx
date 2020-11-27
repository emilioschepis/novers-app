import React, { useContext, useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

import usePackages from '../../../hooks/usePackages';
import PackagesContext from '../../../state/PackagesContext';
import PackageRow from './PackageRow';

const PackageList: React.FC = () => {
  const { names, removeName } = useContext(PackagesContext);
  const { loading, error, data } = usePackages(names);

  useEffect(() => {
    if (data && data.length > 0 && names.length > 0) {
      if (data.length === names.length) {
        // Short-circuit because there is no mismatch between packages and names.
        return;
      }

      const dataNames = data.map((element) => element.name);

      // Remove all elements that are not returned in the request.
      // TODO: Update this when the API supports returning an error for non-existent names.
      names
        .filter((name) => !dataNames.includes(name))
        .forEach((name) => {
          removeName(name);
        });
    }
  }, [names, data]);

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
