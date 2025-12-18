import { Link } from "react-router";

export default function Logo() {
  return (
    <div>
      <Link to="/">
        <h2 className="text-2xl font-bold">Fabrico</h2>
      </Link>
    </div>
  );
}
