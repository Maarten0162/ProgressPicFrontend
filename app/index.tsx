import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet, Button } from 'react-native';
import Header from './components/header';
import ListItem from './components/ListItem';
import ListContainer from './components/ListContainer';

export default function Index() {
    
  return (
    <View>
        <Header></Header>
        <View style={styles.Container}>
            <ListContainer>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
                <ListItem></ListItem>
            </ListContainer>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    Container: {
        padding: 20
    }
})
