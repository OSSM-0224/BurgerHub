import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Burger } from '../types';

interface BurgerCardProps {
  burger: Burger;
  onPress: (burger: Burger) => void;
}

export const BurgerCard: React.FC<BurgerCardProps> = ({ burger, onPress }) => {
  const [imageLoading, setImageLoading] = React.useState(true);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(burger)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {imageLoading && (
          <ActivityIndicator style={styles.loader} size="large" color="#ff6b35" />
        )}
        <Image
          source={{ uri: burger.strMealThumb }}
          style={styles.image}
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {burger.strMeal}
        </Text>
        <View style={styles.meta}>
          <Text style={styles.category}>{burger.strCategory}</Text>
          <Text style={styles.area}>{burger.strArea}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  imageContainer: {
    width: '100%',
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0'
  },
  loader: {
    position: 'absolute'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  content: {
    padding: 12
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  category: {
    fontSize: 12,
    color: '#ff6b35',
    fontWeight: '500'
  },
  area: {
    fontSize: 12,
    color: '#666'
  }
});
