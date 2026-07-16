import LoginLeft from "../../components/auth/LoginLeft";
import LoginForm from "../../components/auth/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex bg-slate-100">
      <LoginLeft />
      <LoginForm />
    </div>
  );
};

export default Login;