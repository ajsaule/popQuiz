import React, { Component } from 'react';
// speech recognition javascript
var counter = 0;

export default class PlayGame extends Component {

    state = {
        words: [],
        recognising: false,
        sentenceToGuess: ''
    }

    componentDidMount() {
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.reset();
        this.recognition.onend = this.reset;

        this.recognition.onresult = (e) => {
            var sentenceToGuessArr = this.state.sentenceToGuess.replace(/[^A-Za-z0-9]/, "").split(' ')
            console.log(this.state.words)
            counter++
            var final = [];
            for (var i = 0; i < e.results.length; i++) {
                var finalWordArr = e.results[i][0].transcript.split(' ')
                console.log('speaking')
                final = final.concat(finalWordArr
                    .filter(word => word.length)
                    .map(wrd => {
                        if (sentenceToGuessArr.indexOf(wrd) >= 0) {
                            return {
                                word: wrd,
                                class: 'matched-word'
                            } 
                        } else {
                            return { word: wrd } 
                        }
                    })
                )
                    // var finalArr = finalWordArr.map(wrd => {
                    //     if (wrd === '') {
                    //     } else if (guessingWordsArr.indexOf(wrd) >= 0) {
                    //         return `<span style={color: green}>${wrd}</span>`
                    //     } else {
                    //         return wrd 
                    //     }
                    // })
                    // final += finalArr.join(" ");
            }
            this.setState((prevState, props) => { 
                if (prevState.words.length > 10) {
                    console.log('finished');
                    this.recognition.stop();
                    return {
                        recognising: false
                    }
                } else {
                    return {
                        words: final
                    }
                }
            })
        }   
    }

    toggleStartStop = () => {
        if (this.state.recognising) {
            this.recognition.stop();
            this.reset();
        } else {
            this.recognition.start();
            this.setState({
                recognising: true,
                words: []
            })
        }
    }

    reset = () => {
        this.setState({
            recognising: false
        })
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            sentenceToGuess: e.target.value
        })
    }

    render() {
        return(
            <div>
              <h1>Speech recognition prototype</h1>
              <p>Click the button and test speech output to the screen</p>
              <br />
                <button onClick={this.toggleStartStop}>
                    { this.state.recognising ? "Click to stop" : "Start recording" }
                </button>
              <br />
                <p>Output voice text should go under here: </p>
                <p>{this.state.words.map(obj =>
                    obj.class
                        ? <span className={obj.class}>{obj.word} </span>
                        : <span>{obj.word} </span>)}</p>
                <h1>Sentence you are guessing</h1>
                <form>
                    <textarea
                        value={this.state.sentenceToGuess}
                        onChange={this.handleChange}
                        maxLength="150"
                        cols="30"
                        rows="10">
                    </textarea>
                </form>
            </div>
          )
    }
}