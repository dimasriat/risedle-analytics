import React from "react";
import { Chart } from "react-google-charts";

export default function Line(props) {
	const { title, subtitle, data } = props;
	return (
		<Chart
			chartType="Line"
			width="100%"
			height="400px"
			data={data}
			options={{
				chart: {
					title,
					subtitle,
				},
				legend: {
					position: "none",
				},
				series: (() => {
					const series = {};
					for (let i = 1; i < data[0].length; i++) {
						const obj = { axis: data[0][i] };
						series[i - 1] = obj;
					}
					return series;
				})(),
				axes: (() => {
					const y = {};
					for (let i = 1; i < data[0].length; i++) {
						y[data[0][i]] = { label: data[0][i] };
					}
					return { y };
				})(),
			}}
		/>
	);
}
