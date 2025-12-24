import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addToCart } from '../redux/cartSlice';
import { Burger } from '../types';

interface BurgerDetailScreenProps {
  route: {
    params: {
      burger: Burger;
    };
  };
  navigation: any;
}

export const BurgerDetailScreen: React.FC<BurgerDetailScreenProps> = ({
  route,
  navigation
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { burger } = route.params;
  const [imageLoading, setImageLoading] = React.useState(true);

  const ingredients = [
    burger.strIngredient1,
    burger.strIngredient2,
    burger.strIngredient3,
    burger.strIngredient4,
    burger.strIngredient5
  ].filter(Boolean);

  const handleAddToCart = () => {
    dispatch(addToCart(burger));
    Alert.alert('Success', `${burger.strMeal} added to cart! 🛒`, [
      { text: 'Continue Shopping', onPress: () => navigation.goBack() },
      { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') }
    ]);
  };

  React.useEffect(() => {
    navigation.setOptions({
      title: burger.strMeal,
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#ff6b35',
      headerTitleStyle: {
        fontWeight: '600'
      }
    });
  }, [navigation, burger]);

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        {imageLoading && (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color="#ff6b35"
          />
        )}
        <Image
          source={{ uri: burger.strMealThumb }}
          style={styles.image}
          onLoadEnd={() => setImageLoading(false)}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{burger.strMeal}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Category</Text>
            <Text style={styles.metaValue}>{burger.strCategory}</Text>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Region</Text>
            <Text style={styles.metaValue}>{burger.strArea}</Text>
          </View>
        </View>

        {ingredients.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {ingredients.map((ingredient, idx) => (
                <View key={idx} style={styles.ingredientItem}>
                  <Text style={styles.ingredientBullet}>•</Text>
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Instructions</Text>
          <Text style={styles.instructions}>{burger.strInstructions}</Text>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddToCart}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>🛒 Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center'
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
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16
  },
  metaRow: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 16
  },
  metaItem: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8
  },
  metaLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4
  },
  metaValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333'
  },
  section: {
    marginBottom: 24
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12
  },
  ingredientsList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12
  },
  ingredientItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start'
  },
  ingredientBullet: {
    color: '#ff6b35',
    fontSize: 16,
    marginRight: 8,
    fontWeight: 'bold'
  },
  ingredientText: {
    fontSize: 14,
    color: '#666',
    flex: 1
  },
  instructions: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8
  },
  addButton: {
    backgroundColor: '#ff6b35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  }
});