import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';


const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome!</Text>
      <Text>App.js</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

export default App;
