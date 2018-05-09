/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ToastAndroid,
  TouchableOpacity,
  Easing,
  Animated
} from 'react-native';
import {StackNavigator, NavigationActions} from 'react-navigation'
import Home from './Home'
import ArtistList from '../components/Artists/ArtistList'
import SingleArtist from './Artists/SingleArtist';
import SongSelected from './Artists/SongSelected';


const FadeTransition = (index, position) => {
  const sceneRange = [index - 1, index]
  const outputOpacity = [0,1]
  const transition = position.interpolate({
    inputRange: sceneRange,
    outputRange: outputOpacity
  });
  return {
    opacity: transition
  }
}

const NavigationConfig = () => {
  return {
      transitionSpec: {
        duration: 650,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
    },
    screenInterpolator: (screenProps) => {
      const position = screenProps.position;
      const scene = screenProps.scene
      const index = scene.index

      return FadeTransition(index, position)
    }
  }
}
type Props = {};
class Welcome extends Component<Props> {

  static navigationOptions = {
    title: 'Welcome to Jukeboxy',
    header: null
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={{color: '#95ffea', fontSize: 20}}>
          J
          <Text style={{color: '#bdb715', fontSize: 20}}>
          UK
          <Text style={{color: '#f5890e', fontSize: 20}}>
          E
          <Text style={{color: '#92f74f', fontSize: 20}}>
          B
          <Text style={{color: '#fa50ec', fontSize: 20}}>
          OX
          <Text style={{color: '#9354ff', fontSize: 20}}>
          Y
        </Text>
        </Text>
        </Text>
        </Text>
        </Text>
        </Text>
        <Text style={{fontStyle: 'italic', fontSize: 15, marginTop: 20, color: '#8bfffb'}}>
          Your truly personal music player.
        </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.dispatch(resetAction)} >
            <Text style={{color: 'white'}}>Let's Juke!</Text>
            </TouchableOpacity>
      </View>
    );
  }
}

export default class App extends React.Component {
  render() {
    return <RootStack
          screenProps={'Props passed'}
          
    />
  }
}

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: 'ArtistHome'})]
});

const RootStack = StackNavigator({
  Welcome: {
    screen: Welcome
  },
  Home: {
    screen: Home,
  }, ArtistHome: {
    screen: ArtistList
  },
  ArtistHome: {
    screen: ArtistList,
  },
  ArtistSongs: {
    screen: SingleArtist,
  },
  SongSelected: {
    screen: SongSelected,
  }
}, {
  initialRouteName: 'Welcome',
  transitionConfig: NavigationConfig
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#242928',
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
  button: {
    alignItems: 'center',
    backgroundColor: '#4b5251',
    padding: 10,
    marginTop: 30,
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0
  },
});
