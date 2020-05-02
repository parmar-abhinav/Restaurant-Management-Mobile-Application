import React, { Component } from 'react';
import Menu from './MenuComponent';
import { DISHES } from '../shared/dishes';
import DishDetail from './DishDetailComponent';
import { View, Platform, Image, StyleSheet, ScrollView, Text } from 'react-native';
import { createStackNavigator, } from 'react-navigation-stack';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Icon } from 'react-native-elements';
import Reservation from './ReservationComponent';
import { connect } from 'react-redux';
import Login from './LoginComponent';
import Favorites from './FavoriteComponent';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
})



const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{ flex: 1 }}>
                    <Image source={require('./images/logo.png')} style={styles.drawerImage} />
                </View>
                <View style={{ flex: 2 }}>
                    <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                </View>
            </View>
            <>
                <DrawerItems {...props} />
            </>
        </SafeAreaView>
    </ScrollView>
)

const LoginNavigator = createStackNavigator({
    Login: { screen: Login }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: <Icon name="menu" size={24}
            iconStyle={{ color: 'white' }}
            onPress={() => navigation.toggleDrawer()} />
    })
});

const FavoritesNavigator = createStackNavigator({
    DishDetail: { screen: DishDetail },
    Favorites: {
        screen: Favorites,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
        })
    }
},
    {
        initialRouteName: 'Favorites',
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

const MenuNavigator = createStackNavigator({
    DishDetail: { screen: DishDetail },
    Menu: {
        screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
        })
    }
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
        headerTintColor: "#fff",
        headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: () => <Icon name="menu" size={24}
            iconStyle={{ color: 'white' }}
            onPress={() => navigation.navigate('DrawerToggle')} />
    })
})

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: "#512DA8"
        },
        headerTitleStyle: {
            color: "#fff"
        },
        headerTintColor: "#fff",
        headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
    })
}
)

const AboutNavigator = createStackNavigator({
    About: { screen: About }
},
    {
        defaultNavigationOptions: ({ navigation }) => ({
            headerStyle: {
                backgroundColor: "#512DA8"
            },
            headerTitleStyle: {
                color: "#fff"
            },
            headerTintColor: "#fff",
            headerLeft: () => <Icon name="menu" size={24} color="white" onPress={() => navigation.toggleDrawer()} />
        })
    }
)

const MainNavigator = createDrawerNavigator({
    Login:
    {
        screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='sign-in'
                    type='font-awesome'
                    size={24}
                    iconStyle={{ color: tintColor }}
                />
            ),
        }
    },
    Home:
    {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="home"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    About:
    {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="info-circle"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                />
            )
        }
    },
    Menu:
    {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="list"
                    type="font-awesome"
                    size={24}
                    color={tintColor}
                />
            )
        },
    },
    Contact:
    {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name="address-card"
                    type="font-awesome"
                    size={22}
                    color={tintColor}
                />
            )
        }
    },
    Favorites:
    {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='heart'
                    type='font-awesome'
                    size={24}
                    iconStyle={{ color: tintColor }}
                />
            ),
        }
    },
    Reservation:
    {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor, focused }) => (
                <Icon
                    name='cutlery'
                    type='font-awesome'
                    size={24}
                    iconStyle={{ color: tintColor }}
                />
            ),
        }
    }
}, {
    initialRouteName: 'Home',
    drawerBackgroundColor: '#D1C4E9',
    contentComponent: CustomDrawerContentComponent
});

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#512DA8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

const App = createAppContainer(MainNavigator);

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {
        return (
            <SafeAreaProvider>
                <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                    <App />
                </View>
            </SafeAreaProvider>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);