function returnNonMatchingWords(sentenceToGuessArrNew, word) {
    var wordsLeft = sentenceToGuessArrNew.filter((wrd, indx) => {
        if (indx !== sentenceToGuessArrNew.indexOf(word)) {
            return wrd
        } 
    })
    return wordsLeft
}

function testTwoArraysAgainstEachOther(finalWordArr, wordsLeftToGuess) {
    var final = [];
        final = final
            .concat(finalWordArr
                .filter(word => word.length)
                .map(word => {
                    if (wordsLeftToGuess.indexOf(word) >= 0) {
                        return {
                            word: word,
                            class: 'matched-word'
                        } 
                    } else {
                        return { word: word } 
                    }
                })      
            )
        return final
}

module.exports = {
    returnNonMatchingWords,
    testTwoArraysAgainstEachOther
}