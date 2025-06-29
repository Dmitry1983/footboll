import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageStyle,
} from 'react-native';
import { get } from 'lodash';

interface Styles {
  container: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  block: StyleProp<ViewStyle>;
  blockH: StyleProp<ViewStyle>;
  image: StyleProp<ImageStyle>;
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
    alignItems: 'center',
  },
  blockH: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 48,
    height: 48,
  },
};

export const ScheduledItem = React.memo((props: any) => {
  // console.log('ScheduledItemProps:', { props });
  const utcDate = get(props, ['utcDate'], '');
  const date = utcDate.slice(0, 10);
  const liga = get(props, ['competition', 'name'], '');

  const homeTeamCrest = get(props, ['homeTeam', 'crest'], '');
  const homeTeamShortName = get(props, ['homeTeam', 'shortName'], '');

  const awayTeamCrest = get(props, ['awayTeam', 'crest'], '');
  const awayTeamShortName = get(props, ['awayTeam', 'shortName'], '');

  return (
    <View style={styles.container}>
      <View style={styles.block}>
        <Text style={styles.text}>{liga}</Text>
        <Text style={styles.text}>{date}</Text>
      </View>
      <View style={styles.block}>
        <View style={styles.block}>
          <Image
            style={styles.image}
            source={{
              uri: awayTeamCrest,
            }}
          />
          <Text style={styles.text}>{awayTeamShortName}</Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.text}>{homeTeamShortName}</Text>
          <Image
            style={styles.image}
            source={{
              uri: homeTeamCrest,
            }}
          />
        </View>
      </View>
    </View>
  );
});
