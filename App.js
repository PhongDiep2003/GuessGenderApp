import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';

export default function App() {
  return (
    <MainScreen></MainScreen>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
