import React, { ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ListItem from './ListItem'

interface Props {
  children: ReactNode;
  date: Date;
}

export default function ListContainer({ children, date }: Props) {
  return (
    <View>

        <Text style={styles.Text}>{date.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</Text>
        
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