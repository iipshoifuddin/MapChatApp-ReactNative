import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, 
    Button, Alert, TouchableOpacity, ToastAndroid, AsyncStorage } from 'react-native';
import axios from 'axios';
import { SafeAreaView, withNavigation } from 'react-navigation';
import firebase from '../auth/firebase'

export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email : '',
             password : '',
             isemailvalid : '',
             ispasswordValidate : '',
             isLoading : false, 
             stausLogin : ''
        }
    }
    componentDidMount = () => {
        this.ifCurrentUser();
        this.getUIDFromStore();
        
    }
    ifCurrentUser = () => {
        const userId = firebase.auth().currentUser;
        const { navigation } = this.props;
        console.warn(userId);
        
        if (userId===null) {
            navigation.navigate('Login')
        } else {
            navigation.navigate('Drawer')
        }
       
    }
    getUIDFromStore = async () => {
        try {
            const value = await AsyncStorage.getItem('uid')
            if(value !== null) {
            // value previously stored
                console.warn('accept :'+value);
            }
        } catch(e) {
            // error reading value
            console.warn(e);
        }
    }
    onSubmit = async () => {
        //console.warn(firebase);
      
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(async (result) => {
            const getUID = firebase.auth().currentUser.uid;
            
            try {
                await AsyncStorage.setItem('uid', `${getUID}`);
            } catch (error) {
                // Error saving data
            }
           
            //console.warn(firebase.auth().currentUser.uid);
            this.props.navigation.navigate('Drawer')
            
            
        // result.user.tenantId should be ‘TENANT_PROJECT_ID’.
        }).catch(function(error) {
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

    render() {
        
        //Alert.alert(this.props.users.token);
        return (
            <View style={styles.container}> 
                <Text style={styles.titleLogin}>{this.state.stausLogin}Login</Text>
                <View style={styles.boxInput}>
                        <Text style={styles.label} >Username</Text>
                        <TextInput style={styles.input} 
                            onChangeText={(email) =>this.setState({email})}/>
                        <Text style={styles.label}>Password</Text>
                        <TextInput secureTextEntry={true} style={styles.input} 
                            onChangeText={(password) =>{this.setState({password});this.setState({isLoading:true})}} />
                        <View style={styles.buttonLogin}>
                            <Button  color="#B32442" title="Login" onPress={() => this.onSubmit()} />
                        </View>
                        <View>
                            <Text style={styles.registerLabel}>New User ? </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.registerButton} >
                                <Text style={styles.registerButtonText}>Create an account</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {

        flex: 1,
        alignItems: 'center',
        backgroundColor: '#760933',
    },
    titleLogin : {
        fontSize : 25,
        color : '#042A38',
        fontWeight: 'bold',
        marginTop : 50,


    },
    boxInput : {
        marginTop: 50,

    },
    input : {
        marginTop: 10,
        backgroundColor:'white',
        width : 250,
        borderRadius : 15,
        fontSize : 18,


    },
    label : {
        fontSize : 16,
        color : 'grey',
        marginTop :20
    },
    buttonLogin : {
        marginTop: 20,
        backgroundColor : "#760933"
    },
    registerLabel : {
        marginTop: 20,
        backgroundColor : "#760933",
        top : 20,
        alignItems : 'center',
        textAlign : 'center',
        fontSize : 16,
        fontWeight: 'bold',
        color : '#042A38',
    },
    registerButton : {
        marginTop: 5,
        top : 20,
        alignItems : 'center',
        textAlign : 'center',
        
        
    },
    registerButtonText : {

        fontSize : 16,
        fontWeight: 'bold',
        color : '#932442',
    },
    errorvalidate : {
        fontSize : 12,
        color : 'red',
        marginTop :5,
        marginBottom: 0,
    }
})



// connect with redux,first param is map and second is component
export default Login
