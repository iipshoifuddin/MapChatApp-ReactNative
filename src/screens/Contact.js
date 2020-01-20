import React, {Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Dimensions, Image} from 'react-native';
import HamburgerIcon from '../components/HamburgerIcon';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import { Container, Tab, Tabs, StyleProvider } from 'native-base';
import firebase from '../auth/firebase'
const win = Dimensions.get('window');
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
                <View>               
                    <View style={styles.Mycard}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.cardIcon}>
                            <Image source={{uri: `defaul.jpg`}} style={styles.images}/>
                        </View>
                        <View style={styles.cardTitle}>
                            <Text style={styles.cardText}>0819037734456</Text>
                        </View>
                    </View>
                </View>
                </View>
            </>
        );
    }
 }
 const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: 'column'
    },
    Mycard : {
        marginTop : 5,
        backgroundColor:'pink', 
        borderWidth:1,
        borderColor :'#000',
        width:win.width, 
        height :70, 
        elevation: 8,
        shadowOpacity: 12,
        shadowRadius: 4.65,
        shadowColor: "#000", 
        shadowOffset:{
            width: 0,
            height: 4,
            }, 
    },
    cardIcon : {
        width: 50,  
        backgroundColor: 'powderblue', 
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    cardTitle : {
        width: 50,  
        backgroundColor: 'skyblue', 
        flex : 6,
        justifyContent : 'center',
        alignItems : 'flex-start'
    },
    cardText : {
        fontSize : 18,
        marginLeft: 10,
    },

 });