    import React from 'react';
    import { Text, TouchableHighlight } from 'react-native';
    import {
     createAppContainer
     
    } from 'react-navigation';
    import { createDrawerNavigator } from 'react-navigation-drawer'
    import { createStackNavigator } from 'react-navigation-stack'
    import { ScrollView } from 'react-native-gesture-handler';
    import { SafeAreaView } from 'react-navigation';
    
    import BlueScreen from '../screens/BlueScreen';
    import DefaultScreen from '../screens/DefaultScreen';
    import BottomTabs from './BottomTabs';
    import Login from '../screens/Login';
    import Register from '../screens/Register';
    import UpdateProfile from '../screens/UpdateProfile';
    import MyChat from '../screens/MyChat';
    const HamburgerNavigation = createDrawerNavigator(
        {
            Tabs: BottomTabs,
        },
        {
            initialRouteName: 'Tabs',
            contentComponent: props => {
                return (
                    <ScrollView>
                        <SafeAreaView
                        forceInset={{ top: 'always', horizontal: 'never' }}
                    >
                        <Text
                            onPress={() => {
                            props.navigation.navigate('BlueScreen');
                            props.navigation.closeDrawer();
                            }}
                        >
                            BlueScreen
                        </Text>
                        <Text
                            onPress={() => {
                            props.navigation.navigate('DefaultScreen');
                            props.navigation.closeDrawer();
                            }}
                        >
                            DefaultScreen
                        </Text>
                        </SafeAreaView>
                    </ScrollView>
                )
            }
        }
     );
     const Stack = createStackNavigator(
        {
            Drawer: {
                screen: HamburgerNavigation,
                navigationOptions: {
                    headerShown: false,
                },
            },
            Login: {
                screen: Login,
                navigationOptions: {
                    headerShown: false,
                },
            },
            Register: {
                screen: Register,
                navigationOptions: {
                    headerShown: false,
                },
            },
            BlueScreen: BlueScreen,
            UpdateProfile,
            MyChat,
            DefaultScreen: {
                screen: DefaultScreen,
            }
        },
        {
            //headerMode: 'none',
                 
            //initialRouteName: 'Login',
            initialRouteName: 'Drawer',
            //initialRouteName : 'MyChat',
            
        }
     );
    export default createAppContainer(Stack);


