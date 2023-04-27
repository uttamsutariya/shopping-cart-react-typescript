import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShopingCartProviderProps = {
	children: ReactNode;
};

type ShoppingCartContext = {
	getItemQuantity(id: number): number;
	increaseCartQuantity(id: number): void;
	decreaseCartQuantity(id: number): void;
	removeFromCart(id: number): void;
	openCart(): void;
	closeCart(): void;
	cartQuantity: number;
	cartItems: CartItem[];
};

type CartItem = {
	id: number;
	quantity: number;
};

const shoppingCartContext = createContext({} as ShoppingCartContext);

export function useShooppingCartContext() {
	return useContext(shoppingCartContext);
}

export function ShopingCartProvider({ children }: ShopingCartProviderProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [cartItems, setCartItems] = useLocalStorage<CartItem[]>("shopping-cart", []);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

	function getItemQuantity(id: number) {
		return cartItems.find((item) => item.id === id)?.quantity || 0;
	}

	function increaseCartQuantity(id: number) {
		if (cartItems.find((item) => item.id === id) == null) {
			setCartItems([...cartItems, { id, quantity: 1 }]);
		} else {
			setCartItems(
				cartItems.map((item) => {
					if (item.id === id) {
						++item.quantity;
					}
					return item;
				})
			);
		}
	}

	function decreaseCartQuantity(id: number) {
		if (cartItems.find((item) => item.id === id)?.quantity === 1) {
			return setCartItems(cartItems.filter((item) => item.id !== id));
		} else {
			setCartItems(
				cartItems.map((item) => {
					if (item.id === id) {
						--item.quantity;
					}
					return item;
				})
			);
		}
	}

	function removeFromCart(id: number) {
		setCartItems(cartItems.filter((item) => item.id !== id));
	}

	return (
		<shoppingCartContext.Provider
			value={{
				increaseCartQuantity,
				decreaseCartQuantity,
				getItemQuantity,
				removeFromCart,
				cartQuantity,
				cartItems,
				openCart,
				closeCart,
			}}
		>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</shoppingCartContext.Provider>
	);
}
