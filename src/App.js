import React, { Component } from "react"
import Header from "./Header"
import Form from "./Form"
import ResultBox from "./ResultBox"
import './styles/App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    }
  }

  addCard = (newCard) => {
    this.setState({ cards: [...this.state.cards, newCard] })
  }

  deleteCard = (id) => {
    const activeCards = this.state.cards.filter(card => card.id !== id)
    this.setState({ cards: activeCards })
  }

  render() {
    return (
      <main className="app">
        <Header />
        <Form addCard={this.addCard}/>
        {!this.state.cards.length && <h2 className="no-cards shadow">You have not asked me to tell you a bedtime story yet.</h2>}
        <ResultBox cards={this.state.cards} deleteCard={this.deleteCard} />
      </main>
    );
  }
}

export default App;
