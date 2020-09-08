import React, { Component } from 'react';
import _ from 'underscore';
// speech recognition javascript

// game scoring system 

export default class PlayGame extends Component {

    state = {
        spokenWords: '',
        recognising: false,
        sentence: 'GA is the best'
    }     
    

    componentDidMount() {
        this.recognition = new window.webkitSpeechRecognition();
        this.recognition.continuous = true;
        // this.recognition.interimResults = true;
        this.reset();
        this.recognition.onend = this.reset;

        this.recognition.onresult = (e) => {
            console.log('fired')
            const speechRecognitionList = e.results
            var finalWords = ''
            for (var i = 0; i < speechRecognitionList.length; i++) {
                let speechRecognitionTranscript = speechRecognitionList[i][0].transcript
                // var finalWordsResult = this.assessSpokenWords(speechRecognitionTranscript)
                finalWords = finalWords += speechRecognitionTranscript
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
                        spokenWords: finalWords
                    }
                }
            })
        }   
    }

    wordsLeft(spokenWords) {
        var differenceBetweenWords = _.difference(
            this.state.sentence
                .replace(/[^A-Za-z0-9'\ ]/g, "")
                .toLowerCase()
                .split(" "),
            spokenWords.split(" "))
        return differenceBetweenWords.join(" ")
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


    render() {
        const sentenceLength = this.state.sentence.split(" ").length 
        const wordsLeft = this.wordsLeft(this.state.spokenWords)
            .split(" ")
            .filter(wrd => wrd)
            .length
        const percentageComplete = `${wordsLeft / sentenceLength * 100}%`

        return (
            <div>
              <h1>Speech recognition prototype</h1>
              <p>Click the button and test speech output to the screen</p>
              <br />
                <button onClick={this.toggleStartStop}>
                    { this.state.recognising ? "Click to stop" : "Start recording" }
                </button>
              <br />
                <p>Output voice text should go under here: </p>
                <p>{this.state.spokenWords}</p>
                <h1>Sentence you are guessing</h1>
                <div className="progress-bar">
                    <div style={{ height: percentageComplete }}></div>
                </div>
                <form>
                    <textarea
                        value={this.wordsLeft(this.state.spokenWords)}
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



// comparison array 
// actualSentenceArr.reduce((wordsThatMatch, word, idx) => word === transcriptArr[idx] ? [...wordsThatMatch, word] : wordsThatMatch, []).length
