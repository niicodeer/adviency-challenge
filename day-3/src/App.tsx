import { useState } from "react";
import "./styles.css";

const gifts = ["Remera", "Notebook", "Silla gamer", "asas"];
export default function App() {
  const [listGifts, setListGifts] = useState(gifts);
  const [gift, setGift] = useState("")

  const handleClick = ()=>{
    setListGifts([...listGifts, gift])
    setGift("")
  }
  return (
    <div className="App">
      <div className="container">
        <form className="container__form">
          <input type="text" placeholder="Escriba su regalo" value={gift} onChange={ e => setGift(e.target.value)}/>
          <button type="button" onClick={handleClick}>Agregar</button>
        </form>
        <div className="container__list"> 
        <h1>Lista de regalos:</h1>
        <ul>
          {listGifts.map((gift) => (
            <li key={gift}>{gift}</li>
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
}
