import React from 'react';
import { AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from '../auth/firebase';
export class MyChat extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
            uid : '',
            messages: [],
            avatar : '',
            name : '',
        }
    }

    componentDidMount() {
    //const uid = firebase.auth().currentUser.uid;
    //this.setState({uid});
        this.setData();
        this.getDataFromStore();
    }

    setData = async () => {
        try {
            const value = await AsyncStorage.getItem('uid')
            
            if(value !== null) {
            // value previously stored
                this.setState({uid : value});
                //console.warn('accept :'+value);
                
                await firebase.database().ref(`/users/${value}`)
                .once('value')
                .then((snapshot) => {
                    var nameOnDB = (snapshot.val() && snapshot.val().name) || 'Anonymous';
                    var photoOnDB = (snapshot.val() && snapshot.val().photo) || 'Anonymous';
                    this.setState({
                        name : nameOnDB,
                        avatar : photoOnDB,
                    });
                });
            }
        } catch(e) {
            // error reading value
            //console.warn(e);
        }
    }

    getDataFromStore = () => {
    //const {setState} = this;
    //ar userId = firebase.auth().currentUser.uid;
        //console.warn(this.props.navigation.state.params.idroom);
        firebase.database().ref(`/chat/${this.props.navigation.state.params.idroom}`)
        .orderByChild('createdAt')
        .once('value')
        .then((snapshot) => {
            let messages = [];
            let a=0;
            snapshot.forEach(el => {
                messages[a] = {
                    text: el.val().text,
                    createdAt:el.val().createdAt,
                        user: {
                            _id: el.val().userid,
                            name: el.val().name,
                            avatar: el.val().avatar,
                        },
                    }     
                a++;               
            })    
            //console.warn(messages)
            messages.reverse();
            this.setState({messages : messages});
        });
    }

    onShow(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }))
    }
    onSend(messages = [])
    {
        
        //console.warn(messages);
        firebase.database()
        .ref(`/chat/${this.props.navigation.state.params.idroom}`)
        .push({
            avatar:this.state.avatar,
            createdAt:`${new Date()}`,
            name:this.state.name,
            text:`${messages[0].text}`,
            userid: this.state.uid,
        });

        //reload function
        this.getDataFromStore();
    }

  render() {
      
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.uid,
        }}
      />
    )
  }
}

export default MyChat