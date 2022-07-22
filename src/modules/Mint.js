import moment from "moment";
import Bar from "../components/Chart/Bar";
import Col from "../components/Col";
import Row from "../components/Row";
import WalletLink from "../components/WalletLink";
import { useGraph } from "../hooks/useGraph";

export default function Mint() {
	const { data, loading } = useGraph(`
    {
		mints(orderBy: timestamp, first: 1000, orderDirection: desc) {
			id
			sender {
				id
			}
			timestamp
			mintedAmount
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
	data.mints.forEach(({ timestamp, mintedAmount }) => {
		const dayTimestampFormated = moment
			.unix(parseInt(timestamp))
			.format("YYYY-MM-DD");
		const dayTimestamp = moment(dayTimestampFormated, "YYYY-MM-DD").unix();
		if (!dataDailyObj[dayTimestamp]) {
			dataDailyObj[dayTimestamp] = 0;
		}
		dataDailyObj[dayTimestamp] += parseFloat(mintedAmount);
	});
	Object.keys(dataDailyObj)
		.sort()
		.forEach((key) => {
			dataDaily.push({
				timestamp: parseInt(key),
				mintedAmount: parseFloat(dataDailyObj[key]),
			});
		});
	return (
		<>
			<Row title="Mint">
				<Col>
					<table
						style={{ borderCollapse: "collapse", width: "100%" }}
					>
						<tr>
							<td
								style={{ border: "1px solid black" }}
								colSpan={3}
							>
								Today mints
							</td>
						</tr>
						<tr>
							<td style={{ border: "1px solid black" }}>Time</td>
							<td style={{ border: "1px solid black" }}>
								Address
							</td>
							<td style={{ border: "1px solid black" }}>
								Minted Amount (ETHRISE)
							</td>
						</tr>
						{data.mints
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
										<WalletLink address={item.sender.id}/>
									</td>
									<td style={{ border: "1px solid black" }}>
										{parseFloat(item.mintedAmount).toFixed(
											4
										)}
									</td>
								</tr>
							))}
					</table>
				</Col>
				<Col>
					<Bar
						title="Mint"
						subtitle="Daily"
						data={[
							["Date", "Minted amount (ETHRISE)"],
							...dataDaily
								.map((item) => ({
									timestamp: moment
										.unix(parseInt(item.timestamp))
										.format("DD MMM YY"),
									amountUSD: parseFloat(item.mintedAmount),
								}))
								.map((item) => Object.values(item)),
						]}
					/>
				</Col>
			</Row>
		</>
	);
}
