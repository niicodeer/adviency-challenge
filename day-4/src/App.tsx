import { useState } from "react";
import "./styles.css";

const gifts = ["Remera", "Notebook", "Silla gamer"];

export default function App() {
  const [listGifts, setListGifts] = useState(gifts);
  const [gift, setGift] = useState("")

  const handleClick = ()=>{
    setListGifts([...listGifts, gift]);
    setGift("")
  }

  const handleDelete = (indexItem:number)=>{
    setListGifts( prev => prev.filter( (gift, key) => key != indexItem))
  }
  
  return (
    <div className="App">
      <div className="container">
        <form className="container__form">
          <input type="text"
            placeholder="Escriba un regalo"
            value={gift}
            onChange={e=> setGift(e.target.value)}/>
          <button type="button"
            onClick={handleClick}>
              Agregar
            </button>
        </form>
        <div className="container__list"> 
          <h1>Lista de regalos:</h1>
          <ul>
            {listGifts.map( (gift, index) => 
              <div key={index} className="container__list__item">
                <div>
                <li>{gift}</li>
                </div>
                <div>
                <button 
                  type="button"
                  onClick={() => handleDelete(index)}>
                  Eliminar
                  </button>
                </div>
              </div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}