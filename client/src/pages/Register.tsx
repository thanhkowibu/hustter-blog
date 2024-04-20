import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/api/axios";
import BackButton from "@/components/BackButton";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // console.log(input);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", input);
      console.log("User has been successfully created");
      navigate("/login");
    } catch (err: any) {
      setError(err.response.data);
    }
  };

  return (
    <div className="bg-gradient-to-tr from-primary-dark via-primary-hust to-primary-light h-lvh flex flex-col justify-center items-center gap-4">
      <BackButton />
      <h1 className="text-primary-content scroll-m-20 text-3xl font-extrabold lg:text-4xl">
        Register Page
      </h1>
      <form className="flex flex-col p-6 bg-background-hust  w-72 gap-5 rounded-lg">
        <Input
          required
          placeholder="username"
          type="text"
          value={input.username}
          name="username"
          onChange={handleInputChange}
        />
        <Input
          required
          placeholder="email"
          type="email"
          value={input.email}
          name="email"
          onChange={handleInputChange}
        />
        <Input
          placeholder="password"
          type="password"
          value={input.password}
          name="password"
          onChange={handleInputChange}
        />
        <Button onClick={handleSubmit} variant="hust">
          Register
        </Button>
        {error && <p className="text-error text-sm">Error: {error}</p>}
        <span className="text-copy-light text-sm leading-none text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-copy font-medium hover:underline">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
