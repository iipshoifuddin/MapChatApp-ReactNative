import React, {Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Dimensions, Image,  AsyncStorage, FlatList, SafeAreaView} from 'react-native';
import HamburgerIcon from '../components/HamburgerIcon';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Iconn from 'react-native-vector-icons/Ionicons';
// import { Container, Tab, Tabs, StyleProvider } from 'native-base';
import firebase from '../auth/firebase'
const win = Dimensions.get('window');
// import Tab3 from './Tab3.js';
// import Tab2 from './Tab2.js';
import ListSearch from './ListSearch'


export class Search extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            uid : '',
            roomchat: [],
            avatar : '',
            name : '',
            users: [],
        }
    }
    static navigationOptions = () => {
        return {
            headerLeft: <HamburgerIcon/>
        };
    };
    componentDidMount = () =>{
        // this.getRoomChat();
        this.onShow();
    }

    // getRoomChat = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('uid')
            
    //         if(value !== null) {
    //         // value previously stored
    //         //console.warn(value);
    //             this.setState({uid : value});
    //             //console.warn('accept :'+value);
                    
     
    //         }
    //     } catch(e) {
    //         // error reading value
    //         //console.warn(e);
    //     }
    // }

    onShow = async () => {
        await firebase.database().ref(`users`)
        //.orderByChild('idsender')
        //.equalTo(value)
        .on('child_added', snap => {
            const user = snap.val()
            user.uid = snap.key
            this.setState(prev => {
                return {
                    users: [...prev.users, user]
                }     
            })
            })
       
    }



    render() {
        const { idroom } = this.state.roomchat;
        
        //console.warn(this.state.roomchat);
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <FlatList
                        data={this.state.users}
                        renderItem={({item}) => <ListSearch item={item} />}
                        keyExtractor={item => item.uid}
                    />
                </SafeAreaView>
            </>
        );
    }
 }
 const styles = StyleSheet.create({
    container: {
        flex: 1, 
        
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
    images : {
        flex : 1,
        width : 50,
        height : 50,
    }

 });

 export default Search
