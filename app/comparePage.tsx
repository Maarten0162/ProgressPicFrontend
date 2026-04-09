import React, { useEffect, useState } from 'react'
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import CompareSettBar from './components/CompareSettBar'
import ImageCarousel from './components/ImageCarousel'
import SegmentedControl from './components/SegmentedControll/SegmentedControl'
import { RecordEntry } from './context/RecordProvider'
import { useRecords } from './hooks/useRecords'
import { ViewType } from './context/RecordProvider'

export default function comparePage() {
  const { records } = useRecords();
  const [viewType, setViewType] = useState<ViewType>("FRONT");

  const images = records.flatMap(record =>
    record.images.filter(img => img.type === viewType)
  );
  
  const [SelectedImageOne, setSelectedImageOne] = useState<RecordEntry | null>(null);
  const [SelectedImageTwo, setSelectedImageTwo] = useState<RecordEntry | null>(null);

  useEffect(() => {
    if (records.length > 0) {
      setSelectedImageOne(records[0]);
      setSelectedImageTwo(records[1] ?? null);
    }
  }, [records]);
  return (
    <View style={styles.container}>

      <View style={styles.HeaderContainer}>
        <SegmentedControl onSwitchView={setViewType}/>
      </View>


      <View style={styles.imageContainer}>
        <Text style={styles.dateText}>{ 
          SelectedImageOne ? new Date(SelectedImageOne.date).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : "Date ERROR"}
        </Text>

        <Image
          source={{ uri: SelectedImageOne?.images.find(img => img.type === viewType)?.imageUrl ??
          "https://dummyimage.com/400/aaaaaa/ffffff&text=No+Image",
          }} 

          style={styles.image}
        />

        <View style={styles.KeyValueTextContainer}>
          <Text style={styles.keyText}>Scale Weight: </Text>
          <Text style={styles.valueText}>90.1 kg</Text>
        </View>
      </View>


      <View style={styles.BottomBar}>
        <ImageCarousel >
          {records.map(record =>
              record.images
                .filter(img => img.type === viewType)
                .map(img => (
                  <Pressable
                    key={img.id}
                    onPress={() => setSelectedImageOne(record)}
                  >
              <Image
              key={img.id}
              source={{ uri: img.imageUrl }}
              style={styles.carouselImage}
              />
            </Pressable>
            
          )))}
        </ImageCarousel>
        <CompareSettBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  HeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  imageContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  image: {
    width: Platform.OS === "web" ? 500 : "80%",
    aspectRatio: 1,
    borderRadius: Platform.OS === "web" ? 15 : 45,
    borderColor: "lightgray",
    borderWidth: 4,
  },
  dateText: {
    fontSize: 24,
    color: "white",
    marginBottom: 15,
  },
  keyText: {
    fontSize: 18,
    color: "white",
  },
  valueText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  KeyValueTextContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  BottomBar: {
    padding: 10,
  },
  carouselImage: {
    width: 100,
    height: 100,
    margin: 1,
  },
});