import axios from 'axios';
import { BACKEND_ENDPOINT } from '@env';
import { RecordEntry } from '../context/RecordProvider';

export const saveRecordExtern = async (record: RecordEntry) => {
  const formData = new FormData();

  formData.append("userUUID", record.userUUID);

  record.images.forEach((img) => {
    formData.append(img.type.toLowerCase(), {
      uri: img.imageUrl,
      name: `${record.userUUID}-${img.type}-${record.date}.jpg`,
      type: "image/jpeg",
    } as any);
  });

  const RESTMethod = record.id ? "put" : "post";

  const res = await axios({
    url: BACKEND_ENDPOINT + "/record",
    method: RESTMethod,
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};