import { useForm } from "react-hook-form";
import { editProfile } from "../../services/api.service";
import AuthContext from "../../contexts/auth.context";

function EditProfileForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handelEditProfile = async (data) => {
    try {
        const response = await editProfile(userId, data);
        console.log("Profile updated:", response.data);
        reset();
    } catch (error) {
        console.error("An error happened while trying to update your changes:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handelEditProfile)}>
        <div>
          <label>Name</label>
          <input
            type="text"
            id="name"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", {
              required: "Name is required",
            })}
          />
        </div>

        <div>
          <label>Username</label>
          <input
            type="text"
            id="username"
            className={`form-control ${errors.username ? "is-invalid" : ""}`}
            {...register("username", {
              required: "Username is required",
            })}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            id="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            {...register("email", {
              required: "Email is required",
            })}
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            id="password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            {...register("password", {
              required: "Password is required",
            })}
          />
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
