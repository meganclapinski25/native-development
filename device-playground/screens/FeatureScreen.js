import * as React from 'react';
import { View, Text, Pressable, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FeatureScreen({ route }) {
  const station = route?.params?.station ?? 'Image Picker';
  const [imageUri, setImageUri] = React.useState(null);

  const pickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission required', 'Please allow photo access to pick an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 0.8,
    });

    if (result.canceled) return;

    setImageUri(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Feature</Text>
      <Text style={styles.station}>{station}</Text>

      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Pick Image</Text>
      </Pressable>

      {!imageUri ? (
        <Text style={styles.hint}>No image selected yet.</Text>
      ) : (
        <Image source={{ uri: imageUri }} style={styles.image} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 28, fontWeight: '700', marginBottom: 6 },
  station: { fontSize: 18, fontWeight: '700', marginBottom: 12 },
  hint: { marginTop: 12, color: '#555' },
  button: {
    backgroundColor: '#f4511e',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  buttonText: { color: 'white', fontWeight: '700', fontSize: 16 },
  image: { marginTop: 12, width: '100%', height: 280, borderRadius: 12 },
});