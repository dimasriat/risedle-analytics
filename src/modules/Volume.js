import moment from "moment";
import Bar from "../components/Chart/Bar";
import Col from "../components/Col";
import Row from "../components/Row";
import { useGraph } from "../hooks/useGraph";

export default function Volume() {
	const { data, loading } = useGraph(`
    {
		riseTokenDayDatas(orderBy: timestamp, first: 1000) {
			id
			timestamp
			dailyVolumeETH
			dailyVolumeUSD
		}
    }
  `);
	if (loading)
		return (
			<p>
				<b>loading... 🙏</b>
			</p>
		);
	return (
		<>
			<Row title="Volume">
				<Col>
					<Bar
						title="Volume"
						subtitle="in ETH"
						data={[
							["Date", "Volume in ETH"],
							...data.riseTokenDayDatas
								.map((item) => ({
									timestamp: moment
										.unix(parseInt(item.timestamp))
										.format("DD MMM YY"),
									hourlyFeeUSD: parseFloat(
										item.dailyVolumeETH
									),
								}))
								.map((item) => Object.values(item)),
						]}
					/>
				</Col>
				<Col>
					<Bar
						title="Volume"
						subtitle="in USD"
						data={[
							["Date", "Volume in USD"],
							...data.riseTokenDayDatas
								.map((item) => ({
									timestamp: moment
										.unix(parseInt(item.timestamp))
										.format("DD MMM YY"),
									hourlyFeeUSD: parseFloat(
										item.dailyVolumeUSD
									),
								}))
								.map((item) => Object.values(item)),
						]}
					/>
				</Col>
			</Row>
		</>
	);
}
