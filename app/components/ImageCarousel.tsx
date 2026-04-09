import React, { ReactNode, useEffect, useRef } from 'react';
import { ScrollView, Image, StyleSheet, View } from 'react-native';

interface Props {
  children: ReactNode;
  
}

export default function ImageCarousel( {children} : Props) {
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: false });
  }, []);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row' }}
        style={{ height: 120 }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

