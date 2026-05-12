import axios from "axios";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { RecordEntry } from "../context/RecordProvider";


export default function Index() {
  const [progressEntries, setProgressEntries] = useState<RecordEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProgressEntries = async (): Promise<RecordEntry[]> => {
  const response = await axios.get<RecordEntry[]>(
    "https://progresspicbackend.onrender.com/api/record/f004d522-ea12-4f7e-9731-d03f2043d730"
  );
  return response.data;
};

  useEffect(() => {
    // Fetch once on mount
    const loadProgress = async () => {
      try {
        const data = await fetchProgressEntries();
        setProgressEntries(data);
      } catch (err) {
        console.error("Error fetching progress entries:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProgress();
  }, []); // empty dependency array = runs only once on mount

  if (loading) return <Text>Loading...</Text>;

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {progressEntries.map((entry) => (
        <View key={entry.id} style={{ marginBottom: 20 }}>
          <Text>Date: {new Date(entry.date).toLocaleDateString()}</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {entry.images.map((img) => (
              <Image
                key={img.id}
                source={{ uri: img.imageUrl }}
                style={{ width: 120, height: 120, marginRight: 8, borderRadius: 8 }}
              />
            ))}
          </ScrollView>

          {entry.images.length === 0 && <Text>No images for this entry</Text>}
        </View>
      ))}
    </ScrollView>
  );
}