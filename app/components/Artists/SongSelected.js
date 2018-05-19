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
import Slider from 'react-native-slider';
import Sound from 'react-native-sound'

Sound.setCategory('Playback');

let time;
const whiiip = new Sound('lor_choc.mp3',Sound.MAIN_BUNDLE,(err) => {
  if (err) {
    console.log(`Failed to load sound`, err);
    return;
  }
  console.log(`Duration in seconds: ${whiiip.getDuration()}`);
  time = whiiip.getDuration()
});


//get width of the window
const window = Dimensions.get('window');
export default class SongSelected extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playing: false,
      paused: true,
      shuffle: false,
      repeat: false,
      sliding: false,
      currentTime: 0,
      songDuration: time,
      muted: false,
      percentage: 0,
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
    }
  }
    /**
     * Boolean. Set the play toggle
     */
    togglePlay() {
      this.setState({
        playing: true
      });
    }
      /**
       * Boolean. Toggle shuffle
       */

       toggleShuffle() {
         this.setState({
           shuffle: true
         });
        }
      /**
       * Set the time of the playing song
       */

       setTime(param){
         if (!this.state.sliding) {
           this.setState({currentTime: param.currentTime});
         }
       }

       onLoad() {
         this.setState({
           songDuration: this.duration
         });
       }

       onSlidingStart() {
         this.setState({sliding: true})
       }

       onSlidingChange(val) {
         let newP = this.state.songDuration - val
         console.log(`DEBUG ====>>>>>>>> Value changed!!`);
         this.setState({
           currentTime: newP
         })
       }

       onSlidingComplete() {
         this.refs.audio.seek(this.state.currentTime);
         this.setState({sliding: false})
       }

       onEnd() {
         this.setState({playing: false})
       }

       playTestSong() {
         this.setState({
           playing: true,
           paused: false
         })
        whiiip.play((success) => {
          if (success) {
            console.log(`Successfully started playing song`);
          } else {
            console.log(`Sound could not be played`);
            whiiip.reset();
          }
        });
        whiiip.getCurrentTime((s) => {
          console.log(`Played at ${s}`);
          this.setState({currentTime: s})
        });
      }

      pauseSong() {
        let t;
        this.setState({
          paused: true,
          playing: false
        })
        whiiip.pause(err => err? console.log(`Error pausing track`) : console.log(`Track paused`));
        whiiip.getCurrentTime((s) => {
          console.log(`Paused at ${s}`);
        });
      }

      seekSong(val) {
        this.setState({currentTime: val});
        console.log(`The updated value is::`, val)
        //whiiip.setCurrentTime(val)
      }

      getSeekVal (val) {
        setInterval(() => {
          this.setState({
            currentTime: val
          });
        });
      };
       
  render() {
    let songPercent;
    if (whiiip.getDuration() !== undefined) {
      songPercent = this.state.currentTime/whiiip.getDuration
    } else {
      songPercent = 0
    }

    return(
      <Container>
        <ImageBackground source={{uri: this.props.navigation.state.params.selected_song.item.albumImage}} blurRadius={1} style={{flex:1}}>
        <View style={style.overlay}/>
          <Content>
          <Body>
            <Body>
              <Text style={style.track_artiste}>{this.props.navigation.state.params.selected_song_artiste}</Text>
            </Body>
            <Body style={style.track_icon_body}>
              <Thumbnail source={{uri: this.props.navigation.state.params.selected_song.item.albumImage}} square style={style.track_icon}/>
            </Body>
          </Body>

            <Body>
            <Text style={style.track_title}>{this.props.navigation.state.params.selected_song.item.title}</Text>
            <Text style={style.track_album}>{this.props.navigation.state.params.selected_song.item.album}</Text>
            <View style={style.slider_container}>
              <Slider style={style.slider}
                  thumbStyle={style.slider_thumb}
                  trackStyle={style.slider_track_style}
                  // minimumTrackTintColor="#35d3ff"
                  // step={1}
                  // minimumValue = {0}
                  // maximumValue = {this.state.songDuration}
                  // onValueChange={(this.state.playing === true)? (val) => this.seekSong(val) : console.log(`Not playing!`)}
                  // value = {this.state.currentTime}
                  // onSlidingStart={() => this.onSlidingStart()}
                  // step={1}
                  // value = {(this.state.currentTime/this.state.songDuration) * 100}
                  />
            </View>
            </Body>
            <Text>{this.state.currentTime}</Text>
              <Text> Percentage:</Text>
            <View style={{flexDirection: 'row', paddingTop:10}}>
              <Icon name="autorenew" fontSize={10} type="MaterialCommunityIcons" style={style.action_button_icon_replay}/>
              <Icon name="skip-previous" type="MaterialIcons" style={style.action_button_icons_prev}/>
              <Icon name={(this.state.playing===true)? "pause": "play-arrow"}  type="MaterialIcons" style={style.action_button_icons_play} onPress={() => (this.state.paused===true? this.playTestSong(): this.pauseSong())}/>
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
    width: 200
  }, 
  
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgbargba(108, 122, 124, 0.7)',
    flex:1
  },
   
  track_icon_body: {
    paddingTop: 100
  },
   
  slider_container:{
    width: window.width - 4,
    paddingTop: 30
  }, 
  
  slider: {
    height: 20,
  }, 
  
  slider_thumb: {
    width: 10,
    height: 10,
    backgroundColor: '#35d3ff',
    borderRadius: 30 / 2,
    borderColor: 'green',
    shadowColor: 'red',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 1,
}, 

slider_track_style: {
  borderRadius: 2,
  height: 4,
},

track_album: {
  color: 'white',
  paddingTop: .5,
  fontSize: 10
}, 

action_button_icons_prev: {
  paddingLeft: 25,
  fontSize: 50,
  color: 'white'
},

action_button_icons_next: {
  fontSize: 50,
  paddingLeft: 40,
  color: 'white'
},

action_button_icons_play: {
  fontSize: 50,
  paddingLeft: 40,
  color: 'white'
},

action_button_icon_replay: {
  paddingLeft: 20,
  paddingTop: 17,
  fontSize: 20,
  color: '#35d3ff'
},

action_button_icon_shuffle: {
  fontSize: 20,
  paddingTop: 17,
  paddingLeft: 35,
  color: '#35d3ff'
},

action_buttons_container: {
  height: 30,
  backgroundColor: 'red'
},

headerStyle: {
  height: 30
}

});