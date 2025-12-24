import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import {
  removeFromCart,
  updateQuantity,
  clearCart,
  CartItem
} from '../redux/cartSlice';

interface CartScreenProps {
  navigation: any;
}

export const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    navigation.setOptions({
      title: '🛒 My Cart',
      headerStyle: {
        backgroundColor: '#fff'
      },
      headerTintColor: '#ff6b35',
      headerTitleStyle: {
        fontWeight: '600'
      }
    });
  }, [navigation]);

  // Calculate total price - Fixed: Store prices instead of random
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.price || 250; // Default price if not set
    return sum + itemPrice * item.quantity;
  }, 0);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemove(id);
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    Alert.alert(
      'Checkout',
      `Total: ₹${totalPrice.toFixed(2)}\n\nOrder placed successfully! 🎉`,
      [
        {
          text: 'Continue Shopping',
          onPress: () => {
            dispatch(clearCart());
            navigation.navigate('BurgerList');
          }
        }
      ]
    );
  };

  const renderCartItem = ({ item }: { item: CartItem }) => {
    const itemPrice = item.price || 250;

    return (
      <View style={styles.cartItemContainer}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.cartItemImage}
        />

        <View style={styles.cartItemDetails}>
          <Text style={styles.cartItemName}>{item.strMeal}</Text>
          <Text style={styles.cartItemCategory}>{item.strCategory}</Text>
          <Text style={styles.cartItemPrice}>₹{itemPrice.toFixed(2)}</Text>
        </View>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() =>
              handleQuantityChange(item.idMeal, item.quantity - 1)
            }
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>−</Text>
          </TouchableOpacity>

          <Text style={styles.quantityText}>{item.quantity}</Text>

          <TouchableOpacity
            onPress={() =>
              handleQuantityChange(item.idMeal, item.quantity + 1)
            }
            style={styles.quantityBtn}
          >
            <Text style={styles.quantityBtnText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleRemove(item.idMeal)}
            style={styles.deleteBtn}
          >
            <Text style={styles.deleteBtnText}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyText}>Your cart is empty!</Text>
        <Text style={styles.emptySubtext}>
          Add some delicious burgers to get started
        </Text>
        <TouchableOpacity
          style={styles.continueShopping}
          onPress={() => navigation.navigate('BurgerList')}
        >
          <Text style={styles.continueShoppingText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.idMeal}
        renderItem={renderCartItem}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>₹{totalPrice.toFixed(2)}</Text>
        </View>

        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={handleCheckout}
          activeOpacity={0.8}
        >
          <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.continueShoppingBtn}
          onPress={() => navigation.navigate('BurgerList')}
          activeOpacity={0.8}
        >
          <Text style={styles.continueShoppingBtnText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  },
  listContent: {
    padding: 12
  },
  cartItemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12
  },
  cartItemDetails: {
    flex: 1,
    marginRight: 8
  },
  cartItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  cartItemCategory: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  cartItemPrice: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ff6b35'
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4
  },
  quantityBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantityBtnText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b35'
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    minWidth: 25,
    textAlign: 'center'
  },
  deleteBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#ffebee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  deleteBtnText: {
    fontSize: 14
  },
  footer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee'
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff6b35'
  },
  checkoutBtn: {
    backgroundColor: '#ff6b35',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8
  },
  checkoutBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  continueShoppingBtn: {
    borderWidth: 1,
    borderColor: '#ff6b35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  continueShoppingBtnText: {
    color: '#ff6b35',
    fontSize: 14,
    fontWeight: '600'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa'
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 12
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginBottom: 24
  },
  continueShopping: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8
  },
  continueShoppingText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});