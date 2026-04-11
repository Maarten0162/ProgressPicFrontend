import { RecordEntry, ViewType } from '@/app/context/RecordProvider';
import { pickImageFromLibrary } from '@/app/utils/imagePick';
import React from 'react'
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';


interface Props {
    draftRecord: RecordEntry;
    setDraftRecord: (value: RecordEntry) => void;
}

export default function AddRecordImageUploader({draftRecord, setDraftRecord} : Props) {

     const IMAGE_TYPES = [
        { label: "Front", type: "FRONT" },
        { label: "Side", type: "SIDE" },
        { label: "Back", type: "BACK" },
      ] as const;
    
      const pickImage = async (type: ViewType) => {
        const uri = await pickImageFromLibrary();
        if (!uri) return;
    
        const updatedImages = [...draftRecord.images];
    
        const index = updatedImages.findIndex(img => img.type === type);
    
        if (index >= 0) {
          updatedImages[index] = {
            ...updatedImages[index],
            imageUrl: uri,
          };
        } else {
          updatedImages.push({
            type,
            imageUrl: uri,
            isLocal: true,
          } as any);
        }
    
        setDraftRecord({
          ...draftRecord,
          images: updatedImages,
        });
      };
      
  return (
    <View style={styles.squareContainer}>
    
              {IMAGE_TYPES.map((item) => {
                  const image = draftRecord.images.find(img => img.type === item.type);
    
                  return (
                    <View key={item.type} style={styles.square}>
                      <Text style={styles.imageText}>{item.label}</Text>
                      <Pressable onPress={() => pickImage(item.type)}>
                        <View style={styles.imageSquare}>
                          {image?.imageUrl ? (
                            <Image
                              style={styles.image}
                              source={{ uri: image.imageUrl }}
                            />
                          ) : (
                            <Svg fill="none" viewBox="0 0 24 24" id="Accessibility-Fill--Streamline-Rounded-Fill-Material" width="50%" height="50%">
                              <Path fill="#1F1F1F" d="M12.002 5.65c-0.50135 0 -0.93115 -0.1785 -1.2895 -0.5355 -0.35835 -0.357 -0.5375 -0.786165 -0.5375 -1.2875 0 -0.501335 0.1785 -0.931165 0.5355 -1.2895C11.0675 2.179165 11.49665 2 11.998 2c0.50135 0 0.93115 0.1785 1.2895 0.5355 0.35835 0.357 0.5375 0.786165 0.5375 1.2875 0 0.501335 -0.1785 0.931165 -0.5355 1.2895 -0.357 0.35835 -0.78615 0.5375 -1.2875 0.5375ZM9.3 21.25V8.675H3.75c-0.2125 0 -0.390585 -0.07235 -0.53425 -0.217C3.071915 8.3135 3 8.13435 3 7.9205c0 -0.21365 0.071915 -0.39135 0.21575 -0.533 0.143665 -0.14165 0.32175 -0.2125 0.53425 -0.2125h16.5c0.2125 0 0.39065 0.07235 0.5345 0.217 0.14365 0.1445 0.2155 0.32365 0.2155 0.5375 0 0.21365 -0.07185 0.39135 -0.2155 0.533 -0.14385 0.14165 -0.322 0.2125 -0.5345 0.2125H14.7V21.25c0 0.2125 -0.07235 0.3906 -0.217 0.53425 -0.1445 0.14385 -0.32365 0.21575 -0.5375 0.21575 -0.21365 0 -0.39135 -0.0719 -0.533 -0.21575 -0.14165 -0.14365 -0.2125 -0.32175 -0.2125 -0.53425V15.5h-2.4v5.75c0 0.2125 -0.07235 0.3906 -0.217 0.53425 -0.1445 0.14385 -0.32365 0.21575 -0.5375 0.21575 -0.21365 0 -0.39135 -0.0719 -0.533 -0.21575 -0.14165 -0.14365 -0.2125 -0.32175 -0.2125 -0.53425Z" strokeWidth="0.5"></Path>
                            </Svg>
                          )}
                        </View>
                      </Pressable>
                      
                    </View>
                  );
                })
              }
            </View>
  )
}

const styles = StyleSheet.create({
  containter: {
    justifyContent: "space-between"
  },
  squareContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  square: {
    backgroundColor: "transparent",
    borderRadius: 15,
    width: "15%",
    aspectRatio: 1/1,
  },
  imageSquare: {
    backgroundColor: "transparent",
    borderRadius: 15,
    borderColor: "#080808",
    borderWidth: 2,
    aspectRatio: 1/1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    overflow: "hidden"

  },
  imageText :{
    color: "white",
    alignSelf: "center",
    marginBottom: 5
  },
  image: {
    width: "100%",
    aspectRatio: 1/1,
  }
})