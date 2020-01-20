import React, {Component} from 'react';
import HamburgerIcon from '../components/HamburgerIcon';

// import Counter from '../Components/counter'
import axios from 'axios';

// import connect to connect with redux store
import { connect } from 'react-redux';

// import action
import { getNotes } from '../public/actions/notes'

import {
    Alert,
    View,
    ActivityIndicator,
    StyleSheet,
    FlatList,
    ScrollView, 
    Image,
    TouchableOpacity
} from 'react-native';

import { 
    Container, 
    Header,
    Content, 
    Card, 
    CardItem, 
    Text, 
    Body,
    Icon, 
    Picker, 
    Form, 
    Thumbnail, 
    Button, 
    Left,
    Tab, 
    Tabs
} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import Tab3 from './Tab3.js';
import Tab2 from './Tab2.js';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
            this.state = {
            selected: "key2",
            counter: 0,
            data: []
            };
        }
        onValueChange(value: string) {
            this.setState({
            selected: value
        });
               
    }

    //import Humberger Navigation
    static navigationOptions = () => {
        return {
            title : 'Hiring Channels',
            headerLeft: <HamburgerIcon/>,
            headerStyle: {
                            backgroundColor: "#1E272E",
                            fontColor: "white",
                        },
                headerTintColor: '#F39C12'
            
        };
    };

    handleNavigate = () => {
        const { navigation } = this.props;
        navigation.navigate('Note')
    }

    fetchData = () => {
        this.props.dispatch(getNotes());
    }

    componentDidMount = () => {
        this.fetchData();
    }


// render component for FlatList
renderItem = ({ item }) => (
    <View >
        <Card style={styles.cardHome}>
        <Image source={{uri: "http://34.226.154.250/public/images/${}"}} style={styles.imageCardHome}/>
        <CardItem style={styles.nameCard}>
            <Body>
            <Text style={styles.textNameCard}>Alfatih Timur</Text>
            <Text style={styles.txtSkillCard}>Softwae Developer</Text>  
            </Body>
        </CardItem >
        <CardItem style={styles.gitStarts}>
        <Left>
            <Button transparent textStyle={{color: '#87838B'}}>
            <Icon name="logo-github" />
            <Text>1,926 stars</Text>
            </Button>
        </Left>
        </CardItem>
        </Card>
    </View> 
)



    render() {

        const items = [
    { name: 'TURQUOISE', code: '#1abc9c' },
    { name: 'EMERALD', code: '#2ecc71' },
    { name: 'PETER RIVER', code: '#3498db' },
    { name: 'AMETHYST', code: '#9b59b6' },

];
        return (
            <Container style={{flex:1,flexDirection: 'column'}}>
                    <Grid>
                    <Col style={styles.container}>
                    <Text style={styles.textBanner} > Welcome to hiring app </Text>
                    </Col>
                    </Grid>
                    <Grid>

                    <Picker
                    mode="dropdown"
                    style={styles.girdDropdown}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                    >
                    <Picker.Item label="Name" value="key0" />
                    <Picker.Item label="Skill" value="key1" />
                    <Picker.Item label="Update" value="key2" />
                    </Picker>
                    <Picker
                    mode="dropdown"
                    style={styles.girdDropdownRight}
                    selectedValue={this.state.selected}
                    onValueChange={this.onValueChange.bind(this)}
                    >
                    <Picker.Item label="Upper" value="key0" />
                    <Picker.Item label="Lower" value="key1" />
                    </Picker>


                    </Grid>
                    
    
    
    <Grid> 
    <ScrollView style={styles.scrlViewHome}>

    {/* <SectionGrid
    itemDimension={150}
    // staticDimension={300}
    // fixed
    // spacing={20}
    sections={[
        {
        title: 'Title1',
        data: items.slice(0, 1),
        },
  
    ]}
    style={styles.gridView}
     renderItem={this.renderItem}

     
     
     /> */}

                   {
                    this.props.notes.isLoading ?
                     <ActivityIndicator size="large" color="#00ff00" /> : 
                     this.props.notes.isError ? 
                        <Text>Error, please try again!</Text>
                        :
                        (
                            <FlatList 

                            style={{ flex: 1, margin: 5, backgroundColor: '#ddd', minWidth: {this.itemWidth}, maxWidth: {this.itemWidth}, height: 130}}
                                data={this.props.notes.data} 
                                //keyExtractor={this._keyExtractor} 
                                renderItem={this.renderItem} 
                                // refreshing={} 
                                // onRefresh={}
                            />
                        )
                }



                    </ScrollView>
                    </Grid>
            </Container>
            
        );
    }
    }
    const styles = StyleSheet.create({
    container: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FED330',
    },
    title: {
    height:100,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    },
    textBanner :{
            color: "#F5F6FA",
            position: "absolute",
            width: 583,
            height: 98,
            top : 50,
            left : 5,
            fontFamily: "Open Sans",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 33,
                
        },
        girdDropdown : {
            top : -5,
            bottom :0,
            borderWidth : 1,
            borderColor: '#0000',
        },

        girdDropdownRight : {
            top : -5,
            bottom :0,
            borderWidth : 1,
            borderColor: '#0000'
        },
        
        scrlViewHome : {
            flex : 1,
            top : -120,
            borderWidth : 1,
            height:340,
            borderColor: '#0000'
        },

        cardHome : {
            flex: 1,
            width: 155,
            borderColor:"#FED330",
            borderWidth:3
            
        },
        
        imageCardHome : {
            height: 145, 
            width: 155, 
            flex: 1
        },

        nameCard:{
            height : 80,
        },
        textNameCard:{
            fontSize: 20,
            textAlign: "center",
            fontWeight:"bold"
        },
        txtSkillCard:{
            textAlign: "center"
        },
        gitStarts:{
            top : 0,
            height:50
        },
        gridView: {
            marginTop: 20,
            flex: 1,
        },
        itemContainer: {
            justifyContent: 'flex-end',
            borderRadius: 5,
            padding: 10,
            height: 150,
        },
        itemName: {
            fontSize: 16,
            color: '#fff',
            fontWeight: '600',
        },
        itemCode: {
            fontWeight: '600',
            fontSize: 12,
            color: '#fff',
        },

    });

// map state to props to referring data in store
const mapStateToProps = state => {
    return {
        notes: state.notes
        // auth: state.auth
    }
}

// connect with redux,first param is map and second is component
export default connect(mapStateToProps)(HomeScreen)
