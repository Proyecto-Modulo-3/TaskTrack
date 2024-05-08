// OPCION 1
// Pillar las tasks de la lista (TaskDetail.jsx)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { listDetails, createTask } from "../../services/api.service";
import { useReloadContext } from "../../contexts/reload.context";
import Sidebar from "../ui/SideBar";
import { useForm } from "react-hook-form";
import AllTasks from "../tasks/AllTasks";

function ListDetail() {
  const { id } = useParams();
  const { reload } = useReloadContext();
  const [details, setDetails] = useState(null);
  const [error, setError] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [show, setShow] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await listDetails(id);
        setDetails(data);
      } catch (error) {
        setError("No tasks found.");
      }
    }
    fetch();
  }, [id]);

  const handleCreateTask = async (data) => {
    try {
      // const newTask = { title: taskTitle };
      await createTask(id, data);
      reload();
      reset();
    } catch (error) {
      setError("No list selected");
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-flex">
        <Sidebar />
        <div>
          <div className="d-flex flex-column">
            {show && (
              <>
                <div>
                  <AllTasks listId={id} />
                </div>
                <div>
                  <form onSubmit={handleSubmit(handleCreateTask)}>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      placeholder="Task title"
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className={`form-control ${
                        errors.title ? "is-invalid" : ""
                      }`}
                      {...register("title", {
                        required: "Title is required",
                      })}
                    />
                    <div>
                      <button type="submit">Add task</button>
                      <button onClick={() => setShow(!show)}>Close</button>
                    </div>
                  </form>
                </div>
              </>
            )}
            {!show && (
              <>
                <div className="d-flex flex-column">
                  <AllTasks listId={id} />
                  <button
                    onClick={() => setShow(!show)}
                    className="d-flex justify-content-start mt-1"
                  >
                    {" "}
                    + Add task
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ListDetail;
