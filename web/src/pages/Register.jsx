import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../services/api.service";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';

function Register() {
  const latitude = useRef(0);
  const longitude = useRef(0);
  const ref = useRef(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // OPCIONAL
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(ref.current);
      latitude.current = position.coords.latitude;
      longitude.current = position.coords.longitude;
    });
  }, []);

  async function onSubmit(data) {
    try {
      await createUser({
        ...data,
        location: {
          type: "Point",
          coordinates: [latitude.current, longitude.current],
        },
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  // return (
  //   <form onSubmit={handleSubmit(onSubmit)} className="container mt-2">
  //     <div className="mb-3">
  //       <label htmlFor="name" className="form-label">
  //         Name
  //       </label>
  //       <input
  //         required
  //         id="name"
  //         type="text"
  //         className={`form-control ${errors.name ? "is-invalid" : ""}`}
  //         {...register("name")}
  //       />
  //     </div>
  //     <div className="mb-3">
  //       <label htmlFor="username" className="form-label">
  //         Username
  //       </label>
  //       <input
  //         required
  //         id="username"
  //         type="text"
  //         className={`form-control ${errors.username ? "is-invalid" : ""}`}
  //         {...register("username")}
  //       />
  //     </div>
  //     <div className="mb-3">
  //       <label htmlFor="email" className="form-label">
  //         Email
  //       </label>
  //       <input
  //         required
  //         id="email"
  //         type="text"
  //         className={`form-control ${errors.email ? "is-invalid" : ""}`}
  //         {...register("email")}
  //       />
  //     </div>
  //     <div className="mb-3">
  //       <label htmlFor="password" className="form-label">
  //         Password
  //       </label>
  //       <input
  //         required
  //         id="password"
  //         type="password"
  //         className={`form-control ${errors.password ? "is-invalid" : ""}`}
  //         {...register("password")}
  //       />
  //     </div>
  //     <button type="submit" className="btn btn-success mt-3">
  //       Register
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

              <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                
              <MDBInput wrapperClass='mt-4 mb-4 mx-5 w-100' labelClass='text-white' label='Name' id='name' type='text' size="lg" className={`${errors.name ? "is-invalid" : ""}`}
                {...register("name", {
                  required: "Name is required",
                })}/>
              <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-white' label='Username' id='username' type='text' size="lg" className={`${errors.username ? "is-invalid" : ""}`}
                {...register("username", {
                  required: "Username is required",
                })}/>
              <MDBInput wrapperClass='mt-4 mb-4 mx-5 w-100' labelClass='text-white' label='Email address' id='email' type='email' size="lg" className={`${errors.email ? "is-invalid" : ""}`}
                {...register("email", {
                  required: "Email is required",
                })}/>
                
                <MDBInput wrapperClass='mt-4 mb-4 mx-5 w-100' labelClass='text-white' label='Password' id='password' type='password' size="lg" className={`${errors.password ? "is-invalid" : ""}`}
                {...register("password", {
                  required: "Password is required",
                })}/>

              <button type="submit" className="btn btn-success mt-3 mb-3">
                Login
              </button>

              <div>
                <p className="mb-0">Already have an account? <NavLink to='/login' className="text-white-50 fw-bold">Login</NavLink></p>

              </div>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </form>
  );
}

export default Register;
