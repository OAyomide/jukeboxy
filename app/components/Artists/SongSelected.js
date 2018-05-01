import React, { Component } from 'react';
import {
  Container,
  Body,
  Content,
  Text
} from 'native-base'

import {ToastAndroid} from 'react-native'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'
export default class SongSelected extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <Container>
        <Content>
          <Text> Hello there</Text>
        </Content>
      </Container>
    )
  }
}