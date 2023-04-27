import StoreItem from "../components/StoreItem";
import storeItems from "../data/items.json";
import { Row, Col } from "react-bootstrap";

const Store = () => {
	return (
		<>
			<div className="d-flex flex-column">
				<h1 className="text-white">Store</h1>
				<Row md={2} xs={1} lg={3} className="g-3 mb-5">
					{storeItems.map((item) => (
						<Col key={item.id}>
							<StoreItem {...item} />
						</Col>
					))}
				</Row>
			</div>
		</>
	);
};

export default Store;
