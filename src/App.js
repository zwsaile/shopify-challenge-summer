import React, { Component } from "react"
import Header from "./Header"
import Form from "./Form"
import ResultBox from "./ResultBox"
import './styles/App.css'

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: [],
      loading: false
    }
  }

  addCard = (newCard) => {
    this.setState({ cards: [...this.state.cards, newCard] })
  }

  deleteCard = (id) => {
    const activeCards = this.state.cards.filter(card => card.id !== id)
    this.setState({ cards: activeCards })
  }

  displayLoadMessage = () => {
    if (this.state.loading === false) {
      this.setState({loading: true})
    } else {
      this.setState({loading: false})
    }
  }

  render() {
    return (
      <main className="app">
        <Header />
        <Form addCard={this.addCard} displayLoadMessage={this.displayLoadMessage}/>
        {!this.state.cards.length && <h2 className="no-cards shadow">You have not asked me to tell you a bedtime story yet.</h2>}
        {this.state.loading && <h2 className="no-cards shadow">Loading...</h2>}
        <ResultBox cards={this.state.cards} deleteCard={this.deleteCard} />
      </main>
    );
  }
}

export default App;
