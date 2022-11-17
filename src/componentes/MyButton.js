import React from 'react';
import {TouchableHighlight, Text, StyleSheet} from 'react-native';

const MyButton = props => {
  //console.log(props);
  return (
    <TouchableHighlight style={styles.button} onPress={() => props.onClick()}>
      <Text style={styles.text}>{props.texto}</Text>
    </TouchableHighlight>
  );
};
export default MyButton;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    color: 'white',
  },
  button: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#478b5d',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
});
