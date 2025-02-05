import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ThoughtsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Doctors can post their thoughts here.</Text>
    </View>
  );
};

export default ThoughtsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
