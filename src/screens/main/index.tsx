import React from 'react';
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  Button,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import {
  fetchTeamsList,
  listSelectors,
  listActions,
  teamActions,
} from '@src/store';
import { useAppDispatch, useAppSelector } from '@src/store/store.hook';
import { CardItem } from './CardItem';

interface Styles {
  container: (bottom: number, isIOS: boolean) => StyleProp<ViewStyle>;
  subContainer: StyleProp<ViewStyle>;
  contentContainerStyle: StyleProp<ViewStyle>;
  buttonContainer: StyleProp<ViewStyle>;
  text: StyleProp<TextStyle>;
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
  contentContainerStyle: {
    paddingTop: 8,
    gap: 8,
    // flex: 1,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'blue',
    width: 60,
    textAlign: 'center',
  },
};

export type Team = {
  address: string;
  clubColors: string;
  crest: string;
  founded: number;
  id: number;
  lastUpdated: string;
  name: string;
  shortName: string;
  tla: string;
  venue: string;
  website: string;
};

type AppDispatch = ThunkDispatch<any, undefined, Action>;

export const MainScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const dispatch = useAppDispatch<AppDispatch>();

  const items = useAppSelector(listSelectors.itemsSelector);
  const pageSize = useAppSelector(listSelectors.pageSizeSelector);
  const currentPage = useAppSelector(listSelectors.currentPageSelector);
  const loading = useAppSelector(listSelectors.loadingSelector);
  const error = useAppSelector(listSelectors.errorSelector);

  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // console.log({isRefreshing, loading, error});

  const isIOS = React.useMemo(() => Platform.OS === 'ios', []);

  const refreshControl = (
    <RefreshControl
      refreshing={loading}
      onRefresh={() => {
        setIsRefreshing(true);
      }}
    />
  );

  React.useEffect(() => {
    const offset = (currentPage - 1) * pageSize;
    if (isRefreshing) {
      dispatch(listActions.setReset());
      dispatch(teamActions.setReset());
    }
    !isRefreshing && dispatch(fetchTeamsList({ limit: 10, offset }));
    setIsRefreshing(false);
  }, [currentPage, isRefreshing, dispatch, pageSize]);

  const goToNextPage = () => {
    dispatch(listActions.setPage(currentPage + 1));
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      dispatch(listActions.setPage(currentPage - 1));
    }
  };

  const renderItem = React.useCallback(({ item }: { item: Team }) => {
    return <CardItem {...item} />;
  }, []);

  const keyExtractor = React.useCallback((item: Team) => {
    return item.id.toString();
  }, []);

  return (
    <View style={styles.container(bottom, isIOS)}>
      <View style={styles.subContainer}>
        {loading && <ActivityIndicator size={'large'} />}
        {error && <Text style={{ textAlign: 'center' }}>Error: {error}</Text>}
        {!loading && !error && (
          //
          <FlatList
            contentContainerStyle={styles.contentContainerStyle}
            data={items}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            refreshControl={refreshControl}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Prev Page" onPress={goToPrevPage} />
        <Text style={styles.text}>{currentPage}</Text>
        <Button title="Next Page" onPress={goToNextPage} />
      </View>
    </View>
  );
};
