import React from "react";

export default function Row(props) {
	return (
		<a
			href={"https://arbiscan.io/address/" + props.address}
			target="_blank"
			rel="noreferrer"
			className="text-blue-500 underline"
		>
			{props.address.slice(0, 6) + "..." + props.address.slice(props.address.length - 4)}
		</a>
	);
}
