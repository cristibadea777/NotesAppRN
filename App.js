import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={ [ styles.text, {} ]}>IC XC NI KA !!!</Text>
    </View>
  );
}

//culori  #232B2B #1e1e1e


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232B2B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontSize: 33,
    color: 'white'
  },


});
