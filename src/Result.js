import React from "react"
import "./styles/Result.css"

const Result = ({ entry, result, id, key, deleteCard }) => {
  return (
    <article key={key} className="result-card shadow">
      <h3 className="card-entry">{entry[0].toUpperCase() + entry.substring(1)}</h3>
      <p className="card-result">{result}</p>
      <button className="card-delete shadow" onClick={() => deleteCard(id)}>🗑</button>
    </article>
  )
}

export default Result
