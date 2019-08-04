import React from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator,
  createDrawerNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

import colors from "./src/utils/colors";

import { ROUTES } from "./src/common";

import Contacts from "./src/screens/Contacts";
import Profile from "./src/screens/Profile";
import Favorites from "./src/screens/Favorites";
import User from "./src/screens/User";
import Options from "./src/screens/Options";

const getIcon = icon => ({ tintColor }) => (
  <Icon name={icon} size={26} style={{ color: tintColor }} />
);

const ContactStack = createStackNavigator(
  {
    [ROUTES.Contacts]: {
      screen: Contacts
    },
    [ROUTES.Profile]: {
      screen: Profile
    }
  },
  {
    initialRouteName: ROUTES.Contacts,
    navigationOptions: {
      drawerIcon: getIcon("list")
      // tabBarIcon: getIcon("list")
    }
  }
);

const FavoritesStack = createStackNavigator(
  {
    [ROUTES.Favorites]: {
      screen: Favorites
    },
    [ROUTES.Profile]: {
      screen: Profile
    }
  },
  {
    initialRouteName: ROUTES.Favorites,
    navigationOptions: {
      drawerIcon: getIcon("star")
      // tabBarIcon: getIcon("star")
    }
  }
);

const UserStack = createStackNavigator(
  {
    [ROUTES.User]: {
      screen: User
    },
    [ROUTES.Options]: {
      screen: Options
    }
  },
  {
    mode: "modal",
    initialRouteName: ROUTES.User,
    navigationOptions: {
      drawerIcon: getIcon("person")
      // tabBarIcon: getIcon("person")
    }
  }
);

const tabs = createBottomTabNavigator(
  {
    [ROUTES.Contacts]: {
      screen: ContactStack
    },
    [ROUTES.Favorites]: {
      screen: FavoritesStack
    },
    [ROUTES.User]: {
      screen: UserStack
    }
  },
  {
    initialRouteName: ROUTES.Contacts,
    tabBarOptions: {
      style: {
        backgroundColor: colors.greyLight
      },
      showLabel: false,
      showIcon: true,
      activeTintColor: colors.blue,
      inactiveTintColor: colors.greyDark
    }
  }
);

const drawer = createDrawerNavigator(
  {
    [ROUTES.Contacts]: {
      screen: ContactStack
    },
    [ROUTES.Favorites]: {
      screen: FavoritesStack
    },
    [ROUTES.User]: {
      screen: UserStack
    }
  },
  {
    initialRouteName: ROUTES.Contacts
  }
);

const AppNavigation = createAppContainer(drawer);

export default AppNavigation;
