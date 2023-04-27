import { Card, Button } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShooppingCartContext } from "../context/ShoppingCartContext";

type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
	const { getItemQuantity, decreaseCartQuantity, increaseCartQuantity, removeFromCart } = useShooppingCartContext();

	const quantity = getItemQuantity(id);

	return (
		<Card className="h-100">
			<Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }} />
			<Card.Body className="d-flex flex-column">
				<Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
					<span className="fs-2">{name}</span>
					<span className="text-muted">{formatCurrency(price)}</span>
				</Card.Title>

				<div className="mt-auto">
					{quantity === 0 ? (
						<>
							<Button onClick={() => increaseCartQuantity(id)} className="w-100">
								+ Add to cart
							</Button>
						</>
					) : (
						<>
							<div style={{ gap: "0.5rem" }} className="d-flex align-items-center flex-column">
								<div style={{ gap: "0.5rem" }} className="d-flex justify-center align-items-center">
									<Button onClick={() => decreaseCartQuantity(id)}>-</Button>
									<span className="fs-3">{quantity}</span>
									<Button onClick={() => increaseCartQuantity(id)}>+</Button>
								</div>
								<Button onClick={() => removeFromCart(id)} variant="danger" size="sm">
									Remove
								</Button>
							</div>
						</>
					)}
				</div>
			</Card.Body>
		</Card>
	);
};

export default StoreItem;
