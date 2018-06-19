import React, {Component} from 'react';
import {
  StyleSheet,
  ToastAndroid,
  FlatList,
  View
} from 'react-native';

import {List, ListItem, SearchBar, Text} from 'react-native-elements'
import {
  Header,
  Container,
  Content,
  Card,
  Body,
  Title,
  CardItem,
  Thumbnail,
  Left,
  Right,
  Icon,
  Item,
  Input,

} from 'native-base'
import {Artists} from '../../mockdata/mockdata'
import {NavigationAction} from 'react-navigation';
import SingleArtist from '../Artists/SingleArtist';


export default class ArtistList extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: Artists,
      sample: this.props.screenProps,
      passed: []
    }
  }
  
static navigationOptions = {
  header: null,
  title: 'Home'
}


/**
 * We want to render our separator component.
 */
renderSeparator = () => {
  return(
    <View style={{
      height: 1,
      width: "86%",
      backgroundColor: '#ab69a1',
      marginLeft: "14%"
    }}/>
  )
}

renderHeader = () => {
  return(
    <SearchBar
    round
    placeholder="Search for artistes"
    />
  )
}

renderFooter = () => {
  return(
    <Text style={style.ft_style}>
      Thats all there is
    </Text>
  )
}

  render() {
    
    return(
      <Container style={style.oth}>
      
        <Content>
          <List containerStyle={style.container}>
            <FlatList
            data={this.state.data}
            keyExtractor={artist => artist.name}
            
            ListHeaderComponent={this.renderHeader}
            renderItem={(artist) => (
              <ListItem
              roundAvatar
              hideChevron={true}
              titleStyle={style.titleStyle}
              containerStyle={{borderBottomColor:"#242928"}}
              underlayColor='grey'
              title={artist.item.name}
              avatar={{uri: artist.item.icon}}
              onPress={() => this.props.navigation.navigate('ArtistSongs', {songs: artist.item.songs, name: artist.item.name, image: artist.item.background, icon: artist.item.icon})}
              onLongPress={() => ToastAndroid.show('I wonder why you would do that! :)', ToastAndroid.SHORT)}
              />
            )}
            />
          </List>
        </Content>
      </Container>
    )
  }
}

const style = StyleSheet.create({
  thm: {
    paddingTop: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#242928',
  }, oth: {
    backgroundColor: '#242928'
  }, titleStyle: {
    color: 'white'
  }, ft_style:{
    fontSize: 14,
    paddingLeft: "37%",
    color: 'white',
    fontStyle: 'italic'
  },
})


// <List style={(new Date().getHours() <= 18) ? style.oth : style.main}>
//             <FlatList
//             data={this.state.data}
//             keyExtractor={artist => artist.name}
//             renderItem={(artists) => (
              
//               <ListItem onPress={() => this.props.navigation.navigate('ArtistSongs', {songs: artists.item.songs, name: artists.item.name})}
//               avatar>
//               <Left style={style.thm}>
//                 <Thumbnail source={{uri: artists.item.background}}
//                 size={40}
//                 />
//               </Left>
              
//                 <Body>
//                   <Text>
//                   {artists.item.name}
//                   </Text>
//                 </Body>
//               </ListItem>
//             )}
//             />
//           </List>
//ItemSeparatorComponent={this.renderSeparator}
