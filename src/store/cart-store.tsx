import { createContext, useContext, useReducer } from 'react';

interface CartItem {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

interface CartAction {
  type: string;
  payload?: any;
}

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | null>(null);

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const updatedItems = [...state.items, action.payload];
      const updatedTotalAmount = updatedItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
      return {
        ...state,
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    case 'REMOVE_ITEM':
      const filteredItems = state.items.filter(item => item.id !== action.payload.id);
      const newTotalAmount = filteredItems.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
      return {
        ...state,
        items: filteredItems,
        totalAmount: newTotalAmount,
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};