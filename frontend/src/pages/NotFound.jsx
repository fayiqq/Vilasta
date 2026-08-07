import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="page page-narrow empty-state">
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <Link to="/">Back to Explore</Link>
    </div>
  );
}