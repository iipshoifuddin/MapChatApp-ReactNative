import React, {Component} from 'react';
import {
  Alert,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
} from 'react-native';
import {
  Form,
  Item,
  Label,
  Input,
  List,
  Thumbnail,
  Left,
  Body,
  Right,
  Button,
  ListItem,
} from 'native-base';
import axios from 'axios';
import _ from 'lodash';

export default class Pokemon extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      result: [],
      loading: false,
      error: false,
      hasSearch: false,
    };

    this.search = _.debounce(this.search, 2000);
  }

  onSearch = searchKey => {
    if (searchKey && searchKey.length > 1) {
      this.setState({hasSearch: true, loading: true, search: searchKey});
      this.search(searchKey);
    }
  };

  search = async searchKey => {
    if (searchKey && searchKey.length > 1) {
      try {
        const response = await axios.get(
          `http://api.tvmaze.com/search/shows?q=${searchKey}`,
        );
        this.setState({result: response.data, loading: false, error: false});
        console.log(response.data);
      } catch (err) {
        this.setState({loading: false, error: true});
        return Alert.alert(
          'Error',
          'Error connecting to the server, please try again later',
          [{text: 'OK'}],
          {
            cancelable: false,
          },
        );
      }
    }
  };

  render() {
    const {loading, error, search, result, hasSearch} = this.state;

    return (
      <View>
        <Form>
          <Item floatingLabel>
            <Label>Search</Label>
            <Input
              onChangeText={text => {
                this.onSearch(text);
              }}
            />
          </Item>
        </Form>
        <View style={styles.seriesContainer}>
          {loading ? (
            <ActivityIndicator color="#DEAA9B" size="large" />
          ) : error ? (
            <Text style={styles.text}>Error, please try again</Text>
          ) : hasSearch && result.length < 1 ? (
            <Text style={styles.text}>
              No series found with keyword "{search}", please try another
              keyword
            </Text>
          ) : (
            <FlatList
              data={result}
              renderItem={({item}) => <Series item={item.show} />}
              keyExtractor={item => item.show.id.toString()}
            />
          )}
        </View>
      </View>
    );
  }
}

const Series = ({item}) => {
  return (
    <List>
      <ListItem thumbnail onPress={() => alert(item.id)}>
        <Left>
          <Thumbnail square source={{uri: item.image.medium}} />
        </Left>
        <Body style={{marginRight: 20}}>
          <Text style={{fontWeight: '600', fontSize: 17, marginBottom: 5}}>
            {item.name}
          </Text>
          <Text note numberOfLines={1}>
            {item.summary}
          </Text>
        </Body>
      </ListItem>
    </List>
  );
};

const styles = StyleSheet.create({
  seriesContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
  },
});
