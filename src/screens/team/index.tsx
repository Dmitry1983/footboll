import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  Platform,
  ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@src/store/store.hook';
import { teamSelectors, fetchTeamsId, fetchTeamsIdMatches } from '@src/store';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { get, isNull } from 'lodash';
import { TeamItem } from './TeamItem';
import { ScheduledItem } from './ScheduledItem';
import { Header } from './Headre';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@src/appNavigation';
import { Title } from './Title';

type Props = NativeStackScreenProps<RootStackParamList, 'Team'>;

interface Styles {
  container: (bottom: number, isIOS: boolean) => StyleProp<ViewStyle>;
  subContainer: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
  contentContainerStyle: StyleProp<ViewStyle>;
}

const styles: Styles = {
  container: (bottom, isIOS) => ({
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingBottom: isIOS ? bottom : 16,
  }),
  subContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'red',
  },
  contentContainerStyle: {
    paddingTop: 8,
    gap: 8,
    paddingHorizontal: 16,
  },
};

export interface TeamProps {
  dateOfBirth: string;
  name: string;
  nationality: string;
  position: string;
  id: number;
}

type AppDispatch = ThunkDispatch<any, undefined, Action>;

export const TeamScreen: React.FC<Props> = props => {
  console.log('TeamScreen:', { props });
  const dispatch = useAppDispatch<AppDispatch>();
  const { bottom } = useSafeAreaInsets();
  const isIOS = React.useMemo(() => Platform.OS === 'ios', []);

  const id = get(props, ['route', 'params', 'id'], null);
  const title = get(props, ['route', 'params', 'title'], '');

  const team = useAppSelector(teamSelectors.itemsSelector);
  const scheduled = useAppSelector(teamSelectors.scheduledSelector);
  const loading = useAppSelector(teamSelectors.loadingSelector);
  const error = useAppSelector(teamSelectors.errorSelector);

  const squad = get(team, ['squad'], []);

  const matches = get(scheduled, ['matches'], []);

  React.useEffect(() => {
    !isNull(id) &&
      dispatch(fetchTeamsId({ id })).then(() => {
        dispatch(fetchTeamsIdMatches({ id }));
      });
  }, [id, dispatch]);

  const Squad = ({ squad_ }: { squad_: any }) =>
    squad_.map((item: any) => {
      const id = get(item, ['id'], '');
      return <TeamItem {...item} key={id} />;
    });

  const Matches = ({ matches_ }: { matches_: any }) =>
    matches_.map((item: any) => {
      const id = get(item, ['id'], '');
      return <ScheduledItem {...item} key={id} />;
    });

  const crest = get(team, ['crest'], '');
  const name = get(team, ['name'], '');
  const imageProps = { name, crest };

  return (
    <View style={styles.container(bottom, isIOS)}>
      <View style={styles.subContainer}>
        {loading && <ActivityIndicator size={'large'} />}
        {error && <Text style={{ textAlign: 'center' }}>Error: {error}</Text>}
        {!loading && !error && (
          <>
            <ScrollView
              contentContainerStyle={{
                gap: 8,
                padding: 16,
              }}
            >
              <Header {...imageProps} />
              <Title massage="SQUAD" />
              <Squad squad_={squad} />
              <Title massage="SCHEDULED" />
              <Matches matches_={matches} />
            </ScrollView>
          </>
        )}
      </View>
    </View>
  );
};
