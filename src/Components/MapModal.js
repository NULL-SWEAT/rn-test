import React, { Component } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native'

export default class MapModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
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

        <TouchableOpacity style={styles.btn}
          onPress={() => this.props.navigation.goBack()}
        >
          <Text>Descartar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}
          onPress={this.saveMarker.bind(this)}
        >
          <Text>Salvar</Text>
        </TouchableOpacity>
      </View>
    )
  }

  saveMarker() {
    if (this.state.title !== '' && this.state.description !== '') {
      this.props.navigation.state.params.newMarker(this.props.navigation.state.params.coordinate, this.state.title, this.state.description)
      this.props.navigation.goBack()
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 45,
    width: 250,
    margin: 5
  },
  btn: {
    alignItems: 'center',
    backgroundColor: '#AAAAFF',
    padding: 10,
    margin: 5
  }
})