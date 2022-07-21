import moment from "moment";
import Bar from "../components/Chart/Bar";
import Col from "../components/Col";
import Row from "../components/Row";
import { useGraph } from "../hooks/useGraph";

export default function DauMau() {
	const { data, loading } = useGraph(`
    {
      dailyActiveUsers(orderBy: timestamp, first: 1000) {
        id
        timestamp
        uniqueUsersCount
      }
	  
      monthlyActiveUsers(orderBy: timestamp, first: 1000) {
        id
        timestamp
        uniqueUsersCount
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
		<Row title="Daily and Monthly Active User">
			<Col>
				<Bar
					title="Daily Active User"
					subtitle="Unique user count"
					data={[
						["Date", "User Count"],
						...data.dailyActiveUsers
							.map((item) => ({
								timestamp: moment
									.unix(parseInt(item.timestamp))
									.format("DD MMM YYYY"),
								uniqueUsersCount: parseInt(
									item.uniqueUsersCount
								),
							}))
							.map((item) => Object.values(item)),
					]}
				/>
			</Col>
			<Col>
				<Bar
					title="Monthly Active User"
					subtitle="Unique user count"
					data={[
						["Date", "User Count"],
						...data.monthlyActiveUsers
							.map((item) => ({
								timestamp: moment
									.unix(parseInt(item.timestamp))
									.format("MMM YYYY"),
								uniqueUsersCount: parseInt(
									item.uniqueUsersCount
								),
							}))
							.map((item) => Object.values(item)),
					]}
				/>
			</Col>
		</Row>
	);
}
