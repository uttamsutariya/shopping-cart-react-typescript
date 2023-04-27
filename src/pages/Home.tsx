import { Link } from "react-router-dom";
const Home = () => {
	return (
		<div className="mt-5 text-white">
			<h1>React + Typescript Shopping Cart</h1>
			<h3>
				<Link to="/store">Go to store</Link>
			</h3>
		</div>
	);
};

export default Home;
