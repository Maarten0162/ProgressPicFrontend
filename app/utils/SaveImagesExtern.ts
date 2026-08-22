import { BACKEND_ENDPOINT } from '@env';
import axios from 'axios';
import { Platform } from 'react-native';
import { RecordEntry } from '../context/RecordProvider';

export const saveRecordExtern = async (record: RecordEntry) => {
  const formData = new FormData();

  formData.append("userUUID", record.userUUID);
  formData.append("date", record.date);

  console.log(BACKEND_ENDPOINT);
  console.log(record.date);

  const map: Record<string, string> = {
    FRONT: "front",
    SIDE: "side",
    BACK: "back",
  };

  for (const img of record.images) {
    const key = map[img.type];
    if (!key || !img.imageUrl) continue;

    if (Platform.OS === "web") {
      const response = await fetch(img.imageUrl);
      const blob = await response.blob();
      formData.append(key, blob, `${key}.jpg`);
    } else {
      formData.append(key, {
        uri: img.imageUrl,
        name: `${key}.jpg`,
        type: "image/jpeg",
      } as any);
    }
  }
  formData.forEach((value, key) => {
    console.log(key, value);
  });
  const isUpdate = !!record.id;

  const url = isUpdate
    ? `http://localhost:8080/api/record/${record.id}`
    : `http://localhost:8080/api/record`;

  const res = await axios({
    url,
    method: isUpdate ? "put" : "post",
    data: formData,
  });

  return res.data;
};