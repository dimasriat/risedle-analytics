import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

export function useGraph(q) {
  const [data, setData] = useState(null);
  useEffect(() => {
    const query = gql`
      ${q}
    `;
    request(
      "https://api.thegraph.com/subgraphs/name/dimasriat/risedle-dashboard",
      query
    ).then((json) => setData(json));
  }, [q]);
  const loading = !data;
  return { loading, data };
}
