import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LogIn } from "lucide-react";
import { adminLogin } from "@/store/auth";
import type { AppDispatch } from "@/store/store";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { useNavigate } from "react-router";

export default function AdminLogin() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const login = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = await dispatch(adminLogin(data));
    if (results.payload?.success) {
      toast.add({ type: "success", description: results.payload.message });
      navigate("/admin/home");
    } else {
      toast.add({
        type: "warning",
        description: results.payload?.message ?? "Something went wrong",
      });
    }
  };
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl text-secondary font-bold tracking-widest">
        Welcome
      </h2>
      <div className=" md:w-96 w-80 ">
        <form
          onSubmit={(e) => login(e)}
          className="flex flex-col  h-52 justify-between"
        >
          <div className="flex flex-col gap-normal mt-2">
            <div className="px-3">
              <Input
                placeholder="username"
                type="text"
                name="username"
                value={data.username}
                onChange={handleInput}
                required
              ></Input>
            </div>
            <div className="px-3">
              <Input
                placeholder="password"
                type="password"
                name="password"
                required
                value={data.password}
                onChange={handleInput}
              ></Input>
            </div>
          </div>
          <Button type="submit" size={"lg"} className="h-11">
            login <LogIn />
          </Button>
        </form>
      </div>
    </section>
  );
}
