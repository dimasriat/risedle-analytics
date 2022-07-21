import Layout from "../components/layouts";
import DauMau from "../modules/DauMau";
import PriceComparison from "../modules/PriceComparison";
import Volume from "../modules/Volume";
import Mint from "../modules/Mint";
import Revenue from "../modules/Revenue";
import Deposit from "../modules/Deposit";

export default function Home() {
	return (
		<Layout>
			<PriceComparison />
			<DauMau />
			<Volume />
			<Mint />
			<Deposit />
			<Revenue />
		</Layout>
	);
}
