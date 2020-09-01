import React, { Component } from 'react';
// speech recognition javascript

// game scoring system 

export default class PlayGame extends Component {

    state = {
        words: [],
        recognising: false,
        sentenceToGuess: {
            targetWord: 'Test',
            sentence: 'This is a test, this is a test'
        }
    }

    componentDidMount() {
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.reset();
        this.recognition.onend = this.reset;

        // storing transformed string to array for game to work
        var sentenceToGuessArr = this.state.sentenceToGuess.sentence.toLowerCase().replace(/[^A-Za-z0-9'\ ]/g, "").split(" ")
        // setting state to iterable and no unwanted chars
        this.setState({
            sentenceToGuess: {
                targetWord: 'Test',
                sentence: sentenceToGuessArr
            }
        })

        // checking if the value has been turned into an array 
        // console.log(sentenceToGuessArr)

        this.recognition.onresult = (e) => {
            var sentenceToGuessArrNew = this.state.sentenceToGuess.sentence
            //console.log(this.state.sentenceToGuess.sentence)

            // old method of filtering out any spaces that may be in an array
            // sentenceToGuessArr = sentenceToGuessArr.filter(elm => {
            //     if (elm) {
            //         return elm
            //     }
            // })
            console.log(sentenceToGuessArrNew)
            var final = [];
            for (var i = 0; i < e.results.length; i++) {
                var finalWordArr = e.results[i][0].transcript.split(' ')
                final = final.concat(finalWordArr
                    .filter(word => word.length)
                    .map(wrd => {
                        if (sentenceToGuessArrNew.indexOf(wrd) >= 0) {
                            this.setState({
                                sentenceToGuess: {
                                    targetWord: 'Test',
                                    sentence: sentenceToGuessArrNew.filter((el, indx) => {
                                        if (indx !== sentenceToGuessArrNew.indexOf(wrd)) {
                                            return el
                                        }
                                    })
                                }
                            })
                            return {
                                word: wrd,
                                class: 'matched-word'
                            } 
                        } else {
                            return { word: wrd } 
                        }
                    })
                )
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
                        value={this.state.sentenceToGuess.sentence}
                        // onChange={this.handleChange}
                        maxLength="150"
                        cols="30"
                        rows="10">
                    </textarea>
                </form>
            </div>
          )
    }
}