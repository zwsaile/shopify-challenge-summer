import React, { Component } from "react"
import "./styles/Form.css"
import { config } from "./config"

var key1 = config.apiKey1;
var key2 = config.apiKey2;
let value;

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      entry: '',
      result: ''
    }
  }

  async callApi() {

    let currentEntry = this.state.entry

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${key1}${key2}`);

    var raw = JSON.stringify({
      "prompt": `Tell me a 6 sentence bedtime story about ${this.state.entry}`,
      "temperature": 1,
      "max_tokens": 200
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch("https://api.openai.com/v1/engines/text-curie-001/completions?", requestOptions)
      .then(response => response.json())
      .then(result =>  value = result.choices[0].text)
      .then(newValue => this.setState({ entry: currentEntry, result: value }))
      .catch(error => console.log('error', error));
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  }

  async submitCard(event) {
    event.preventDefault()
    await this.callApi()
    const newCard = {
      id: Date.now(),
      entry: this.state.entry,
      result: value.split(";").join("\n")
    }
    this.props.addCard(newCard)
    this.clearInputs()
  }

  clearInputs = () => {
    this.setState({ entry: "", result: ""})
  }


  render() {
    return (
      <form className="form-container shadow">
        <label className="hidden" htmlFor="entry">Entry Field</label>
        <input className="input shadow"
          type='text'
          name='entry'
          id="entry"
          placeholder="Who or what should your bedtime story be about?"
          value={this.state.entry}
          onChange={event => this.handleChange(event)}
        />
        <button className="submit-btn shadow" onClick={event => this.submitCard(event)}>Submit</button>
      </form>
    )
  }
}
