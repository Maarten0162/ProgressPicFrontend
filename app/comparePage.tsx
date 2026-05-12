import React, { useEffect, useState } from 'react'
import { Image, Platform, Pressable, StyleSheet, Text, View } from 'react-native'
import CompareSettBar from './components/CompareSettBar'
import ImageCarousel from './components/ImageCarousel'
import SegmentedControl from './components/SegmentedControll/SegmentedControl'
import { RecordEntry, ViewType } from './context/RecordProvider'
import { useRecords } from './hooks/useRecords'
import Svg, { Path } from 'react-native-svg'
import { Href, router, usePathname, useLocalSearchParams } from 'expo-router'

export default function ComparePage() {
  const { records } = useRecords();
  const { multiviewParam } = useLocalSearchParams();
  
  const [viewType, setViewType] = useState<ViewType>("FRONT");
  const [Multiview, toggleMultiview] = useState(multiviewParam === "true");
  const [SelectedImageIndex, setSelectedImageIndex] = useState<0 | 1>(0);
  
  const [SelectedImageOne, setSelectedImageOne] = useState<RecordEntry | null>(null);
  const [SelectedImageTwo, setSelectedImageTwo] = useState<RecordEntry | null>(null);

  function setSelectedImage(record : RecordEntry) {
    if (SelectedImageIndex === 0 || !Multiview) {
      setSelectedImageOne(record);
    } else setSelectedImageTwo(record);
  }

  useEffect(() => {
    if (records.length > 0) {
      setSelectedImageOne(records[0]);
      setSelectedImageTwo(records[1] ?? null);
    }
  }, [records]);

  const pathname = usePathname();
      
  function changePage(pageString: Href) {
    if (pathname !== pageString) {
      router.push(pageString);
    }
  }
        
  return (
    <View style={styles.container}>
      <View style={styles.HeaderContainer}>
        <Pressable style={styles.backButton} onPress={() => changePage("/")}>
          <View style={styles.backArrow}>
            <Svg viewBox="0 0 24 24" width="32" height="32" fill="none">
              <Path
                d="M15 6L9 12L15 18"
                stroke="#ffffff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </View>
        </Pressable>

        <SegmentedControl onSwitchView={setViewType}/>
      </View>

      {Multiview ? (
        <View >
          {/* Image ONE */}
          <View style={styles.multiImageContainer}>
            
            <Pressable onPress={() => setSelectedImageIndex(0)}>
              <Image
                source={{ uri: SelectedImageOne?.images.find(img => img.type === viewType)?.imageUrl ??
                "https://dummyimage.com/400/aaaaaa/ffffff&text=No+Image",
                }} 

                style={SelectedImageIndex === 0 ? styles.selectedMultiImage : styles.multiImage}
              />
            </Pressable>
            <View>
                <Text style={styles.dateText}>{ 
                SelectedImageOne ? new Date(SelectedImageOne.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Date ERROR"}
              </Text>

              <View style={styles.KeyValueTextContainer}>
                <Text style={styles.keyText}>Scale Weight: </Text>
                <Text style={styles.valueText}>90.1 kg</Text>
              </View>
            </View>
            
          </View>
              
        {/* Image TWO */}
        <View style={styles.multiImageContainer}>
            <Pressable onPress={() => setSelectedImageIndex(1)}>
              <Image
                source={{ uri: SelectedImageTwo?.images.find(img => img.type === viewType)?.imageUrl ??
                "https://dummyimage.com/400/aaaaaa/ffffff&text=No+Image",
                }} 

                style={SelectedImageIndex === 1 ? styles.selectedMultiImage : styles.multiImage}
              />
            </Pressable>
            <View>
                <Text style={styles.dateText}>{ 
                SelectedImageTwo ? new Date(SelectedImageTwo.date).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "Date ERROR"}
              </Text>

              <View style={styles.KeyValueTextContainer}>
                <Text style={styles.keyText}>Scale Weight: </Text>
                <Text style={styles.valueText}>90.1 kg</Text>
              </View>
            </View>
            
          </View>
        </View>
        
      ) : (
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
      )}

      


      <View style={styles.BottomBar}>
        <ImageCarousel >
          {records.map(record =>
              record.images
                .filter(img => img.type === viewType)
                .map(img => (
                  <Pressable
                    key={img.id}
                    onPress={() => setSelectedImage(record)}
                  >
              <Image
              key={img.id}
              source={{ uri: img.imageUrl }}
              style={styles.carouselImage}
              />
            </Pressable>
            
          )))}
        </ImageCarousel>
        <CompareSettBar Multiview={Multiview} toggleMultiview={toggleMultiview} />
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
  multiImageContainer: {
    flexDirection: "row",
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
    margin: 20
  },
  selectedMultiImage: {
    width: Platform.OS === "web" ? 250 : "55%",
    aspectRatio: 1,
    borderRadius: Platform.OS === "web" ? 15 : 15,
    borderColor: "lightgray",
    borderWidth: Platform.OS === "web" ? 4 : 2,
    margin: Platform.OS === "web" ? 10 : "0%"
  },
  multiImage: {
    width: Platform.OS === "web" ? 250 : "55%",
    aspectRatio: 1,
    borderRadius: Platform.OS === "web" ? 15 : 15,
    borderColor: "transparent",
    borderWidth: Platform.OS === "web" ? 4 : 2,
    margin: Platform.OS === "web" ? 10 : "0%"
  },
  dateText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold"
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
  },
  BottomBar: {
    padding: 10,
  },
  carouselImage: {
    width: 100,
    height: 100,
    margin: 1,
  },
  backArrow: {
  borderRadius: 100,
  backgroundColor: "#333333",
  padding: 5,
  justifyContent: "center",
  alignItems: "center",
},
  backArrowIcon: {
    alignSelf: "center"
  },
  backButton: {
  position: "absolute",
  left: 16,
  top: 16,
  zIndex: 10,
}
});