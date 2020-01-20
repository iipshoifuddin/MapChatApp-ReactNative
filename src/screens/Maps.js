import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import HamburgerIcon from '../components/HamburgerIcon';
// import { Container, Tab, Tabs, StyleProvider } from 'native-base';
import firebase from '../auth/firebase'
// import Tab3 from './Tab3.js';
// import Tab2 from './Tab2.js';


export default class GreenScreen extends Component {
    static navigationOptions = () => {
        return {
            headerLeft: <HamburgerIcon/>
        };
    };
    render() {
        return (
            <>
                <View><Text>Map page</Text></View>
            </>
        );
    }
 }
  const styles = StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    },
    title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    }
 });