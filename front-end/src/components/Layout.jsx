import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Layout(props) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <header>
        {location.pathname === "/" ? (
          <button onClick={navigate.bind(null, 0)}>Restart Game</button>
        ) : (
          <Link to={"/"}>
            <button>Restart Game</button>
          </Link>
        )}

        <Link to="/results">
          <button>View Best Times</button>
        </Link>
      </header>

      <div>{props.children}</div>
    </>
  );
}
