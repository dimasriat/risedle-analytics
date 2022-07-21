import React from "react";
import { Chart } from "react-google-charts";

export default function Bar(props) {
	const { title, subtitle, data } = props;
	return (
		<Chart
			chartType="Bar"
			width="100%"
			height="300px"
			data={data}
			options={{
				chart: {
					title,
					subtitle,
				},
				legend: {
					position: "none",
				},
			}}
		/>
	);
}
