import { useState } from "react";
import { useForm } from "react-hook-form";
import { CreateList } from "../../services/api.service";
import { useReloadContext } from "../../contexts/reload.context";

function CreateListForm({ lists, setLists }) {
  const [error] = useState(null);
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
    } catch (error) {
      console.log(error);
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
          <label className="d-flex justify-content-center">Category</label>
          <input
            type="text"
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
