import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { createUser } from "../services/api.service";
import { useNavigate } from "react-router-dom";

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="container mt-2">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          required
          id="name"
          type="text"
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          {...register("name")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          required
          id="username"
          type="text"
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          {...register("username")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          required
          id="email"
          type="text"
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          {...register("email")}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          required
          id="password"
          type="password"
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          {...register("password")}
        />
      </div>
      <button type="submit" className="btn btn-success mt-3">
        Register
      </button>
    </form>
  );
}

export default Register;
