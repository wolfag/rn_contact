import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/dist/MaterialIcons";

import { fetchContacts } from "../utils/api";

import ContactThumbnail from "../components/ContactThumbnail";
import { ROUTES } from "../common";
import colors from "../utils/colors";
import store from "../store";

const keyExtractor = ({ phone }) => phone;

export default class Favorites extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Favorites",
    headerLeft: (
      <Icon
        name="menu"
        size={24}
        style={{ color: colors.black, marginLeft: 10 }}
        onPress={() => navigation.toggleDrawer()}
      />
    )
  });

  state = {
    contacts: store.getState().contacts,
    loading: store.getState().siFetchingContacts,
    error: store.getState().error
  };

  async componentDidMount() {
    const { contacts } = this.state;
    this.unsubscribe = store.onChange(() =>
      this.setState({
        contacts: store.getState().contacts,
        loading: store.getState().siFetchingContacts,
        error: store.getState().error
      })
    );
    if (contacts.length === 0) {
      const fetchContacts = await fetchContacts();
      store.setState({
        contacts: fetchContacts,
        siFetchingContacts: false
      });
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  renderFavoriteThumbnail = ({ item }) => {
    const {
      navigation: { navigate }
    } = this.props;
    const { avatar } = item;

    return (
      <ContactThumbnail
        avatar={avatar}
        onPress={() => navigate(ROUTES.Profile, { contact: item })}
      />
    );
  };

  render() {
    const { loading, contacts, error } = this.state;
    const favorites = contacts.filter(contact => contact.favorite);

    return (
      <View style={styles.container}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text>Error...</Text>}

        {!loading && !error && (
          <FlatList
            data={favorites}
            keyExtractor={keyExtractor}
            numColumns={3}
            contentContainerStyle={styles.list}
            renderItem={this.renderFavoriteThumbnail}
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
  },
  list: {
    alignItems: "center"
  }
});
