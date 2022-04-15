import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

const Warning = () => {
  return (
    <div className="flex justify-center items-center space-x-4 h-96">
      <FontAwesomeIcon
        className="text-warning"
        icon={faExclamationTriangle}
        size="2x"
      />
      <span className="text-2xl text-white ">
        Unable to find your location, please search for different one.
      </span>
    </div>
  );
};
export default Warning;
