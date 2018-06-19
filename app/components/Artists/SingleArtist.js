import React, {Component} from 'react'
import {
  Container,
  Card,
  Body,
  Content,
  Text,
  Thumbnail,
  Left,
  Right,
  Icon,
  List,
  ListItem,
  Header,
  Title,
  CardItem,
  Button,
  View,
  Footer
} from 'native-base';
import {
  StyleSheet,
  FlatList,
  ImageBackground,
  ToastAndroid
} from 'react-native';
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'
import moment from 'moment';

import {createTransition, FlipX, FlipY} from 'react-native-transition'
import Selected from './SongSelected'
const Transition = createTransition(FlipX);
const darkColor = '#242928'
const time = moment().hour();
const text = 'songs'
let state;



export default class SingleArtist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.navigation.state.params.songs,
      name: props.navigation.state.params.name,
      artisteImage: props.navigation.state.params.image,
      icon: props.navigation.state.params.icon,
      currentName: '',
      currentAlbum: '',
      currentIcon: ''
    }
  }

  static navigationOptions =({navigation}) => {
    const {params} = navigation.state

    return {
      title: `Songs by ${params.name}`,
      headerStyle: {
        backgroundColor: ((time < 8) || (time >= 19 && time <= 23) || (time===0)) ? darkColor: 'white'
      },
      headerTitleStyle: {
        fontWeight: '100',
      },
      headerTintColor: ((time < 8) || (time >= 19 && time <= 23) || (time===0)) ? 'white': '#242928'
    }

    const transitionConfig = () => {
      return {
        transitionSpec: {
          duration: 750,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing,
          useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {      
          const { layout, position, scene } = sceneProps
    
          const thisSceneIndex = scene.index
          const width = layout.initWidth
    
          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex],
            outputRange: [width, 0],
          })
    
          return { transform: [ { translateX } ] }
        },
      }
    }
  }

  //header for the parallax

  changeName = (name) => {
    this.setState({
      currentName: name.item.title,
      currentAlbum: name.item.album,
      currentIcon: name.item.albumImage,
    })
  }

  
  render() {
    return(
      <Container style={style.cnt}>
        <Content>
        <Container style={style.heading}>
        <ImageBackground source={{uri: this.state.artisteImage}} style={{flex:1}}>
          <View style={style.overlay}/>
        <Left style={{marginTop:"30%"}}>
          <Thumbnail source={{uri: this.state.icon}}/>
          <Body><Text style={{fontStyle: 'italic', fontWeight: '500', color:'white'}}>{(this.state.data.length) === 1 ? this.state.data.length + ' song': this.state.data.length + ' songs'}</Text></Body>
        </Left>
        </ImageBackground>
        </Container>
        <List>
        
        <FlatList
        style={{borderBottomColor: 'red'}}
        data={this.state.data}
        keyExtractor = {songs => songs.title}
        renderItem = {(songs) => (
          <ListItem itemDivider avatar onPress={() => this.props.navigation.navigate('SongSelected', {selected_song: songs, selected_song_artiste: this.state.name, songs: this.state.data})}>
            <Left>
                <Thumbnail source={{uri: songs.item.albumImage}} square/>
              </Left>
            <Body>
              <Text>
                Track title: {songs.item.title}
              </Text>
              <Text>
                Album: {songs.item.album}
              </Text>
            </Body>
            <Right>
                <Icon name="play" style={{fontSize: 18, color: 'black'}}/>
              </Right>
          </ListItem>
        )}
        />
        
      </List>
        </Content>
      </Container>
    )
  }
}

const style = StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: 'cover'
  }, cnt: {
    backgroundColor: 'white'
  },
  heading: {
    height: 200
  },
  darkNight: {
    backgroundColor: '#d0ff93'
  }, overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(69,85,117,0.7)',
    flex: 1
  }
})