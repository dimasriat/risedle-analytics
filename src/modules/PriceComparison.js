import moment from "moment";
import Line from "../components/Chart/Line";
import Col from "../components/Col";
import Row from "../components/Row";
import { useFetch } from "../hooks/useFetch";

export default function PriceComparison() {
	const { data: dataETH, loading: loadingETH } = useFetch(
		"https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30"
	);
	const { data: dataETHRISE, loading: loadingETHRISE } = useFetch(
		"https://snapshot-arbitrum.risedle.com/v1/leveragedTokens/monthly/0x46D06cf8052eA6FdbF71736AF33eD23686eA1452"
	);
	const { data: dataFLI, loading: loadingFLI } = useFetch(
		"https://api.coingecko.com/api/v3/coins/eth-2x-flexible-leverage-index/market_chart?vs_currency=usd&days=30"
	);

	if (loadingETHRISE || loadingETH || loadingFLI)
		return (
			<p>
				<b>loading... 🙏</b>
			</p>
		);

	return (
		<>
			<Row title="Price Comparison">
				<Col>
					<Line
						title="Price Comparison"
						subtitle="ETH vs ETHRISE"
						data={[
							["date", "ETH Price", "ETHRISE Price"],
							...dataETHRISE.map((item, index) => [
								moment(item.timestamp).format("DD MMM YY"),
								parseFloat(dataETH.prices[index][1]),
								parseFloat(item.nav),
							]),
						]}
					/>
				</Col>
				<Col>
					<Line
						title="Price Comparison"
						subtitle="ETH vs ETH2X-FLI"
						data={[
							["date", "ETH Price", "ETH2X-FLI Price"],
							...dataFLI.prices.map((item, index) => [
								moment(item[0]).format("DD MMM YY"),
								parseFloat(dataETH.prices[index][1]),
								parseFloat(item[1]),
							]),
						]}
					/>
				</Col>
				<Col>
					<Line
						title="Price Comparison"
						subtitle="ETH2X-FLI vs ETHRISE"
						data={[
							["date", "ETH2X-FLI Price", "ETHRISE Price"],
							...dataETHRISE.map((item, index) => [
								moment(item.timestamp).format("DD MMM YY"),
								parseFloat(dataFLI.prices[index][1]),
								parseFloat(item.nav),
							]),
						]}
					/>
				</Col>
			</Row>
		</>
	);
}
