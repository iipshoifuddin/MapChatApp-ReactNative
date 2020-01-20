import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Button, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

import ImagePicker from 'react-native-image-picker';

import { ScrollView } from 'react-native-gesture-handler';
// import Counter from '../Components/counter'
import axios from 'axios';

import AsyncStorage from '@react-native-community/async-storage';
// import connect to connect with redux store
//import { connect } from 'react-redux';
import { SafeAreaView } from 'react-navigation';

import firebase from '../auth/firebase'

// More info on all the options is below in the API Reference... just some common use cases shown here

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'showcase', title: 'Choose Photo from Facebook' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



export class UpdateProfile extends Component {

    constructor(props) {
        super(props);
            this.state = {
            avatarSource : '',
            filename : '',
            uri : '',
            userFileId : '',
        };
                
    }
     //impor
    componentDidMount = () => {
        this.getData();
        
       
    }

    getData = async () => {
        try {
            const value = await AsyncStorage.getItem('userId')
            if(value !== null) {
            // value previously stored
                console.warn('myvalue : '+value);
                this.setState({ userFileId : value});
            }
        } catch(e) {
            // error reading value
        }
    }
    onSubmit = async () =>{
        const response = await fetch(this.state.uri);
        const userId = firebase.auth().currentUser.uid;
        const blob = await response.blob();
        var datenow = new Date();
        //const name = `${userId}-${this.state.name.split(' ').join('-')}`;
        // var refName = firebase.storage().ref().child();
        var ref = firebase
          .storage()
          .ref()
          .child('PhotoProfile/')
          .child(`${userId}-${datenow.getMilliseconds()}`);
    
        return ref.put(blob)
        .then(() => {
            ref.getDownloadURL().then(url => {
                firebase
                .database()
                .ref('users')
                .child(userId)
                .update({
                    photo:url,
                });
              this.props.navigation.navigate('Drawer');
                ToastAndroid.showWithGravityAndOffset(
                    `Photo Success Uploaded !`,
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
              this.setState({isLoad: false});
            });
          })
          .catch(function(error) {
            // Handle error.
                const feedback = error.toString();
                //console.warn(error); error.toString().length
                ToastAndroid.showWithGravityAndOffset(
                    `${feedback.substring(7, feedback.length)}`,
                    ToastAndroid.CENTER,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            });
    }
    
    takeaFoto = async () =>{
            await ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                avatarSource: source,
                filename : response.fileName,
                uri:response.uri,
                //type: response.type
                });
            }
            //console.warn(this.state.avatarFile.type);
            });

    }

        
        render() {





        return (
            <View style={styles.container}>
        <Text style={styles.title}>Blue Screen : </Text>
       <Image source={this.state.avatarSource} style={{flex:1,width:300, height:250}} />
            <Button  color="green" title="Save"  onPress={() => this.onSubmit()}  />
            <Button  color="#eb3b5a" title="Take a Foto"  onPress={() => this.takeaFoto()}  />
            </View>
        );
        }
     }
      const styles = StyleSheet.create({
        container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'skyblue',
        },
        title: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
        }
     });


// connect with redux,first param is map and second is component
export default UpdateProfile