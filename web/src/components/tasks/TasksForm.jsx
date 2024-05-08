// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import { createTask } from "../../services/api.service";
// import { useReloadContext } from "../../contexts/reload.context";
// import Sidebar from "../ui/SideBar";

// function TasksForm() {
//   const { reload } = useReloadContext();
//   const [error, setError] = useState();
//   const [card, setCard] = useState();
//   const [show, setShow] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({ mode: "all" });

//   const handleCreateTask = async (data) => {
//     try {
//       await createTask(data);
//       reload();
//       reset();
//     } catch (error) {
//       setError("No list selected");
//       console.log(error);
//     }
//   };

//   return (
//     <div className="d-flex">
//       <div className="row">
//         <div className="col-sm-12">
//           <div className="card">
//             <div className="card-body">
//               <h5 className="card-title">Add task</h5>
//               <div className="mx-5">
//                 {error && <div className="alert alert-danger">{error}</div>}
//                 <div>
//                 <div className="d-flex flex-column">
//             {show && (
//               <div>
//                 <form onSubmit={handleSubmit(handleCreateTask)}>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     placeholder="Task title"
//                     onChange={(e) => setTaskTitle(e.target.value)}
//                     className={`form-control ${
//                       errors.title ? "is-invalid" : ""
//                     }`}
//                     {...register("title", {
//                       required: "Title is required",
//                     })}
//                   />
//                   <div>
//                     <button type="submit">Add task</button>
//                     <button onClick={() => setShow(!show)}>Close</button>
//                   </div>
//                 </form>
//               </div>
//             )}
//             {!show && (
//               <button
//                 onClick={() => setShow(!show)}
//                 className="d-flex justify-content-start mt-1"
//               >
//                 {" "}
//                 + Add task
//               </button>
//             )}
//           </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TasksForm;
