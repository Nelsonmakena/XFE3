import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { LogIn } from "lucide-react";
import { InstructorLogin } from "@/store/auth";
import type { AppDispatch } from "@/store/store";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
interface loginData {
  email: string;
  password: string;
}
export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<loginData>({
    email: "",
    password: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const login = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(InstructorLogin(data)).then((results) => {
      if (results?.payload.success) {
        toast.add({ type: "success", description: results.payload.message });
      } else {
        toast.add({ type: "warning", description: results.payload.message });
      }
    });
  };
  return (
    <section className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl text-primary font-bold tracking-widest">
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
                placeholder="email"
                type="email"
                name="email"
                value={data.email}
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
          <Button type="submit" size={"lg"}>
            login <LogIn />
          </Button>
        </form>
      </div>
    </section>
  );
}
