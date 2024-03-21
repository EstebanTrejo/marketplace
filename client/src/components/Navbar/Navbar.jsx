import style from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/logo2.png";
const Navbar = () => {
  return (
    <nav>
      <div className={style.navbar}>
        <NavLink to="/">
          <img className={style.logo} src={Logo} alt="logo" />
        </NavLink>
        <div className={style.inputSearch}>
          <input type="text" placeholder="Busca tu producto" />
          <div className={style.lupa}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-search"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#000000"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
              <path d="M21 21l-6 -6" />
            </svg>
          </div>
          </div>

          <div className={style.icons}>
            <NavLink to="">
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000"
                  d="m12.1 18.55l-.1.1l-.11-.1C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5c1.54 0 3.04 1 3.57 2.36h1.86C13.46 6 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5c0 2.89-3.14 5.74-7.9 10.05M16.5 3c-1.74 0-3.41.81-4.5 2.08C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.41 2 8.5c0 3.77 3.4 6.86 8.55 11.53L12 21.35l1.45-1.32C18.6 15.36 22 12.27 22 8.5C22 5.41 19.58 3 16.5 3Z"
                />
              </svg>
            </NavLink>
            <NavLink to="/shoppingcart">
              <svg
                width="30"
                height="30"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="none">
                  <path d="M39 32H13L8 12h36l-5 20Z" />
                  <path
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                    d="M3 6h3.5L8 12m0 0l5 20h26l5-20H8Z"
                  />
                  <circle
                    cx="13"
                    cy="39"
                    r="3"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                  <circle
                    cx="39"
                    cy="39"
                    r="3"
                    stroke="#000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="4"
                  />
                </g>
              </svg>
            </NavLink>
            <NavLink to="/login">
              <svg
                width="26"
                height="26"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000000"
                  d="M10 8c1.7 0 3.06-1.35 3.06-3S11.7 2 10 2S6.94 3.35 6.94 5S8.3 8 10 8zm0 2c-2.8 0-5.06-2.24-5.06-5S7.2 0 10 0s5.06 2.24 5.06 5s-2.26 5-5.06 5zm-7 8h14v-1.33c0-1.75-2.31-3.56-7-3.56s-7 1.81-7 3.56V18zm7-6.89c6.66 0 9 3.33 9 5.56V20H1v-3.33c0-2.23 2.34-5.56 9-5.56z"
                />
              </svg>
            </NavLink>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
