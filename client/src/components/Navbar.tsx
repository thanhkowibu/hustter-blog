import { Link } from "react-router-dom";
import Logo from "../img/logo2.png";
import { Button } from "./ui/button";
import axios from "@/api/axios";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import BackButton from "./BackButton";
const Navbar = () => {
  const handleClick = async () => {
    await axios.get("/posts");
  };

  const { user, logout } = useContext(AuthContext);
  const categoryArray = [
    "Study",
    "Career",
    "Research",
    "Lifestyle",
    "Technology",
    "Entertainment",
    "Other",
  ];

  return (
    <div>
      <BackButton />
      <div className="flex justify-between py-4">
        <div>
          <Link to="/">
            <img src={Logo} alt="logo" className="w-40" />
          </Link>
        </div>
        <div className="flex flex-1 items-center">
          {categoryArray.map((category, index) => (
            <Button
              key={index}
              variant="link"
              size="default"
              className="text-copy"
              asChild
            >
              <Link to={`/?category=${category}`}>{category}</Link>
            </Button>
          ))}
        </div>
        <div className="flex gap-5 items-start mt-4 bg-blue-200/0">
          <div className="flex flex-col items-end bg-red-200/0">
            <span className=" font-bold">
              {user ? `Welcome back, ${user?.username}` : `Welcome guest`}
            </span>
            <div className="flex gap-4">
              {user ? (
                <Button
                  variant="link"
                  className="p-0 font-semibold h-min"
                  onClick={logout}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button variant="link" className="p-0 font-semibold h-min">
                    <Link to="/register">Register</Link>
                  </Button>
                  <Button variant="link" className="p-0 font-semibold h-min">
                    <Link to="/login">Login</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
          <Button
            variant="hust"
            className="font-bold"
            onClick={handleClick}
            asChild
          >
            <Link to={user ? "/write" : "/login"} state={null}>
              New post
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
