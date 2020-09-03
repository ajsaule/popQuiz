var utils, {
    returnNonMatchingWords,
    testTwoArraysAgainstEachOther
} = require('./utils')


test("return non matching words from array", () => {
    expect(
        returnNonMatchingWords(['this', 'is', 'a', 'test', 'this'], 'this')
    ).toEqual(['is', 'a', 'test', 'this'])
})

test("testing two arrays for similarity", () => {
    expect(
        testTwoArraysAgainstEachOther(['this', 'is', 'the', 'best'], ['this', 'is', 'a', 'test'])
    ).toEqual([
        { word: 'this', class: 'matched-word' },
        { word: 'is', class: 'matched-word' },
        { word: 'the' },
        { word: 'best' }
    ])
})