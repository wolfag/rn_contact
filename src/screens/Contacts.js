/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

import { fetchContacts } from "../utils/api";
import { ROUTES } from "../common";
import colors from "../utils/colors";
import store from "../store";

import ContactListItem from "../components/ContactListItem";

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends React.Component {
  static navigationOptions = ({ navigation, navigation: { navigate } }) => ({
    title: "Contacts",
    headerLeft: (
      <Icon
        name="menu"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => navigation.toggleDrawer()}
      />
    ),
    headerRight: (
      <Icon
        name="settings"
        size={24}
        style={{ color: "white", marginRight: 10 }}
        onPress={() => navigate(ROUTES.Options)}
      />
    )
  });

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().isFetchingContacts,
    error: store.getState().error
  };

  async componentDidMount() {
    this.unsubscribe = store.onChange(() =>
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error
      })
    );

    const contacts = await fetchContacts();
    store.setState({ contacts, isFetchingContacts: false });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    const {
      navigation: { navigate }
    } = this.props;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigate(ROUTES.Profile, { contact: item })}
      />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;
    const contactsSorted = contacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={this.renderContact}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1
  }
});
