import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@src/hooks';
import { get } from 'lodash';
import { Team } from './';

interface Styles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
}

const styles: Styles = {
  container: {
    height: 60,
    backgroundColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
};

export const CardItem = React.memo((props: Team) => {
  const [loading, setLoading] = React.useState(true);
  // console.log('CardItem:', { props });
  const id = get(props, ['id'], 0);
  const title = get(props, ['shortName'], '');
  const crest = get(props, ['crest'], '');
  const name = get(props, ['name'], '');

  const { handleGoTo } = useNavigation();

  const goToDriver = () => {
    handleGoTo({
      screen: 'Team',
      params: { id, title },
    });
  };

  return (
    <TouchableOpacity
      onPress={goToDriver}
      activeOpacity={0.6}
      style={styles.container}
    >
      <View
        style={{
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          style={{ width: 48, height: 48 }}
          onLoadEnd={() => setLoading(false)}
          source={{
            uri: crest,
          }}
        />
        {loading && (
          <ActivityIndicator
            style={{ position: 'absolute' }}
            size="large"
            color="grey"
          />
        )}
      </View>
      <Text style={styles.text}>{name}</Text>
    </TouchableOpacity>
  );
});
