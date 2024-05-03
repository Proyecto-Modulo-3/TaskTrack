import { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/auth.context";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  const { doLogin } = useContext(AuthContext)
  
  const { register, handleSubmit, formState: { errors },} = useForm()

  async function onSubmit(data) {
    try {
      await doLogin(data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-2">
      <div>
        <label>Email</label>
        <input type="email" id="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} {...register('email')}/>
      </div>

      <div>
        <label>Password</label>
        <input type="password" id="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} {...register('password')}/>
      </div>
      <button type='submit' className="btn btn-success mt-3">Login</button>
    </form>

  );
}

export default Login;
