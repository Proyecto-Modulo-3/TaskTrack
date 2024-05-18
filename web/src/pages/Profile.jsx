import { useContext, useState } from "react";
import AuthContext from "../contexts/auth.context";
import { Card, Avatar, Typography } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { editProfile, deleteAccount } from "../services/api.service";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;
const { Title } = Typography;

function Profile() {
  const { user, doLogout } = useContext(AuthContext);
  const [show, setShow] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  if (!user) {
    return <div>Cargando...</div>;
  }

  const handleClose = async () => {
    setShow(false);
  };

  const handelEditProfile = async (data) => {
    try {
      const response = await editProfile(user.id, data);
      console.log("Profile updated:", response.data);
      setShow(false);
      reset();
      window.location.reload();
    } catch (error) {
      console.error(
        "An error happened while trying to update your changes:",
        error
      );
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(user.id);
      doLogout();
    } catch(error) {
      console.error(error)
    }
  }

  return (
    <div className="mt-5 d-flex justify-content-center">
      <Card
        style={{ width: 300, marginTop: 16 }}
        cover={<img alt="user avatar" src={user.avatar} />}
      >
        <Meta
          avatar={<Avatar src={user.avatar} />}
          title={<Title level={3}>{user.name}</Title>}
          description={
            <div>
              <p>
                <UserOutlined /> {user.username}
              </p>
              <p>
                <MailOutlined /> {user.email}
              </p>
            </div>
          }
        />
        {!show && (
          <div className="mt-5 d-flex justify-content-center">
            <button onClick={() => setShow(!show)}>Edit</button>
            <button onClick={handleDeleteAccount}>Delete</button>
          </div>
        )}
        {show && (
          <div className="mt-4 d-flex justify-content-center">
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
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
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
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </div>
              <button type="submit">Confirm</button>
              <button onClick={handleClose}>Close</button>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Profile;
