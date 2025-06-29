import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  View,
  Text,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

interface Styles {
  container: StyleProp<ViewStyle>;
  image: StyleProp<ImageStyle>;
  text: StyleProp<TextStyle>;
}

const styles: Styles = {
  container: {
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    height: 100,
    width: 100,
  },
  text: {
    fontSize: 18,
    fontFamily: '600',
  },
};

type Props = PropsWithChildren<{
  name: string;
  crest: string;
}>;

export const Header: React.FC<Props> = props => {
  const { name, crest } = props;
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 18, fontFamily: '600' }}>{name}</Text>
      <Image
        resizeMode="contain"
        source={{
          uri: crest,
        }}
        style={styles.image}
      />
    </View>
  );
};
