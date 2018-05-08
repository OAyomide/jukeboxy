import React, { Component } from 'react';
import {
  Container,
  Body,
  Content,
  Text,
  Thumbnail,
  View,
  Left,
  Right,
  Icon
} from 'native-base'
import {ToastAndroid, ImageBackground, StyleSheet, Dimensions} from 'react-native'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'
import Slider from 'react-native-slider'

//get width of the window
const window = Dimensions.get('window');
export default class SongSelected extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current_icon: this.props.navigation.state.params.selected_song.item.albumImage,
      current_track_title: this.props.navigation.state.params.selected_song.item.title,
      current_track_album: this.props.navigation.state.params.selected_song.item.album,
      current_artiste: this.props.navigation.state.params.selected_song_artiste
    }
  }

  headerIcon = () => {
    return(
      <View>
        <Icon name="keyboard-arrow-left" type="MaterialIcons"/>
      </View>
    )
  }

  static navigationOptions =  ({navigation}) => {
    const {params} = navigation.state

    return {
      headerStyle: {
        height: 30
      },
      headerPressColorAndroid: 'red',
      headerTransparent: true,
      tran
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

  render() {
    return(
      <Container>
        <ImageBackground source={{uri: this.state.current_icon}} blurRadius={1} style={{flex:1}}>
        <View style={style.overlay}/>
          <Content>
          <Body>
            <Body>
              <Text style={style.track_artiste}>{this.state.current_artiste}</Text>
            </Body>
            <Body style={style.track_icon_body}>
              <Thumbnail source={{uri: this.state.current_icon}} square style={style.track_icon}/>
            </Body>
          </Body>

            <Body>
            <Text style={style.track_title}>{this.state.current_track_title}</Text>
            <Text style={style.track_album}>{this.state.current_track_album}</Text>
            <View style={style.slider_container}>
              <Slider style={style.slider}
                  thumbStyle={style.slider_thumb}
              />
            </View>
            </Body>
            <View style={{flexDirection: 'row', paddingTop:10}}>
              <Icon name="autorenew" fontSize={10} type="MaterialCommunityIcons" style={style.action_button_icon_replay}/>
              <Icon name="skip-previous" type="MaterialIcons" style={style.action_button_icons_prev}/>
              <Icon name="play-arrow"  type="MaterialIcons" style={style.action_button_icons_play}/>
              <Icon name="skip-next"  type="MaterialIcons" style={style.action_button_icons_next}/>
              <Icon name="shuffle-variant" type="MaterialCommunityIcons" style={style.action_button_icon_shuffle}/>
            </View>
        </Content>
      </ImageBackground>
    </Container>
    )
  }
}

const style = StyleSheet.create({
  track_title: {
    color: 'white',
  },
  track_artiste: {
    paddingTop: 5,
    color: 'white',
    fontWeight: "100"
  },
  
  track_icon: {
    height: 200,
    width: 200,
  }, 
  
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgbargba(108, 122, 124, 0.7)',
    flex:1
  },
   
  track_icon_body: {
    paddingTop: 50
  },
   
  slider_container:{
    width: window.width - 4,
    paddingTop: 30
  }, 
  
  slider: {
    height: 20
  }, 
  
  slider_thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#2c69db',
    borderRadius: 10 / 2,
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 2,
    shadowOpacity: 1,
}, 

track_album: {
  color: 'white',
  paddingTop: .5,
  fontSize: 10
}, 

action_button_icons_prev: {
  paddingLeft: 25,
  fontSize: 50
},
action_button_icons_next: {
  fontSize: 50,
  paddingLeft: 40
},
action_button_icons_play: {
  fontSize: 50,
  paddingLeft: 40
},
action_button_icon_replay: {
  paddingLeft: 20,
  paddingTop: 17,
  fontSize: 20
},
action_button_icon_shuffle: {
  fontSize: 20,
  paddingTop: 17,
  paddingLeft: 35
},
action_buttons_container: {
  height: 30,
  backgroundColor: 'red'
},
headerStyle: {
  height: 30
}
})