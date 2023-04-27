import { Stack, Button } from "react-bootstrap";
import { useShooppingCartContext } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
	id: number;
	quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
	const { removeFromCart } = useShooppingCartContext();

	const item = storeItems.find((i) => i.id === id);

	if (item == null) return null;

	return (
		<Stack direction="horizontal" gap={2} className="d-flex align-items-center">
			<img src={item.imgUrl} alt={item.name} style={{ width: "125px", height: "75px", objectFit: "cover" }} />
			<div className="me-auto">
				<div>
					{item.name}{" "}
					{quantity > 1 && (
						<span style={{ fontSize: ".65rem" }} className="text-mutes">
							x{quantity}
						</span>
					)}
				</div>
				<div className="text-muted" style={{ fontSize: ".75rem" }}>
					{formatCurrency(item.price)}
				</div>
			</div>
			<div>{formatCurrency(item.price * quantity)}</div>
			<Button variant="outline-danger" onClick={() => removeFromCart(item.id)}>
				&times;
			</Button>
		</Stack>
	);
};

export default CartItem;
