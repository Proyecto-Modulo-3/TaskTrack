// Pillar las tasks de la lista (TaskDetail.jsx)
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { listDetails } from "../../services/api.service";

function ListDetail() {
  const { id } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await listDetails(id);
        setDetails(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  return (
    // - Requerir todas las tasks de la lista
    //   - Si hay -> Pintarlas
    //   - Si no hay -> botón que abra un formulario para crearlas

    <div>
      <button>Ad task</button>
    </div>
  );
}

export default ListDetail;

// - onClick: función de get.lists.detail
