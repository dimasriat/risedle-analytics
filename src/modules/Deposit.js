import moment from "moment";
import Bar from "../components/Chart/Bar";
import Col from "../components/Col";
import Row from "../components/Row";
import { useGraph } from "../hooks/useGraph";
import WalletLink from "../components/WalletLink";

export default function Deposit() {
	const { data, loading } = useGraph(`
    {
		deposits(orderBy: timestamp, first: 1000, orderDirection: desc) {
			id
			sender {
				id
			}
			timestamp
			amountUSD
		}
    }`);

	if (loading)
		return (
			<p>
				<b>loading data</b>
			</p>
		);
	const dataDaily = [];
	const dataDailyObj = {};
	data.deposits.forEach(({ timestamp, amountUSD }) => {
		const dayTimestampFormated = moment
			.unix(parseInt(timestamp))
			.format("YYYY-MM-DD");
		const dayTimestamp = moment(dayTimestampFormated, "YYYY-MM-DD").unix();
		if (!dataDailyObj[dayTimestamp]) {
			dataDailyObj[dayTimestamp] = 0;
		}
		dataDailyObj[dayTimestamp] += parseFloat(amountUSD);
	});
	Object.keys(dataDailyObj)
		.sort()
		.forEach((key) => {
			dataDaily.push({
				timestamp: parseInt(key),
				amountUSD: parseFloat(dataDailyObj[key]),
			});
		});
	return (
		<>
			<Row title="Deposit">
				<Col>
					<table
						style={{ borderCollapse: "collapse", width: "100%" }}
					>
						<tr>
							<td
								style={{ border: "1px solid black" }}
								colSpan={3}
							>
								Today deposits
							</td>
						</tr>
						<tr>
							<td style={{ border: "1px solid black" }}>Time</td>
							<td style={{ border: "1px solid black" }}>
								Address
							</td>
							<td style={{ border: "1px solid black" }}>
								Amount (USDC)
							</td>
						</tr>
						{data.deposits
							.filter(
								(item) =>
									moment
										.unix(parseInt(item.timestamp))
										.format("YYYY-MM-DD") ===
									moment().format("YYYY-MM-DD")
							)
							.reverse()
							.map((item, index) => (
								<tr key={index}>
									<td style={{ border: "1px solid black" }}>
										{moment
											.unix(parseInt(item.timestamp))
											.format("HH:mm")}
									</td>
									<td style={{ border: "1px solid black" }}>
										<WalletLink address={item.sender.id} />
									</td>
									<td style={{ border: "1px solid black" }}>
										{parseFloat(item.amountUSD).toFixed(2)}
									</td>
								</tr>
							))}
					</table>
				</Col>
				<Col>
					<Bar
						title="Deposit"
						subtitle="Daily"
						data={[
							["Date", "Amount (USDC)"],
							...dataDaily
								.map((item) => ({
									timestamp: moment
										.unix(parseInt(item.timestamp))
										.format("DD MMM YY"),
									amountUSD: parseFloat(item.amountUSD),
								}))
								.map((item) => Object.values(item)),
						]}
					/>
				</Col>
			</Row>
		</>
	);
}
