import React, { ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ListItem from './ListItem'

interface Props {
  children: ReactNode;
}

export default function ListContainer({ children }: Props) {
  return (
    <View>

        <Text style={styles.Text}>Month Year</Text>
        
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    Text: {
        fontWeight: "bold",
        fontSize: 24,
        color: "white",
        marginBottom: 25
    }
})