import React, { useEffect, useState, useContext } from "react";
import { getLists, deleteList, editList } from "../../services/api.service";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useReloadContext } from "../../contexts/reload.context";
import AuthContext from "../../contexts/auth.context";

function AllLists({ title, category, darkMode }) {
  const [lists, setLists] = useState([]);
  const [editingListId, setEditingListId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const navigate = useNavigate();
  const { now, reload } = useReloadContext();
  const { user } = useContext(AuthContext);
  

  useEffect(() => {
    async function fetchLists() {
      const query = {};
      if (title) query.title = title;
      if (category) query.category = category;
      try {
        const { data: fetchedLists } = await getLists(query);
        const listsOwnedBy = fetchedLists.map((list) => ({
          ...list,
          owner: list.owner.id,
        }));
        setLists(listsOwnedBy);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLists();
  }, [title, category, now, user, reload]);

  const handleDeleteList = async (listId) => {
    try {
      await deleteList(listId);
      setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditList = async (listId) => {
    try {
      await editList(listId, { title: editedTitle });
      setEditingListId(null);
      setEditedTitle("");
      reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event) => {
    setEditedTitle(event.target.value);
  };

  return (
    <div>
      {lists.map((list) => (
        <div key={list.id}>
          {editingListId === list.id ? (
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={handleInputChange}
              />
              <button onClick={() => handleEditList(list.id)}>Save</button>
            </div>
          ) : (
            <div className="d-flex justify-content-between mx-2 mt-2 align-items-center">
              <div
                style={{
                  backgroundColor: list.color,
                  padding: "10px",
                  marginRight: "5px",
                  borderRadius: "5px",
                  width: "35px",
                  height: "35px",
                }}
              ></div>
              <NavLink className='text-decoration-none text-white' to={`/lists/${list.id}`}>{list.title}</NavLink>
               {/* <button
                onClick={() => {
                  navigate(`/lists/${list.id}`);
                }}              >
                {list.title}
              </button> */}
              <div className="d-flex">
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteList(list.id)}
                  className="fa fa-trash m-2"
                  aria-hidden="true"
                ></i>
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setEditingListId(list.id);
                    setEditedTitle(list.title);
                  }}
                  className="fa fa-pencil-square-o m-2"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          )}

          {window.location.pathname === '/calendar' && (
            <div className="d-flex justify-content-between mx-2 mt-2 align-items-center">
              <div
                style={{
                  backgroundColor: list.color,
                  padding: "10px",
                  marginRight: "5px",
                  borderRadius: "5px",
                  width: "35px",
                  height: "35px",
                }}
              ></div>
              <NavLink className='text-decoration-none text-white' to={`/lists/${list.id}`}>{list.title}</NavLink>
              <div className="d-flex">
                <i
                  style={{ cursor: "pointer" }}
                  className="fa fa-eye m-2"
                  aria-hidden="true"
                ></i>
                <i
                  style={{ cursor: "pointer" }}
                  className="fa fa-eye-slash m-2"
                  aria-hidden="true"
                ></i>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default AllLists;
