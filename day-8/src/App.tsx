import { HtmlHTMLAttributes, useState } from "react";
import "./styles.css";

export default function App() {
  const [giftList, setGiftList] = useState<
    { giftName: string; giftAmount: number }[]
  >([]);
  const [giftName, setGiftName] = useState("");
  const [giftAmount, setGiftAmount] = useState(1);

  const handleSubmit = () => {
    let draft = {
      giftName,
      giftAmount,
    };
    if (draft.giftName.trim().length > 0 && draft.giftAmount > 0) {
      setGiftList([draft, ...giftList]);
      setGiftName("");
      setGiftAmount(1);
    }
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
        <form
          id="formGift"
          className="container__form"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Escriba su regalo"
            autoComplete="off"
            autoFocus
            value={giftName}
            name="giftName"
            onChange={(e) => setGiftName(e.target.value)}
          />
          <input
            type="number"
            name="giftAmount"
            autoComplete="off"
            min={1}
            value={giftAmount}
            onChange={(e) => setGiftAmount(Number(e.target.value))}
          />
          <button type="button" onClick={handleSubmit}>
            Agregar
          </button>
        </form>
        <div className="container__list">
          <h1>Lista de Regalos:</h1>
          <ul>
            {giftList.length == 0 ? (
              <div style={{ paddingTop: "1em" }}>
                <p>
                  No hay regalos en la lista! <br /> ¿Qué esperas? <br /> Agregá
                  uno! 🎁😀{" "}
                </p>
              </div>
            ) : (
              giftList.map((gift, index) => (
                <div className="container__list__item" key={index}>
                  <div>
                    <li>{gift.giftName}</li>
                    <span>{gift.giftAmount}</span>
                  </div>
                  <div>
                    <button type="button" onClick={() => handleDelete(index)}>
                      Eliminar
                    </button>
                  </div>
                </div>
              ))
            )}
          </ul>
        </div>
        <button
          type="button"
          className="container__delete-btn"
          onClick={deleteAll}
        >
          Eliminar todo
        </button>
      </div>
    </div>
  );
}
