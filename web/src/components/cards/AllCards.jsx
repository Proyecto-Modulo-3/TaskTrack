import { useContext, useEffect, useState } from "react";
import { useReloadContext } from "../../contexts/reload.context";
import { useParams } from "react-router-dom";
import AuthContext from "../../contexts/auth.context";
import { getCards, deleteCards, editCard } from "../../services/api.service";
import Card from "react-bootstrap/Card";

function AllCards({ taskId, title }) {
  const [cards, setCards] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [draggedCardId, setDraggedCardId] = useState(null);
  const { now, reload } = useReloadContext();
  const { id } = useParams();
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    async function fetchCards() {
      const query = {};
      if (id) query.id = id;
      if (taskId) query.taskId = taskId;
      if (title) query.title = title;
      try {
        if (userId) {
          const { data: fetchCards } = await getCards(id, taskId, query);
          setCards(fetchCards);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
        setCards([]);
      }
    }
    if (userId) fetchCards();
  }, [id, taskId, title, now, userId]);

  const handleDeleteCard = async (cardId) => {
    try {
      await deleteCards(id, taskId, cardId);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDragStart = (event, cardId) => {
    event.dataTransfer.setData("cardId", cardId)
    setDragging(true);
    setDraggedCardId(cardId);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  }

const handleDrop = async (event, targetTaskId) => {
  event.preventDefault();

  const cardId = event.dataTransfer.getData("cardId");

  try {
    await editCard(id, targetTaskId, cardId, { taskId: targetTaskId });
  } catch (error) {
    console.error("Error while dropping card:", error);
  }
}

  return (
    <div className="d-flex flex-column">
      {cards.map((card) => (
        <div
          key={card.id}
          id={card.id}
          style={{ marginBottom: "10px" }}
          draggable
          onDragStart={(e) => handleDragStart(e, card.id)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e, taskId)}
        >
          <Card border="dark" style={{ width: "15rem" }}>
            <Card.Body className="d-flex justify-content-between">
              <Card.Title className="m-2">{card.text}</Card.Title>
              <button onClick={() => handleDeleteCard(card.id)} className="btn">
                <i className="fa fa-trash" aria-hidden="true"></i>
              </button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default AllCards;
