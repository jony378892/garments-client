import { useParams } from "react-router";

export default function TrackOrder() {
  const params = useParams();
  console.log(params);
  return <div></div>;
}
