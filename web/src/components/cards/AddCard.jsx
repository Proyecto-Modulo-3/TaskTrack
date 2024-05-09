// import React, { useEffect, useState } from 'react'
// import { createCard } from '../../services/api.service';
// import { useReloadContext } from '../../contexts/reload.context';
// import { useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

// function AddCard() {

//     const { id } = useParams();
//     const { reload } = useReloadContext();
//     const [error, setError] = useState(null);

//     const {
//         register,
//         handleSubmit,
//         reset,
//         formState: { errors },
//       } = useForm({ mode: "all" });
//     const [show, setShow] = useState(false);

//     const handleCreateCard = async (taskId, data) => {
//         try {
//           await createCard(id, taskId, data);
//           reload();
//           reset();
//         } catch (error) {
//           setError("No list selected");
//           console.log(error);
//         }
//       };

//   return (
//     <div>
//     {show && (
//         <>
//           <div>
//             <form onSubmit={handleSubmit(handleCreateCard)}>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 placeholder="Card title"
//                 className={`form-control ${
//                   errors.title ? "is-invalid" : ""
//                 }`}
//                 {...register("title", {
//                   required: "Title is required",
//                 })}
//               />
//               <div>
//                 <button type="submit">Add card</button>
//                 <button onClick={() => setShow(!show)}>Close</button>
//               </div>
//             </form>
//           </div>
//         </>
//       )}

//       {!show && (
//         <div>
//             <button
//               onClick={() => setShow(!show)}
//             >
//               {" "}
//               + Add card
//             </button>
//         </div>
//       )}
//       </div>
//   )
// }

// export default AddCard

import { useState } from "react";
import { createCard } from "../../services/api.service";
import { useReloadContext } from "../../contexts/reload.context";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddCard(taskId) {
  const { id, listId } = useParams();
  const { reload } = useReloadContext();
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "all" });
  const [show, setShow] = useState(false);

  const handleCreateCard = async (taskId, data) => {
    try {
      await createCard(id, listId, taskId, data);
      reload();
      reset();
    } catch (error) {
      setError("No list selected");
      console.log(error);
    }
  };

  return (
    <div>
      {show && (
        <>
          <div>
            <form onSubmit={handleSubmit(handleCreateCard)}>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Card title"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                {...register("title", {
                  required: "Title is required",
                })}
              />
              <div>
                <button type="submit">Add card</button>
                <button onClick={() => setShow(!show)}>Close</button>
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
