import React from "react";

export default function Row(props) {
	return (
		<div>
			<h1 className="m-1 pb-8 text-center font-bold text-2xl">
				{props.title}
			</h1>
			<div className="w-full flex flex-col-reverse lg:flex-row mt-2 mb-8">
				{props.children}
			</div>
		</div>
	);
}
