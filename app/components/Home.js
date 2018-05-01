/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  View,
  ToastAndroid,
  FlatList
} from 'react-native';
import moment from 'moment';


import {Header, Container, Content, Card, Body, Title, CardItem, Text, Thumbnail, Left, Right, Icon,
  List,
  ListItem
} from 'native-base'
//type Props = {};



//moment functions to dynamically get the date and time
const date = moment().format('dddd, MMMM Do YYYY');
const time = moment().format('h:mm');


//set timeout function to show the toast
// const showT = setTimeout(() => {
//   ToastAndroid.show(`The date today is ${date} and its ${time}`, ToastAndroid.LONG);
// }, 1000);

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['Hip-Hop', 'Country', 'Indie', 'Rock', 'Pop', 'House', 'Dance', 'Soul', 'RnB', 'Blues', 'Gospel'],
      name: ['Migos', 'Johnny Rex', 'Passenger', 'Bebe Rexha'],
      icons: ['data:image/png;base64,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','data:image/png;base64,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']
    };

  }
  
  //show toast that displays the date and time when the component mounts

  // componentDidMount() {
  //   showT
  // }

  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Body>
            <Title style={styles.header}>
              Menu
            </Title>
          </Body>
        </Header>
        <Content>
        <List>
          <FlatList
            data={this.state.categories}
            keyExtractor={x => x}
            renderItem={({x}) => (
              <ListItem>
                  <Card >
                  <CardItem>
                  <Left>
                    <Thumbnail source={{uri: 'data:image/png;base64,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'}}/>
                  </Left>
                  </CardItem>
                  <CardItem header>
                    <Body>
                    <Text>
                      Genre:  {x}
                    </Text>
                    <Text>
                    Created:  {moment('2018-04-11').fromNow()}
                    </Text>
                    </Body>
                    <Icon name='arrow-forward' onPress={() => ToastAndroid.show(`You want to see the ${x} songs you have`, ToastAndroid.LONG)}/>
                  </CardItem>
                </Card>
                  </ListItem>
            )}
          />
        </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#d0ff93',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  header: {
    backgroundColor: '#5bbdff'
  },
  cards: {

  }
});
