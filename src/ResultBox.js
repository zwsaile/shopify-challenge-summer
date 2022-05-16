import React from "react"
import Result from "./Result"
import "./styles/ResultBox.css"

const ResultBox = ({cards, key, deleteCard}) => {
  const resultCards = cards.map(card => {
    return (
      <article>
        <Result
          entry={card.entry}
          result={card.result}
          id={card.id}
          key={key}
          deleteCard={deleteCard}
        />
      </article>
    )
  })
    return (
      <section className="result-box shadow">
        {resultCards.reverse()}
      </section>
    )
}

export default ResultBox
