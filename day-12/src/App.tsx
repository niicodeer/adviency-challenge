import { ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useEffect, useState } from "react";
import GiftModal from "./components/GiftModal";
import "./styles.css";

const INITIAL_GIFT = {
  name: "",
  recipient: "",
  amount: 1,
  img: "",
}

export default function App() {
  const [giftList, setGiftList] = useState<
    { name: string; recipient: string; amount: number; img: string }[]
  >([]);
  const [gift, setGift] = useState(INITIAL_GIFT);
  const [openModal, setOpenModal] = useState(false)


  useEffect(() => {
    const initialList = JSON.parse(localStorage.getItem('Gift-List') || "");
    if (initialList) {
      setGiftList(initialList);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('Gift-List', JSON.stringify(giftList));
  }, [giftList])



  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gift.name.trim().length > 0) {
      setGiftList([gift, ...giftList])
      setGift(INITIAL_GIFT);
      setOpenModal(false);
    }
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    const { name, value } = target;

    const draft = { ...gift, [name]: value, }
    setGift(draft);
  };

  const handleDelete = (index: number) => {
    const filtered = giftList.filter((gift, key) => key != index);
    setGiftList(filtered);
  };

  const deleteAll = () => {
    setGiftList([]);
  };

  const handleCancel = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className="App">
      <div className="container">
        {openModal ?
          <GiftModal
            name={gift.name}
            recipient={gift.recipient}
            amount={gift.amount}
            image={gift.img}
            change={handleChange}
            submit={handleSubmit}
            cancel={handleCancel}
          />
          :
          <button
            className="container__btn-add"
            onClick={() => setOpenModal(!openModal)}
          >
            Agregar un regalo
          </button>}


        <div className="container__list">
          <h1>Lista de Regalos:</h1>
          {giftList.length == 0 ? (
            <div style={{ paddingTop: "1em" }}>
              <p>
                No hay regalos en la lista! <br /> ¿Qué esperas? <br /> Agregá
                uno! 🎁😀{" "}
              </p>
            </div>
          ) : (
            <table className="container__list__table">
              <thead className="container__list__table-head">
                <tr>
                  <th>-</th>
                  <th>Regalo</th>
                  <th>Cantidad</th>
                  <th>Destinatario</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {giftList.map((gift, index) =>
                  <tr>
                    <td><img src={gift.img} alt={gift.name} /></td>
                    <td><p>{gift.name}</p></td>
                    <td>{gift.amount}</td>
                    <td><p>{gift.recipient}</p></td>
                    <td><div>
                      <button type="button" onClick={() => handleDelete(index)}
                      className="container__list__table-btn-delete">
                        Eliminar
                      </button>
                    </div></td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
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


