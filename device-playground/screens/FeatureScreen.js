import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Image, Alert, TextInput,Share } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FeatureScreen({ route }) {
  const station = route?.params?.station ?? 'Share API';
  
  const [message, setMessage] = React.useState('Hello From my App!');
  const [status, setStatus] = React.useState('');

  const onPress = async () => {
    const result = await Share.share({message});
    setStatus(result.action === Share.sharedAction ? 'Shared!' : 'Canceled');
  };

  return (
    <View style={styles.container}>
        <Text>{message}</Text>
            <Pressable style={styles.button} onPress={onPress}>
                <Text style={styles.buttonText}>Share</Text>
            </Pressable>
        {status ? <Text>{status}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1, borderColor: '#ddd',
    borderRadius: 10, padding: 12,
    fontSize: 16, marginBottom: 12,
  },
  button: {
    backgroundColor: '#f4511e', padding: 12,
    borderRadius: 10, alignSelf: 'flex-start',
  },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },
});