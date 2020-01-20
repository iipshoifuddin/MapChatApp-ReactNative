import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity, 
    Dimensions, 
    AsyncStorage,
    Image} from 'react-native';
import HamburgerIcon from '../components/HamburgerIcon';
import Icon from 'react-native-vector-icons/Entypo';
// import { Container, Tab, Tabs, StyleProvider } from 'native-base';
import firebase from '../auth/firebase'
const win = Dimensions.get('window');
// import Tab3 from './Tab3.js';
// import Tab2 from './Tab2.js';


export default class GreenScreen extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            ifSame : false,
            uid : '',
        }
    }

    componentDidMount = () => {
        //this.getUID();
    }
    getUID = async () => {
        try {
            const value = await AsyncStorage.getItem('uid')
            
            if(value !== null) {
            // value previously stored
            //console.warn(value);
                this.setState({uid : value});
                console.warn('accept :'+value);
            }
        } catch(e) {
            // error reading value
            //console.warn(e);
        }
    }

    onSubmit = (item,idreceiver) =>{
        this.getUID()
        console.warn(this.state.uid);

        var cek =  firebase.database().ref('/roomchat/')
            .orderByChild('idreceiver')
            .equalTo('6AoxVmqH8iO79DeqWduXtJSMRX82')
            .once('value')
            .then((snapshot)=>{
                const data=[];
                   let a=0;
                    snapshot.forEach(el => {
                        //console.warn(el);
                        data[a]=el;
                        a++;
                    });
                //console.warn(data);
                if(idreceiver===data[0].val().idreceiver){
                  console.warn('contact has alredy');  
                }
            });


        // firebase.database()
        // .ref(`/chat/${this.props.navigation.state.params.idroom}`)
        // .push({
        //     avatar:this.state.avatar,
        //     createdAt:`${new Date()}`,
        //     name:this.state.name,
        //     text:`${messages[0].text}`,
        //     userid: this.state.uid,
        // });

    }

    render() {
        return (
            <>
                <View>              
                    <View style={styles.Mycard}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.cardIcon}>
                                <Image source={{uri: `${this.props.item.photo}`}} style={styles.images}/>
                            </View>
                            <View style={styles.cardTitle}>
                                <View style={{ width:win.width, height: 50, backgroundColor: 'powderblue', flex:1}}>
                                        <Text style={styles.cardText}>{this.props.item.name}</Text>
                                </View>
                                <View style={{ width:win.width, height: 50, backgroundColor: 'skyblue', flex:1}} >
                                    
                                </View>
                            </View>
                            <View style={styles.cardIcon}>
                                <TouchableOpacity disabled={this.state.ifSame}
                                    onPress={()=>this.onSubmit(this.props.item,this.props.item.uid)}> 
                                    <Icon name='add-user' size={25} />
                                </TouchableOpacity> 
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
    images : {
        flex : 1,
        width : 50,
        height : 50,
    }

 });