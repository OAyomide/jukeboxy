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
import Video from 'react-native-video'
import moment from 'moment'
// import Sound from 'react-native-sound'

// Sound.setCategory('Playback');

// let time;
// const whiiip = new Sound('lor_choc.mp3',Sound.MAIN_BUNDLE,(err) => {
//   if (err) {
//     console.log(`Failed to load sound`, err);
//     return;
//   }
//   console.log(`Duration in seconds: ${whiiip.getDuration()}`);
//   time = whiiip.getDuration()
// });


//get width of the window

function formatTime(params) {
  let llt = moment()
  .startOf('day')
  .seconds(params)
  .format('mm:ss');

  return llt
}

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
      songDuration: 0,
      muted: false,
      percentage: 0,
      formatedTime: '',
      remainingTime: 0
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
    // /**
    //  * Boolean. Set the play toggle
    //  */
    // togglePlay() {
    //   this.setState({
    //     playing: true
    //   });
    // }
    //   /**
    //    * Boolean. Toggle shuffle
    //    */

    //    toggleShuffle() {
    //      this.setState({
    //        shuffle: true
    //      });
    //     }
    //   /**
    //    * Set the time of the playing song
    //    */

       setTime = (param) => {
         if (!this.state.sliding) {
           let formattedTime = formatTime(Math.floor(param.currentTime))
           let elapsed = Math.floor(this.state.songDuration) - Math.floor(Math.floor(param.currentTime));
           let formattedElapsedTime = formatTime(elapsed);
           this.setState({
             currentTime: Math.floor(param.currentTime),
             formatedTime: formattedTime,
             remainingTime: formattedElapsedTime
            });
         }
       };

       onLoad = (params) => {
         console.log(`Has been loaded!! XO XO. Length of the song is: ${params.duration}`);
         
         this.setState({
           songDuration: Math.floor(params.duration),
           playing: true,
           paused: false,
           remainingTime: Math.floor(params.duration)
         });
       };

       onSlidingChange = (val) => {
         console.log(`Sliding value has changed`);
         console.log(`Value is: ${Math.floor(val)}`);
         this.setState({
           currentTime: Math.floor(val)
         });
         /**
          * Slider bug fix.
          */
       };

       onSlidingComplete = () => {
         this.refs.audio.seek(this.state.currentTime);
         this.setState({sliding: false})
       };

       onSlidingStart = () => {
         console.log(`Sliding started`)
         this.setState({sliding: true})
       };

       onEnd = () => {
         this.setState({playing: false})
       };

    //    onSlidingChange(val) {
    //      let newP = this.state.songDuration - val
    //      console.log(`DEBUG ====>>>>>>>> Value changed!!`);
    //      this.setState({
    //        currentTime: newP
    //      })
    //    }

    //    onSlidingComplete() {
    //      this.refs.audio.seek(this.state.currentTime);
    //      this.setState({sliding: false})
    //    }

    //    onEnd() {
    //      this.setState({playing: false})
    //    }

       playTestSong() {
         this.setState({
           playing: true,
           paused: false
         });
      }

      pauseSong() {
          this.setState({
            paused: true,
            playing: false
          });
      }

    //   seekSong(val) {
    //     this.setState({currentTime: val});
    //     console.log(`The updated value is::`, val)
    //     //whiiip.setCurrentTime(val)
    //   }

    //   getSeekVal (val) {
    //     setInterval(() => {
    //       this.setState({
    //         currentTime: val
    //       });
    //     });
    //   };
       
  render() {
    let songPercent;
    if (this.state.songDuration !== undefined) {
      songPercent = this.state.currentTime/this.state.songDuration
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
                  onSlidingStart={this.onSlidingStart}
                  onSlidingComplete={this.onSlidingComplete}
                  onValueChange = {(val) => this.onSlidingChange(val)}
                  value={this.state.currentTime}
                  minimumTrackTintColor="#35d3ff"
                  minimumValue = {0}
                  maximumValue = {this.state.songDuration}
                  //onValueChange={(val) => this.setState({currentTime: val})}
                  // value = {this.state.currentTime}
                  //onSlidingStart={(val) => console.log(`Sliding started. Value is: ${val}`)}
                  // step={1}
                  //value = {this.state.currentTime}
                  />
            </View>
            <View>
              <Video
                source={{uri: this.props.navigation.state.params.selected_song.item.url}}
                onLoad={(param) => this.onLoad(param)}
                ref="audio"
                paused={this.state.paused}
                playInBackground={true}
                playWhenInactive={true}
                onAudioFocusChanged={(v) => this.setState({playing: true})}
                onEnd = {this.onEnd}
                resizeMode = "cover"
                repeat={this.state.repeat}
                onProgress={this.setTime}
              />
            </View>
            </Body>
            <View style={{flexDirection: "row"}}>
            <Text>{this.state.formatedTime ? this.state.formatedTime: '00:00'}</Text>
            <Text style={{marginLeft: "80%"}}>{this.state.remainingTime ? this.state.remainingTime: '00:00'}</Text>
            </View>
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
  color: 'white'
},

action_button_icon_shuffle: {
  fontSize: 20,
  paddingTop: 17,
  paddingLeft: 35,
  color:'white'
},

action_buttons_container: {
  height: 30,
  backgroundColor: 'red'
},

headerStyle: {
  height: 30
}

});