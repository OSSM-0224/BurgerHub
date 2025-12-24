import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { RootState } from '../redux/store';
import { BurgerListScreen } from '../screens/BurgerListScreen';
import { BurgerDetailScreen } from '../screens/BurgerDetailScreen';
import { CartScreen } from '../screens/CartScreen';
import { Burger } from '../types';

// Type definitions for navigation
export type RootStackParamList = {
  BurgerList: undefined;
  BurgerDetail: { burger: Burger };
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Cart Icon Component with Badge
const CartIcon: React.FC<{
  cartCount: number;
  onPress: () => void;
}> = ({ cartCount, onPress }) => (
  <TouchableOpacity
    style={styles.cartIconContainer}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={styles.cartIcon}>🛒</Text>
    {cartCount > 0 && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {cartCount > 9 ? '9+' : cartCount}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

// Main Navigator
export const AppNavigator: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartCount = cartItems.length;

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerBackTitleVisible: false,
          headerRight: () => (
            <CartIcon
              cartCount={cartCount}
              onPress={() => navigation.navigate('Cart')}
            />
          )
        })}
      >
        <Stack.Screen
          name="BurgerList"
          component={BurgerListScreen}
          options={{
            title: '🍔 BurgerHub',
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTintColor: '#ff6b35',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 24
            }
          }}
        />

        <Stack.Screen
          name="BurgerDetail"
          component={BurgerDetailScreen}
          options={{
            title: 'Burger Details',
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTintColor: '#ff6b35',
            headerTitleStyle: {
              fontWeight: '600'
            }
          }}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{
            title: '🛒 My Cart',
            headerStyle: {
              backgroundColor: '#fff'
            },
            headerTintColor: '#ff6b35',
            headerTitleStyle: {
              fontWeight: '600'
            }
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  cartIconContainer: {
    marginRight: 16,
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cartIcon: {
    fontSize: 24
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: 0,
    backgroundColor: '#ff3b30',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff'
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center'
  }
});