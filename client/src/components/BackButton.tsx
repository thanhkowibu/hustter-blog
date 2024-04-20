import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleClick = () => {
    navigate(-1);
  };
  return (
    <>
      {!isHome && (
        <div className="absolute z-10 top-4 left-4">
          <Button
            variant="hustsecondary"
            className=" rounded-full hover:border-background-hust"
            onClick={handleClick}
          >
            <FaArrowLeft className="object-cover" />
          </Button>
        </div>
      )}
    </>
  );
};

export default BackButton;
