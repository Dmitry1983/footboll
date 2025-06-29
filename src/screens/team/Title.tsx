import React from 'react';
import type { PropsWithChildren } from 'react';
import { Text, StyleProp, TextStyle } from 'react-native';

interface Styles {
  text: StyleProp<TextStyle>;
}

const styles: Styles = {
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
};

type Props = PropsWithChildren<{
  massage: string;
  children?: React.ReactNode;
}>;

export const Title: React.FC<Props> = props => {
  const { massage, children } = props;
  return <Text style={styles.text}>{massage ?? children}</Text>;
};
