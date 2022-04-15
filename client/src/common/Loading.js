import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="flex justify-center items-center space-x-4 text-white h-96 pt-40">
      <FontAwesomeIcon icon={faSpinner} spin={true} size="3x" />
      <div className="text-2xl font-semibold ">Loading</div>
    </div>
  );
};
export default Loading;
