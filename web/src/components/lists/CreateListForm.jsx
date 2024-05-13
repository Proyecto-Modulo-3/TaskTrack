import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateList } from "../../services/api.service";
import { useReloadContext } from "../../contexts/reload.context";
import "./CreateListForm.css";

function CreateListForm({ onClose }) {
  const [error, setError] = useState(null);
  const { reload } = useReloadContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleCreateList = async (data) => {
    try {
      await CreateList(data);
      reload();
      reset();
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="mx-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit(handleCreateList)}>
        <div className="mb-3">
          <label className="d-flex justify-content-center">Title</label>
          <input
            type="text"
            id="title"
            className={`form-control ${errors.title ? "is-invalid" : ""}`}
            {...register("title", {
              required: "Title is required",
            })}
          />
        </div>

        <div className="mb-3">
          <label className="d-flex justify-content-center">Color</label>
          <input
            type="color"
            id="color"
            className={`form-control ${errors.color ? "is-invalid" : ""}`}
            {...register("color", {
              required: "Color is required",
            })}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateListForm;
