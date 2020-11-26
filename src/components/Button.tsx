import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export type ButtonProps = {
  text: string;
  color: string;
  onPress: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <Pressable style={[styles.container, { backgroundColor: props.color }]} onPress={props.onPress}>
      <Text style={styles.text}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 4,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default Button;
