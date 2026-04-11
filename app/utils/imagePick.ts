import * as ImagePicker from "expo-image-picker";

export const pickImageFromLibrary = async () => {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permission.granted) {
    alert("Permission required");
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ["images"],
    allowsEditing: true,
    quality: 1,
  });

  if (result.canceled) return null;

  return result.assets[0].uri;
};