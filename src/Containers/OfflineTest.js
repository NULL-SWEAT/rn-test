import React, { Component } from 'react'
import { View, StyleSheet, NetInfo, TextInput } from 'react-native'
import firebase from 'react-native-firebase'
import { Container, Content, Text, Button } from 'native-base'

export default class OfflineTest extends Component {
  constructor(props) {
    super(props)
    this.db = firebase.firestore()
    this.unsubscribe = null
    this.state = {
      items: []
    }
  }

  componentWillMount() {
    this.db.settings({ persistence: true })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  componentDidMount() {
    // NetInfo.addEventListener(
    //   'connectionChange',
    //   this.handleConnectionChange
    // )

    this.unsubscribe = this.db.collection('items').onSnapshot(this.getItemsFromDb)
  }

  handleConnectionChange = async (connInfo) => {
    console.log(connInfo.type)
    if (connInfo.type === 'none') {
      await this.db.disableNetwork()
    } else {
      await this.db.enableNetwork()
    }
  }

  getItemsFromDb = (querySnapshot) => {
      const items = []
      querySnapshot.docs.forEach((item) => {
        items.push({
          ...item.data(),
          key: item.id,
          docRef: item
        })
      })
      this.setState({ items })
      // var source = querySnapshot.metadata.fromCache ? "local cache" : "server";
      // console.log("Data came from " + source);
  }

  newItem = async () => {
    try {
      const text = this.state.text
      const newItem = await this.db.collection('items').add({ text })
    } catch(err) {
      console.warn(err)
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{marginBottom:15}}>
            <TextInput
              onChangeText={(text) => this.setState({ text })}
              placeholder={'text'}
            />
            <Button onPress={this.newItem}>
              <Text>Save</Text>
            </Button>
          </View>

          {this.state.items.map((item) => {
            return (
              <Button key={item.key} onPress={() => {item.docRef.ref.delete()}}
                style={{marginBottom:10}}
              >
                {/* <Text>id={item.key}</Text> */}
                <Text>{item.text}</Text>
              </Button>
            )
          })}
        </Content>
      </Container>
    )
  }
}
