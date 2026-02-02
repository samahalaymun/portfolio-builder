import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/">
      <div className="flex items-center">
        <span className="text-xl font-extrabold uppercase tracking-wider">
          Porti<span className="text-primary text-xl">fy</span>
        </span>
      </div>
    </Link>
  );
}

export default Logo;
