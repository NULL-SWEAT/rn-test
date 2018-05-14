import React, { Component } from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Container, Content, Button, Text, Footer, FooterTab } from 'native-base'
import { ApplicationStyles, Fonts, Colors } from '../Styles'

export default class MapModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      valid: false,
    }
  }

  componentDidMount() {
    const { coordinate, name } = this.props.navigation.state.params.event
    this.setState({ coordinate: coordinate })
    if (name) this.setState({ title: name })
  }

  render() {
    return (
      <Container>
        <Content contentContainerStyle={styles.centered}>
          <Text>Título:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(title) => this.setState({ title })}
            value={this.state.title}
          />

          <Text>Descrição:</Text>
          <TextInput
            style={styles.input}
            onChangeText={(description) => this.setState({ description })}
            value={this.state.description}
          />
        </Content>

        <Footer>
          <FooterTab>
            <Button
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}
            >
              <Text style={styles.buttonText}>Descartar</Text>
            </Button>

            <Button success
              disabled={(this.state.title === '' || this.state.description === '')}
              style={styles.button}
              onPress={this.saveMarker.bind(this)}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }

  saveMarker() {
    if (this.state.title !== '' && this.state.description !== '') {
      this.props.navigation.state.params.newMarker(this.state.coordinate, this.state.title, this.state.description)
      this.props.navigation.goBack()
    }
  }
}

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,
  input: {
    height: 45,
    width: '75%',
    margin: 5
  },
  button: {
    alignSelf: 'auto',
  },
  buttonText: {
    fontSize: Fonts.size.medium,
    color: Colors.white,
  },
})
