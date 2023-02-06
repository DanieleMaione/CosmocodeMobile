import React, {useState} from 'react';
import {TextInput, StyleSheet} from 'react-native';

export const SearchBar = () => {
  const [value, setValue] = useState<string>();
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="white"
      placeholder="Cerca un post"
      onChangeText={setValue}
      value={value}
    />
  );
};
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    width: 250,
    borderWidth: 1,
    borderColor: 'rgb(17, 236, 229)',
    padding: 10,
    color: 'white',
    alignSelf: 'center',
  },
});
