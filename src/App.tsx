import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Store from "./pages/Store";
import Navbar from "./components/Navbar";
import { ShopingCartProvider } from "./context/ShoppingCartContext";

const App = () => {
	return (
		<ShopingCartProvider>
			<Navbar />
			<Container className="d-flex justify-content-center align-items-center h-100">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/store" element={<Store />} />
				</Routes>
			</Container>
		</ShopingCartProvider>
	);
};

export default App;
