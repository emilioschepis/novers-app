import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

export type SearchBarProps = {
  search: string;
  placeholder: string;
  onSearchChange: (search: string) => void;
  onSearchSubmit: (search: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = (props) => {
  return (
    <View style={styles.container}>
      <TextInput
        enablesReturnKeyAutomatically
        autoCorrect={false}
        value={props.search}
        placeholder={props.placeholder}
        onChangeText={props.onSearchChange}
        onSubmitEditing={(event) => props.onSearchSubmit(event.nativeEvent.text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
});

export default SearchBar;
