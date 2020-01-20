import React, {Component} from 'react';
import {StyleSheet, Text, View,TouchableOpacity, Dimensions, Image,  AsyncStorage} from 'react-native';
import HamburgerIcon from '../components/HamburgerIcon';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
// import { Container, Tab, Tabs, StyleProvider } from 'native-base';
import firebase from '../auth/firebase'
const win = Dimensions.get('window');
// import Tab3 from './Tab3.js';
// import Tab2 from './Tab2.js';



export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            uid : '',
            roomchat: [],
            avatar : '',
            name : '',
        }
    }
    static navigationOptions = () => {
        return {
            headerLeft: <HamburgerIcon/>
        };
    };
    componentDidMount = () =>{
        this.getRoomChat();
    }

    getRoomChat = async () => {
        try {
            const value = await AsyncStorage.getItem('uid')
            
            if(value !== null) {
            // value previously stored
            //console.warn(value);
                this.setState({uid : value});
                //console.warn('accept :'+value);
                    
                await firebase.database().ref(`/roomchat/`)
                .orderByChild('idsender')
                .equalTo(value)
                .once('value')
                .then((snapshot) => {
                   const data=[];
                   let a=0;
                    snapshot.forEach(el => {
                        //console.warn(el);
                        data[a]=el;
                        a++;
                    });
                    //console.warn(data);
                    this.setState({ roomchat : data });
                });
            }
        } catch(e) {
            // error reading value
            //console.warn(e);
        }
    }
    


    render() {
        const { idroom } = this.state.roomchat;
        
        //console.warn(this.state.roomchat);
        return (
            <>
                <View>  
                {this.state.roomchat.map(item =>
                {   
                    //console.warn(item.val().photo);
                    return(            
                    <TouchableOpacity onPress={()=>
                        this.props.navigation.navigate('MyChat', {
                            idroom : item.val().idroom
                          })
                    }>
                    <View style={styles.Mycard}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.cardIcon}>
                            <Image source={{uri: `${item.val().photo}`}} style={styles.images}/>
                        </View>
                            <View style={styles.cardTitle}>
                                <View style={{ width:win.width, height: 50, backgroundColor: 'powderblue', flex:1}}>
                                    <Text style={styles.cardText}>{item.val().name}</Text>
                                </View>
                                <View style={{ width:win.width, height: 50, backgroundColor: 'skyblue', flex:1}} >
                                
                                </View>
                            </View>
                        </View>
                    </View>
                    </TouchableOpacity>
                      )
                })}   
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
    images : {
        flex : 1,
        width : 50,
        height : 50,
    }

 });

 export default Home
