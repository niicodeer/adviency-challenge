import { useState } from "react";
import "./styles.css";

const gifts = ["Remera", "Notebook", "Silla gamer"];

export default function App() {
  const [giftList, setGiftList] = useState(gifts);
  const [gift, setGift] = useState("");

  const handleSubmit = () => {
    setGiftList([gift, ...giftList]);
    setGift("");
  };

  const handleDelete = (index: number) => {
    const filtered = giftList.filter((gift, key) => key != index);
    setGiftList(filtered);
  };

  const deleteAll = () => {
    setGiftList([]);
  };

  return (
    <div className="App">
      <div className="container">
        <form className="container__form">
          <input
            type="text"
            placeholder="Escriba su regalo"
            autoFocus
            value={gift}
            onChange={(e) => setGift(e.target.value)}
          />
          <button type="button" onClick={handleSubmit}>
            Agregar
          </button>
        </form>
        <div className="container__list">
          <h1>Lista de Regalos:</h1>
          <ul>
            {giftList.length == 0 ? 
            <div style={{paddingTop:"1em"}}>
              <p>No hay regalos en la lista! <br/> ¿Qué esperas? <br/> Agregá uno! 🎁😀 </p>
            </div>
            : 
            giftList.map((gift, index) => (
              <div className="container__list__item" key={index}>
                <div>
                  <li>{gift}</li>
                </div>
                <div>
                  <button type="button" onClick={() => handleDelete(index)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </ul>
        </div>
        <button className="container__delete-btn" onClick={deleteAll}>
          Eliminar todo
        </button>
      </div>
    </div>
  );
}
