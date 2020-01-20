    import React from 'react';
    import { createAppContainer } from "react-navigation";
    import Icon from 'react-native-vector-icons/AntDesign';
    import Iconn from 'react-native-vector-icons/Entypo';
    import Iconnn from 'react-native-vector-icons/MaterialCommunityIcons';
    import { createBottomTabNavigator } from 'react-navigation-tabs'
    import { createStackNavigator } from 'react-navigation-stack'
    // import GreenScreen from '../screens/GreenScreen'; 
    // import RedScreen from "../screens/RedScreen";
    import HomeScreen from '../screens/Home';
    import ContactsScreen from '../screens/Contact';
    import MapsScreen from '../screens/Maps';
    import ProfileScreen from '../screens/Profile'
    import SearchScreen from '../screens/Search'
    
    const HomeTab = createStackNavigator({
        Home: HomeScreen
    });
    const ContactsTab = createStackNavigator({
        Contacts : ContactsScreen
    });
    const MapsTab = createStackNavigator({
        Maps : MapsScreen
    });
    const ProfileTab = createStackNavigator({
        Profile : ProfileScreen
    });
    const SearchTab = createStackNavigator({
        Search : SearchScreen
    });
    const Tabs = createBottomTabNavigator({
        Chat : HomeTab,
        Search : SearchTab,
        Contacts : ContactsTab,
        Maps : MapsTab,
        Profile : ProfileTab,
        
        // Green: GreenTab,
        // Red: RedTab
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: () => {
                const { routeName } = navigation.state;
                let tabName;
                if(routeName === 'Chat')
                {
                    return <Iconn name='chat' size={25} />
                }
                else if(routeName === 'Contacts')
                {
                    return <Icon name='contacts' size={25} />
                }
                else if(routeName === 'Maps')
                {
                    return <Iconn name='location-pin' size={25} />
                }
                else if(routeName === 'Search')
                {
                    return <Iconnn name='file-search-outline' size={25} />
                }
                else
                {
                    return <Icon name='user' size={20} />
                }
                
            }
        })
    });
    export default createAppContainer(Tabs);