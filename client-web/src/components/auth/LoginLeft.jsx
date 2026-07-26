import Logo from "../common/Logo";
import loginImage from "../../assets/login.svg";

const LoginLeft = () => {
  return (
    <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-700 to-indigo-800 text-white flex-col justify-between px-12 py-10">

      <div>

        <Logo />

        <div className="mt-16">

          

        </div>

      </div>

      <div className="flex justify-center">

        <img
          src={loginImage}
          alt="BusinessHub"
          className="w-[430px]"
        />

      </div>

      <p className="text-sm text-blue-100">
        © 2026 BusinessHub. All rights reserved.
      </p>

    </div>
  );
};

export default LoginLeft;