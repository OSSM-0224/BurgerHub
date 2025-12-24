import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  AppState,
  AppStateStatus
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  setBurgers,
  setLoading,
  setError,
  setSearchQuery,
  loadMorePage
} from '../redux/burgersSlice';
import { burgersApi } from '../api/burgersApi';
import { storage } from '../storage/persist';
import { BurgerCard } from '../components/BurgerCard';
import { SearchBar } from '../components/SearchBar';
import { Burger } from '../types';

interface BurgerListScreenProps {
  navigation: any;
}

export const BurgerListScreen: React.FC<BurgerListScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    burgers,
    filteredBurgers,
    currentPage,
    loading,
    error,
    searchQuery,
    pageSize
  } = useSelector((state: RootState) => state.burgers);

  // Initial load
  useEffect(() => {
    const loadBurgers = async () => {
      dispatch(setLoading(true));
      try {
        const cached = await storage.getBurgers();
        if (cached && cached.length > 0) {
          dispatch(setBurgers(cached));
        }

        const data = await burgersApi.searchBurgers('burger');
        if (data.length > 0) {
          dispatch(setBurgers(data));
          await storage.saveBurgers(data);
        }
      } catch {
        dispatch(setError('Failed to load burgers'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadBurgers();
  }, [dispatch]);

  // App lifecycle handling
  useEffect(() => {
    const handleAppStateChange = async (state: AppStateStatus) => {
      if (state === 'background' || state === 'inactive') {
        await storage.savePage(currentPage);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [currentPage]);

  const handleRefresh = async () => {
    dispatch(setLoading(true));
    try {
      const data = await burgersApi.searchBurgers('burger');
      dispatch(setBurgers(data));
      await storage.saveBurgers(data);
    } catch {
      dispatch(setError('Failed to refresh'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSearch = (text: string) => {
    dispatch(setSearchQuery(text));
  };

  const handleEndReached = () => {
    const maxPage = Math.ceil(filteredBurgers.length / pageSize);
    if (currentPage < maxPage) {
      dispatch(loadMorePage());
    }
  };

  const startIdx = (currentPage - 1) * pageSize;
  const endIdx = startIdx + pageSize;
  const displayBurgers = filteredBurgers.slice(startIdx, endIdx);

  const handleBurgerPress = (burger: Burger) => {
    navigation.navigate('BurgerDetail', { burger });
  };

  if (loading && burgers.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#ff6b35" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={handleSearch} />

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {filteredBurgers.length === 0 && !loading ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyText}>
            {searchQuery ? 'No burgers found' : 'No burgers available'}
          </Text>
        </View>
      ) : (
        <FlatList
          data={displayBurgers}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <BurgerCard burger={item} onPress={handleBurgerPress} />
          )}
          contentContainerStyle={styles.listContent}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? (
              <ActivityIndicator
                size="large"
                color="#ff6b35"
                style={styles.footer}
              />
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContent: {
    paddingVertical: 8
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#d32f2f'
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 14
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center'
  },
  footer: {
    paddingVertical: 20
  }
});