import * as Linking from 'expo-linking';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { format } from 'timeago.js';

import Button from '../../../components/Button';
import Package from '../../../models/package';

export type PackageRowProps = {
  package: Package;
  onRemove: () => void;
};

const PackageRow: React.FC<PackageRowProps> = (props) => {
  function openLink(link: string) {
    Linking.openURL(link);
  }

  return (
    <Pressable style={styles.container} onLongPress={props.onRemove}>
      <View style={styles.headerContainer}>
        <Text style={styles.nameText}>{props.package.name}</Text>
        <Text>{format(props.package.modifiedAt)}</Text>
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>{props.package.version}</Text>
      </View>
      <ScrollView horizontal contentContainerStyle={styles.buttonsContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            text="View on NPM"
            color="#CC3534"
            onPress={() => openLink(`https://www.npmjs.com/package/${props.package.name}`)}
          />
        </View>
      </ScrollView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  versionContainer: {
    marginTop: 8,
  },
  versionText: {
    fontSize: 24,
  },
  buttonsContainer: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonWrapper: {
    marginRight: 8,
  },
});

export default PackageRow;
