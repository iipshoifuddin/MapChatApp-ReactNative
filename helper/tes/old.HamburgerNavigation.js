    import {
     createAppContainer
    } from 'react-navigation';
    import {createDrawerNavigator} from 'react-navigation-drawer'
    import BlueScreen from './BlueScreen';
    import DefaultScreen from './DefaultScreen';
    const HamburgerNavigation = createDrawerNavigator(
        {
            BlueScreen: BlueScreen,
            DefaultScreen: {
                screen: DefaultScreen,
            }
        },
        {
            initialRouteName: "DefaultScreen",
            
            
        }
     );
    export default createAppContainer(HamburgerNavigation);