import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const homeIcon = (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="bookmark"
    className="svg-inline--fa fa-bookmark fa-w-12"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 384 512"
  >
    <path
      fill="currentColor"
      d="M0 512V48C0 21.49 21.49 0 48 0h288c26.51 0 48 21.49 48 48v464L192 400 0 512z"
    ></path>
  </svg>
);

const Header = ({ pageType }) => {
  return (
    <div
      className="bg-white flex justify-between items-center h-16 pl-5 pr-3
     border-b shadow-sm"
    >
      <div className="flex text-primary items-center text-3xl space-x-5">
        <div className="focus:outline-none ">
          <Link to={"/"}>{homeIcon}</Link>
        </div>
        <span className="text-xl md:text-3xl font-bold">{pageType}</span>
      </div>
      <button className="text-2xl px-2 py-1 rounded-full text-primary hover:bg-primary hover:text-white ">
        <FontAwesomeIcon icon={faPowerOff} />
      </button>
    </div>
  );
};

export default Header;
