    import React from 'react';
    import { createAppContainer } from "react-navigation";
    import Icon from 'react-native-vector-icons/SimpleLineIcons';
    import { createBottomTabNavigator } from 'react-navigation-tabs'
     import { createStackNavigator } from 'react-navigation-stack'
    import GreenScreen from "./GreenScreen";
    import RedScreen from "./RedScreen";
    const GreenTab = createStackNavigator({
        Green: GreenScreen
    });
    const RedTab = createStackNavigator({
        Red: RedScreen
    });
    const Tabs = createBottomTabNavigator({
        Green: GreenTab,
        Red: RedTab
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: () => {
                const { routeName } = navigation.state;
                let tabName;
                tabName = routeName === 'Green' ? 'home' : 'grid';
                return <Icon name={tabName} size={20} />
            }
        })
    });
    export default createAppContainer(Tabs);