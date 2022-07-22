import moment from "moment";
import Bar from "../components/Chart/Bar";
import Col from "../components/Col";
import Row from "../components/Row";
import { useGraph } from "../hooks/useGraph";
import { useFetch } from "../hooks/useFetch";

export default function Revenue() {
	const { data, loading } = useGraph(`
    {
		riseTokenHourDatas(orderBy: timestamp, first: 1000, orderDirection: desc) {
			id
			timestamp
			hourlyFeeETH
			hourlyFeeUSD
			totalPendingFees
		}
    }`);
	const { data: dataETH, loading: loadingETH } = useFetch(
		"https://api.coingecko.com/api/v3/coins/ethereum/market_chart?vs_currency=usd&days=30"
	);
	if (loading || loadingETH)
		return (
			<p>
				<b>loading data</b>
			</p>
		);
	const ethPriceUSD = parseFloat(
		dataETH.prices[dataETH.prices.length - 1][1]
	);
	const totalRevenueInETH = parseFloat(
		data.riseTokenHourDatas[0].totalPendingFees
	);
	const totalRevenueInUSD = parseFloat(totalRevenueInETH * ethPriceUSD);
	const dataDaily = [];
	const dataDailyObj = {};
	data.riseTokenHourDatas.forEach(({ timestamp, hourlyFeeUSD }) => {
		const dayTimestampFormated = moment
			.unix(parseInt(timestamp))
			.format("YYYY-MM-DD");
		const dayTimestamp = moment(dayTimestampFormated, "YYYY-MM-DD").unix();
		if (!dataDailyObj[dayTimestamp]) {
			dataDailyObj[dayTimestamp] = 0;
		}
		dataDailyObj[dayTimestamp] += parseFloat(hourlyFeeUSD);
	});
	Object.keys(dataDailyObj)
		.sort()
		.forEach((key) => {
			dataDaily.push({
				timestamp: parseInt(key),
				dailyFeeUSD: parseFloat(dataDailyObj[key]),
			});
		});
	return (
		<>
			<Row title={`Revenue`}>
				<Col>
					<Bar
						title="Revenue"
						subtitle={`Today`}
						data={[
							["Date", "Revenue in USD"],
							...data.riseTokenHourDatas
								.filter(
									(item) =>
										moment
											.unix(parseInt(item.timestamp))
											.format("YYYY-MM-DD") ===
										moment().format("YYYY-MM-DD")
								)
								.map((item) => ({
									timestamp: moment
										.unix(parseInt(item.timestamp))
										.format("HH:[00]"),
									hourlyFeeUSD: parseFloat(item.hourlyFeeUSD),
								}))
								.map((item) => Object.values(item))
								.reverse(),
						]}
					/>
				</Col>
				<Col>
					<Bar
						title="Revenue"
						subtitle="Daily"
						data={[
							["Date", "Revenue in USD"],
							...dataDaily
								.map((item) => ({
									timestamp: moment
										.unix(parseInt(item.timestamp))
										.format("DD MMM YY"),
									dailyFeeUSD: parseFloat(item.dailyFeeUSD),
								}))
								.map((item) => Object.values(item)),
						]}
					/>
					<table
						style={{ borderCollapse: "collapse", width: "100%" }}
					>
						<tr>
							<th
								style={{ border: "1px solid black" }}
								colSpan={2}
							>
								Total Revenue
							</th>
							<th style={{ border: "1px solid black" }}>
								ETH Price
							</th>
						</tr>
						<tr>
							<td style={{ border: "1px solid black" }}>
								{totalRevenueInETH.toFixed(4)} ETH
							</td>
							<td style={{ border: "1px solid black" }}>
								{totalRevenueInUSD.toFixed(2)} USD
							</td>
							<td style={{ border: "1px solid black" }}>
								{ethPriceUSD.toFixed(2)} USD
							</td>
						</tr>
					</table>
				</Col>
			</Row>
		</>
	);
}
