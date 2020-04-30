import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import { View, Platform } from 'react-native';
import { createStackNavigator, } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';

const MenuNavigator = createStackNavigator({
    DishDetail: {screen: DishDetail},
    Menu: {screen: Menu}
    },
    {
        initialRouteName: 'Menu',
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"            
            },
            headerTintColor: "#fff"  
          })
    }
)

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }
  }, {
    defaultNavigationOptions: ({ navigation }) => ({
      headerStyle: {
          backgroundColor: "#512DA8"
      },
      headerTitleStyle: {
          color: "#fff"            
      },
      headerTintColor: "#fff"  
    })
});

const ContactNavigator = createStackNavigator({
    Contact: {screen: Contact}
    }, {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"            
            },
            headerTintColor: "#fff"  
          })
    }
)

const AboutNavigator = createStackNavigator({
    About: {screen: About}
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"            
            },
            headerTintColor: "#fff"  
        })
    }
)

const MainNavigator = createDrawerNavigator({
    Home: 
      { screen: HomeNavigator,
        navigationOptions: {
          title: 'Home',
          drawerLabel: 'Home'
        }
      },
      About:
    {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us'
        }
    },
    Menu: 
      { screen: MenuNavigator,
        navigationOptions: {
          title: 'Menu',
          drawerLabel: 'Menu'
        }, 
      },
    Contact: 
    {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us'
        }
    }
}, {
  drawerBackgroundColor: '#D1C4E9'
});

const App = createAppContainer(MainNavigator);

class Main extends Component {

    render() {
        return (
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <App />
            </View>
        );
    }
}

export default Main;