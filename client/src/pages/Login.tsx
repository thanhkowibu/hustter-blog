import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import { Loading } from "@/components/Loading";
import BackButton from "@/components/BackButton";

const Login = () => {
  const [input, setInput] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // await axios.post("/auth/login", input, { withCredentials: true });
      await login(input);
      console.log("You are now logged in");
      navigate("/");
    } catch (err: any) {
      setError(err.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-primary-dark via-primary-hust to-primary-light h-lvh flex flex-col justify-center items-center gap-4">
      <BackButton />
      {isLoading && <Loading />}
      <h1 className="text-primary-content scroll-m-20 text-4xl font-extrabold lg:text-5xl">
        Login Page
      </h1>
      <form className="flex flex-col p-6 bg-background-hust w-72 gap-5 rounded-lg">
        <Input
          placeholder="username or email"
          name="username"
          onChange={handleInputChange}
        />
        <Input
          placeholder="password"
          name="password"
          onChange={handleInputChange}
          type="password"
        />
        <Button variant="hust" onClick={handleSubmit}>
          Login
        </Button>
        {error && <p className="text-error text-sm">Error: {error}</p>}
        <span className="text-copy-light text-sm leading-none text-center">
          Dont have an account?{" "}
          <Link
            to="/register"
            className="text-copy font-medium hover:underline"
          >
            Register
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
