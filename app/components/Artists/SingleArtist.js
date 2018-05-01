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
import RNFS from 'react-native-fs';

const title_saved_state = RNFS.DocumentDirectoryPath + '/db.json'
const album_saved_state = RNFS.DocumentDirectoryPath + '/album.txt'
const icon_saved_state = RNFS.DocumentDirectoryPath + '/icon.txt'
//we want to read files and directories under main bundle
RNFS.readDir(RNFS.DocumentDirectoryPath)
  .then(result => {
    console.log(`Gotten result::`, result)
  });


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
      headerTintColor: ((time < 8) || (time >= 19 && time <= 23) || (time===0)) ? 'white': 'dark'
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

  componentDidMount() {
    //read the saved state from the DB
    RNFS.readFile(title_saved_state, 'utf8')
    .then(file => {
      this.setState({
        currentName: file
      })
      console.log(`Title of song saved`, file.toString())
    })
    .catch(err => console.log(`Error reading from the DB`, err.message));


    RNFS.readFile(album_saved_state, 'utf8')
    .then(file => {
      this.setState({
        currentAlbum: file
      })
      console.log(`Current Album name saved is::`, file.toString())
    })
    .catch(err => console.log(`Error reading from the DB`, err.message));

    RNFS.readFile(icon_saved_state, 'utf8')
    .then(file => {
      this.setState({
        currentIcon: file
      })
      console.log(`Current Icon saved is::`, file.toString())
    })
    .catch(err => console.log(`Error reading from the DB`, err.message));
    // RNFS.readFile(album_saved_state, 'utf8')
    // .then(file => console.log(`Album name saved`, file.toString()))
    // .catch(err => console.log(`Error reading from the DB`, err.message));

    // RNFS.readFile(icon_saved_state, 'utf8')
    // .then(file => console.log(`Saved icon URI to state`, file.toString()))
    // .catch(err => console.log(`Error reading from the DB`, err.message));
  }

  componentWillUnmount() {
    if (this.state.currentName) {
      state = this.state.currentName
      console.log(`State has something`, this.state.currentName);
      
      RNFS.writeFile(title_saved_state, this.state.currentName, 'utf8')
        .then(done => {
          console.log(`Written to the DB successfully`);
        })
        .catch(err => console.log(`Error writing to file`, err.message));

        RNFS.writeFile(album_saved_state, this.state.currentAlbum, 'utf8')
        .then(done => {
          console.log(`Written to the DB successfully`);
        })
        .catch(err => console.log(`Error writing to file`, err.message));


        RNFS.writeFile(icon_saved_state, this.state.currentIcon, 'utf8')
        .then(done => {
          console.log(`Written to the DB successfully`);
        })
        .catch(err => console.log(`Error writing to file`, err.message));

        


    } else {
      console.log(`State is empty`)
    }

    console.log(`After the component unmounted, the state is::`, state);
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
          <ListItem itemDivider avatar onPress={() => this.changeName(songs)}>
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
        <Footer style={{backgroundColor: 'grey'}}>
          <Left>
            <Thumbnail source={{uri: this.state.currentIcon}? {uri: this.state.currentIcon}: {uri: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/LP_Vinyl_Symbol_Icon.png'}}/>
          </Left>
          <Body>
          <Text>{(!this.state.currentName)?"Not playing":this.state.currentName}</Text>
          </Body>
        </Footer>
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