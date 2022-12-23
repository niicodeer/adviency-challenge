import React, { ChangeEventHandler, FormEventHandler, MouseEventHandler } from 'react'

interface Props {
  name: string,
  recipient: string,
  amount: number,
  image: string,
  change: ChangeEventHandler,
  submit: FormEventHandler,
  cancel: MouseEventHandler,
}
  
function GiftModal({ name, recipient, amount, image, change, submit, cancel }: Props) {
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
      <label htmlFor="recipient">Destinatario</label>
      <input
        id="recipient"
        type="text"
        placeholder="¿Para quién es el regalo?"
        autoComplete="off"
        value={recipient}
        name="recipient"
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


export default GiftModal