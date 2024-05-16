import { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../contexts/auth.context";
import { NavLink, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';


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

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)} className="container mt-2">
  //     <div className="mb-3">
  //       <label>Email</label>
  //       <input
  //         type="email"
  //         id="email"
  //         className={`form-control ${errors.email ? "is-invalid" : ""}`}
  //         {...register("email", {
  //           required: "Email is required",
  //         })}
  //       />
  //       {/* {errors.email && (<div className="invalid-feedback">{errors.email.message}</div>)} */}
  //     </div>

  //     <div className="mb-3">
  //       <label>Password</label>
  //       <input
  //         type="password"
  //         id="password"
  //         className={`form-control ${errors.password ? "is-invalid" : ""}`}
  //         {...register("password", {
  //           required: "Password is required",
  //         })}
  //       />
  //       {/* {errors.password && (<div className="invalid-feedback">{errors.password}</div>)} */}
  //     </div>
  //     <button type="submit" className="btn btn-success mt-3">
  //       Login
  //     </button>
  //   </form>
  // );
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
    <MDBContainer fluid>

      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol col='12'>

          <MDBCard className='bg-dark text-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                
              <MDBInput wrapperClass='mt-4 mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='email' type='email' size="lg" className={`${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: "Email is required",
                })}/>

              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='password' type='password' size="lg" className={`${errors.password ? "is-invalid" : ""}`}
                {...register("password", {
                  required: "Password is required",
                })}/>

              <button type="submit" className="btn btn-success mt-3 mb-3">
                Login
              </button>

              <div>
                <p className="mb-0">Don't have an account? <NavLink to='/register' className="text-white-50 fw-bold">Sign Up</NavLink></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </form>
  );
}

export default Login;
