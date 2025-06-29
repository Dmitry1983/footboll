import React from 'react';
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { get } from 'lodash';

interface Styles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  block: StyleProp<ViewStyle>;
}

const styles: Styles = {
  container: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'lightgrey',
  },
  text: {
    color: 'black',
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
};

export const TeamItem = React.memo((props: any) => {
  // console.log('TeamItemProps:', { props });
  const dateOfBirth = get(props, ['dateOfBirth'], '');
  const name = get(props, ['name'], '');
  const nationality = get(props, ['nationality'], '');
  const position = get(props, ['position'], '');

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{dateOfBirth}</Text>
      </View>
      <View style={styles.block}>
        <Text style={styles.text}>{position}</Text>
        <Text style={styles.text}>{nationality}</Text>
      </View>
    </View>
  );
});
