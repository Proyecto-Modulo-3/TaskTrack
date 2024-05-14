import { useState } from "react";
import { createCard } from "../../services/api.service";
import { useReloadContext } from "../../contexts/reload.context";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddCard({ taskId }) {
  const { id } = useParams();
  const { reload } = useReloadContext();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [show, setShow] = useState(false);

  const handleCreateCard = async (data) => {
    try {
      await createCard(id, taskId, data);
      reload();
      reset();
      setShow(false);
    } catch (error) {
      setError("No list selected");
      console.log(error);
    }
  };

  const handleClose = async () => {
    setShow(false);
  };

  return (
    <div>
      {show && (
        <>
          <div>
            <form onSubmit={handleSubmit(handleCreateCard)}>
              <input
                type="text"
                id="text"
                name="text"
                placeholder="Card text"
                className={`form-control ${errors.text ? "is-invalid" : ""}`}
                {...register("text", {
                  required: "Text is required",
                })}
              />
              <div>
                <button type="submit">Add card</button>
                <button onClick={handleClose}>Close</button>
              </div>
            </form>
          </div>
        </>
      )}

      {!show && (
        <div>
          <button onClick={() => setShow(!show)}> + Add card</button>
        </div>
      )}
    </div>
  );
}

export default AddCard;
