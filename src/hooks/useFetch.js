import { useEffect, useState } from "react";

export function useFetch(url) {
	const [data, setData] = useState(null);
	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((res) => setData(res));
	}, [url]);
	const loading = !data;
	return { loading, data };
}
