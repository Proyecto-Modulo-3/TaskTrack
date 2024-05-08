import { useForm } from "react-hook-form";
import { useState } from "react";
import { createTask } from "../../services/api.service";
import { useReloadContext } from "../../contexts/reload.context";
import Sidebar from "../ui/SideBar";

function TasksForm() {
  const { reload } = useReloadContext();
  const [error, setError] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  const handleCreateTask = async (data) => {
    try {
      await createTask(data);
      reload();
      reset();
    } catch (error) {
      setError("No list selected");
      console.log(error);
    }
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Add task</h5>
              <div className="mx-5">
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit(handleCreateTask)}>
                  <div className="mb-3">
                    <label className="d-flex justify-content-center">
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TasksForm;
