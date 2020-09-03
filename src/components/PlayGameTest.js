import React, { Component } from 'react';
// speech recognition javascript

// game scoring system 

export default class PlayGame extends Component {

    state = {
        words: [],
        recognising: false,
        sentenceToGuess: {
            targetWord: 'Test',
            sentence: 'This is a test, this is a test',
            wordsLeft: 'This is a test, this is a test'
        }
    }     

    componentDidMount() {
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.continuous = true;
        // this.recognition.interimResults = true;
        this.reset();
        this.recognition.onend = this.reset;

        // storing transformed string to array for game to work
        var sentenceToGuessArr = this.state.sentenceToGuess.sentence
            .toLowerCase()
            .replace(/[^A-Za-z0-9'\ ]/g, "")
            .split(" ")
        var wordsLeftArr = this.state.sentenceToGuess.wordsLeft
            .toLowerCase()
            .replace(/[^A-Za-z0-9'\ ]/g, "")
            .split(" ")
        // setting state to iterable and no unwanted chars
        this.setState({
            sentenceToGuess: {
                targetWord: 'Test',
                sentence: sentenceToGuessArr,
                wordsLeft: wordsLeftArr
            }
        })

        this.recognition.onresult = (e) => {
            console.log('fired')
            const speechRecognitionList = e.results
            var finalWordArr = []
            for (var i = 0; i < speechRecognitionList.length; i++) {
                let speechRecognitionTranscript = speechRecognitionList[i][0].transcript
                var finalWordsResult = this.assessSpokenWords(speechRecognitionTranscript)
                finalWordArr = finalWordArr.concat(finalWordsResult)
                console.log(finalWordArr)
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
                        words: finalWordArr
                    }
                }
            })
        }   
    }

    assessSpokenWords(speechRecognitionTranscript) {
        var finalWordArr = speechRecognitionTranscript.split(' ')
        var sentenceToGuessArrNew = this.state.sentenceToGuess.sentence
        var wordsLeftToGuess = this.state.sentenceToGuess.wordsLeft
        // test to see the objects in state
        var final = [];
        final = final
            .concat(finalWordArr
                .filter(word => word.length)
                .map(word => {
                    // why do all instances of the words get removed from the Arr?
                    // shouldn't only the first then second instance of the word arr get removed?
                    if (wordsLeftToGuess.indexOf(word) >= 0) {
                        // filtering the array for non-matching words.. leaving first matching word out.
                        var wordsLeft = wordsLeftToGuess.filter((wrd, indx) => {
                            var wordsLeft = []
                            for (let i = 0; i < wordsLeftToGuess.length; i++) {
                                if (i !== wordsLeftToGuess.indexOf(word)) {
                                   wordsLeft.push(word) 
                                }
                            }
                        })
                        this.setState({
                            sentenceToGuess: {
                                targetWord: 'Test',
                                sentence: sentenceToGuessArrNew,
                                wordsLeft: wordsLeft
                            }
                        })
                        return {
                            word: word,
                            class: 'matched-word'
                        } 
                    } else {
                        return {
                            word: word
                        } 
                    }
                })      
            )
        return final
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

    // handleChange = (e) => {
    //     e.preventDefault()
    //     this.setState({
    //         sentenceToGuess: e.target.value
    //     })
    // }

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
                        value={this.state.sentenceToGuess.wordsLeft}
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



// comparison array 
// actualSentenceArr.reduce((wordsThatMatch, word, idx) => word === transcriptArr[idx] ? [...wordsThatMatch, word] : wordsThatMatch, []).length

    
    
    
    // comparison array 
    // actualSentenceArr.reduce((wordsThatMatch, word, idx) => word === transcriptArr[idx] ? [...wordsThatMatch, word] : wordsThatMatch, []).length
    
    // var wordsLeft = []
    // for (let i = 0; i < sentenceToGuessArrNew.length; i++) {
    //     if (sentenceToGuessArrNew[i] === word) {
            
    //     }
    // }