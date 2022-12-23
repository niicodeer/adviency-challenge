import { ChangeEventHandler, FormEvent, FormEventHandler, MouseEventHandler, useEffect, useState } from "react";
import "./styles.css";

const INITIAL_GIFT = {
  name: "",
  amount: 1,
  img: "",
}

export default function App() {
  const [giftList, setGiftList] = useState<
    { name: string; amount: number; img: string }[]
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

  const handleCancel = ()=>{
    setOpenModal(!openModal)
  }

  return (
    <div className="App">
      <div className="container">
        {openModal ? 
        <GiftModal
          name={gift.name}
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
                <li className="container__list__item" key={index}>
                  <div>
                    <img src={gift.img} alt={gift.name} />
                    <p>{gift.name}</p>
                    <span>{gift.amount}</span>
                  </div>
                  <div>
                    <button type="button" onClick={() => handleDelete(index)}>
                      Eliminar
                    </button>
                  </div>
                </li>
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


interface Props {
  name: string,
  amount: number,
  image: string,
  change: ChangeEventHandler,
  submit: FormEventHandler,
  cancel: MouseEventHandler,
}

function GiftModal({ name, amount, image, change, submit, cancel }: Props) {

  return (
    <form
      id="formGift"
      className="container__form"
      onSubmit={submit}
    >
      <h2>Agregar un regalo</h2>
      <label htmlFor="name">Regalo</label>
      <input
        id="name"
        type="text"
        placeholder="Escriba su regalo"
        autoComplete="off"
        autoFocus
        value={name}
        name="name"
        onChange={change}
      />
      <label htmlFor="amount">Cantidad</label>
      <input
        id="amount"
        type="number"
        name="amount"
        autoComplete="off"
        min={1}
        value={amount}
        onChange={change}
      />
      <label htmlFor="image">Imagen</label>
      <input
        id="image"
        type="text"
        name="img"
        placeholder="Url imagen"
        autoComplete="off"
        value={image}
        onChange={change}
      />
      <div className="container__form__btn-container">
      <button type="submit" className="container__btn-add">
        Agregar
      </button>
      <button type="button" className="container__btn-cancel" onClick={cancel}>
        Cancelar
      </button>
      </div>
    </form>
  )
}
