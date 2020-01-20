    import React from 'react';
    import {
     createAppContainer
     
    } from 'react-navigation';
    import { createDrawerNavigator } from 'react-navigation-drawer'
    import { createStackNavigator } from 'react-navigation-stack'
    import { ScrollView } from 'react-native-gesture-handler';
    import { SafeAreaView } from 'react-navigation';
    import { Text } from 'react-native';
    import BlueScreen from './BlueScreen';
    import DefaultScreen from './DefaultScreen';
    import BottomTabs from './BottomTabs';
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
                    header: null,
                },
            },
            BlueScreen: BlueScreen,
            DefaultScreen: {
                screen: DefaultScreen,
            }
        }
     );
    export default createAppContainer(Stack);


