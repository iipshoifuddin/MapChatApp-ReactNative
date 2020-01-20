import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Button, 
    Alert, TouchableOpacity, ToastAndroid} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import firebase from '../auth/firebase'

export class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             name : '',
             email : '',
             password : '',
        }
   
    }

    onSubmit = async () => {
        const { name, email } = this.state;
        await firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((result) => {
            const userId = firebase.auth().currentUser.uid;
            firebase.database()
            .ref('users/' + userId)
            .set({
                name,
                email,
                photo:'default.jpg',
                phone:'',
                description:'',
            });
            ToastAndroid.showWithGravityAndOffset(`Registered Successfully !`,
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50,
            );
            firebase.auth().signOut().then(function() {
                console.log('Signed Out');
              }, function(error) {
                console.error('Sign Out Error', error);
              });
            this.props.navigation.navigate('Login');
        })
        .catch((error) => {
            // Handle Errors here.
            var errorCode = error.code;
            // var errorMessage = error.message;
            const feedback = error.toString();
            if (errorCode === 'auth/weak-password') {
                ToastAndroid.showWithGravityAndOffset(
                    `${feedback.substring(7, feedback.length)}`,
                    ToastAndroid.CENTER,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    `${feedback.substring(7, feedback.length)}`,
                    ToastAndroid.CENTER,
                    ToastAndroid.BOTTOM,
                    25,
                    50,
                );
            }
            //console.log(error);
        });
    }

    render() {       
        return (
            <View style={styles.container}> 
                <Text style={styles.titleLogin}>Register</Text>
                <View style={styles.boxInput}>
                        <Text style={styles.label} >Full Name</Text>
                        <TextInput style={styles.input} 
                            onChangeText={(name) =>this.setState({name})}/>

                        <Text style={styles.label} >E - mail</Text>
                        <TextInput style={styles.input} 
                            onChangeText={(email) =>this.setState({email})}/>

                        <Text style={styles.label}>Password</Text>
                        <TextInput secureTextEntry={true} style={styles.input} 
                            onChangeText={(password) =>this.setState({password})} />
                        <View style={styles.buttonLogin}>
                            <Button  color="#B32442" title="Register" onPress={() => this.onSubmit()} />
                        </View>

                        <View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.registerButton} >
                                <Text style={styles.registerButtonText}>Login</Text>
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
        marginTop: 15,

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
export default Register
