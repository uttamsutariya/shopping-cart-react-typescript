import { Offcanvas, Stack } from "react-bootstrap";
import { useShooppingCartContext } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import CartItem from "./CartItem";
import storeItems from "../data/items.json";

type ShoppingCartProp = {
	isOpen: boolean;
};

const ShoppingCart = ({ isOpen }: ShoppingCartProp) => {
	const { closeCart, cartItems } = useShooppingCartContext();

	const cartTotal = cartItems.reduce((cartTotal, cartItem) => {
		const item = storeItems.find((i) => i.id === cartItem.id);
		return cartTotal + (item?.price || 0) * cartItem.quantity;
	}, 0);

	return (
		<Offcanvas show={isOpen} placement="end" onHide={closeCart}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title>Cart</Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body>
				<Stack gap={3}>
					{cartItems.map((item) => (
						<CartItem key={item.id} {...item} />
					))}
					<div className="ms-auto fw-bold fs-5">Total: {formatCurrency(cartTotal)}</div>
				</Stack>
			</Offcanvas.Body>
		</Offcanvas>
	);
};

export default ShoppingCart;
