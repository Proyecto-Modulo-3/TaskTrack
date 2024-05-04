import { useState } from "react";
import { useForm } from "react-hook-form";
import { createList } from "../../services/api.service";
import { useNavigate } from "react-router-dom";

function CreateListForm() {
  const [error, setError] = useState(null);
  const [list] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm({
    values: list,
  });

  function handleCreateList(data) {
    createList(data)
      .then((list) => {
        navigate(`lists/${list.id}`);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleCreateList}>
        <div className="mb-3">
          <label>Title</label>
          <input
            type="title"
            id="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", {
              required: "Title is required",
            })}
          />
        </div>

        <div className="mb-3">
          <label>Category</label>
          <input
            type="category"
            id="category"
            className={`form-control ${errors.category ? "is-invalid" : ""}`}
            {...register("category", {
              required: "Category is required",
            })}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}

export default CreateListForm;
