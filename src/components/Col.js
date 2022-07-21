import React from "react";

export default function Col(props) {
	return (
		<div style={{ width: "100%", padding: "0 1rem 1rem" }}>
			{props.children}
		</div>
	);
}
