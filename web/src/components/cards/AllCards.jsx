import React, { useContext, useEffect, useState } from "react";
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

  const handleDragStart = (e, cardId) => {
    e.cardId = cardId;
    console.log(e);
    setDragging(true);
    setDraggedCardId(cardId);
  };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  // };

  const handleDrop = async (e, targetTaskId, cardId) => {
    e.preventDefault();

    try {
      if (targetTaskId !== taskId) {
        await editCard(id, taskId, cardId, { taskId: targetTaskId });

        const updatedCards = cards.filter((card) => card.id !== cardId);
        const draggedCard = cards.find((card) => card.id === cardId);
        const updatedTaskCards = [
          ...updatedCards,
          { ...draggedCard, taskId: targetTaskId },
        ];

        setCards(updatedTaskCards);
      }
    } catch (error) {
      console.error("Error dropping card:", error);
    }

    setDragging(false);
    setDraggedCardId(null);
  };

  return (
    <div className="d-flex flex-column">
      {cards.map((card) => (
        <div
          key={card.id}
          id={card.id}
          style={{ marginBottom: "10px" }}
          draggable
          onDragStart={(e) => handleDragStart(e, card.id)}
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
