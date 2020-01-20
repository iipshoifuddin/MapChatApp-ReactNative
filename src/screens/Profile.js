import React, {Component} from 'react';
import {StyleSheet, Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import { SimpleCard, Card } from "@paraboly/react-native-card";
import HamburgerIcon from '../components/HamburgerIcon';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Iconn from 'react-native-vector-icons/MaterialIcons';
import Iconnn from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconnnn from 'react-native-vector-icons/Feather';
const win = Dimensions.get('window');
// import { Container, Tab, Tabs, StyleProvider } from 'native-base'; edit Feather
import firebase from '../auth/firebase'
import { TouchableHighlight } from 'react-native-gesture-handler';
// import Tab3 from './Tab3.js';
// import Tab2 from './Tab2.js';


export class Profile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             photo : '',

        }
    }
    static navigationOptions = () => {
        return {
            headerLeft: <HamburgerIcon/>
        };
    };
    signOut = () => {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
          }, function(error) {
            console.error('Sign Out Error', error);
        });
        this.props.navigation.navigate('Login');
    }
    componentDidMount = () => {
        this.getDataFromStore();
    }
    getDataFromStore = () => {
        const {setState} = this;
        var userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId)
        .once('value')
        .then((snapshot) => {
            var photo = (snapshot.val() && snapshot.val().photo) || 'Anonymous';
            this.setState({photo:photo})
            //console.warn(photo);
        });
    }

    render() {
        
        return (
            <>
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.head}>
                <View style={styles.avatar}>
                    <Image source={{uri: `${this.state.photo}`}} style={styles.images}/>
                </View>
                <View style={styles.identity}>
                    <View style={styles.identity2}>
                        <Text style={{fontWeight:'bold', fontSize : 20}}>Alfatih Timur</Text>
                        <Text>alfatihtimur@gmail.com</Text>
                    </View>
                </View>
                <View style={styles.takePicture}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('UpdateProfile')} >
                        <Iconn name='add-a-photo' size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        <View style={styles.body}>
            <View style={{left:0}}>
                <View style={styles.Mycard}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.cardIcon}>
                            <Icon name='phone' size={30} />
                        </View>
                        <View style={styles.cardTitle}>
                            <Text style={styles.cardText}>0819037734456</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.Mycard}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.cardIcon}>
                            <Iconn name='description' size={30} />
                        </View>
                        <View style={styles.cardTitle}>
                            <Text style={styles.cardText}>0819037734456</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.Mycard}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.buttonEdit}>
                            <Iconnnn name='edit' size={30} /> 
                        </View>
                        <View style={styles.buttonDelete}>
                            <Iconnnn name='delete' size={30} /> 
                        </View>
                    </View>
                </View>
                <View style={styles.Mycard}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.buttonEdit}>
                            <TouchableOpacity onPress={()=>this.signOut()}>
                                <Icon name='logout' size={30} />
                            </TouchableOpacity>
                        </View>
                    </View>
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
    title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    },
    header : {
        width: win.width, 
        height: 80, 
        backgroundColor: 'powderblue'
    },
    body : {
        width: win.width, 
        height: 'auto', 
        backgroundColor: 'steelblue'
    },
    head : {
        flex: 1, 
        flexDirection: 'row', 
        width : win.width,
    },
    avatar : {
        width: 100, 
        height: 70, 
        backgroundColor: 'powderblue', 
        flex :3,
    },
    images : {
        width: 70, 
        height: 70, 
        borderRadius:75, 
        flex : 1,
        top : 5
    },
    identity :{
        width: 100, 
        height: 80, 
        backgroundColor: 'skyblue', 
        flex : 6, 
        justifyContent: 'center'
    },
    identity2 : {
        left : 15
    },
    Mycard : {
        marginTop : 5,
        backgroundColor:'pink', 
        borderWidth:1,
        borderColor :'#000',
        width:win.width, 
        height :45, 
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
    takePicture :{
        width: 100, 
        height: 80, 
        backgroundColor: 'steelblue', 
        flex : 3,
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonEdit : {
        width: 50,  
        backgroundColor: 'powderblue', 
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonDelete : {
        width: 50,  
        backgroundColor: 'skyblue', 
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    buttonLogout : {
        width: 50,  
        backgroundColor: 'skyblue', 
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
 });

 export default Profile