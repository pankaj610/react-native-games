import * as React from 'react'
import {Button, Text, TextInput, View, FlatList} from 'react-native'

export function Example() {
    const [name, setUser] = React.useState('')
    const [show, setShow] = React.useState(false)
    const onEndReached = ()=> {
        console.log("reached end");
    }

    return (
      <View>
        <TextInput value={name} onChangeText={setUser} testID="input" />
        <Button
          title="Click here!"
          onPress={() => {
            // let's pretend this is making a server request, so it's async
            // (you'd want to mock this imaginary request in your unit tests)...
            setTimeout(() => {
              setShow(true)
            }, Math.floor(Math.random() * 200))
          }}
        />
        <FlatList data={Array.from({length: 100}, (_, key)=> ({key: `${key}`, value: `value_${key}`}))}
            renderItem={({item, index}) => <View style={{ height: 500, width: 100 }} ><Text>{item?.value}</Text></View>}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.2}
            testID="flat-list"
        />
        {show && <Text testID="output">{name}</Text>}
      </View>
    )
  }
 