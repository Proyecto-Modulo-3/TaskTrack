import { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { doLogin } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    try {
      await doLogin(data);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-2">
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          id="email"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...register("email", {
            required: "Email is required",
          })}
        />
        {/* {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)} */}
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          id="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          {...register("password", {
            required: "Password is required",
          })}
        />
        {/* {errors.password && (<div className="invalid-feedback">{errors.password}</div>)} */}
      </div>
      <button type="submit" className="btn btn-success mt-3">
        Login
      </button>
    </form>
  );
}

export default Login;
