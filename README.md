# Wordle (ruin the fun)

I started playing [Wordle](https://www.powerlanguage.co.uk/wordle/) with some siblings and my lovely wife.

The "This is solveable." engineering brain took over and I took a shot at it.

I _mostly_ beat it. I should be able to sleep soundly again.

## Archibald

Archibald the bot analyzes all the letters in it's known 5 letter words (pulled from the Wordle website) and comes up with their best guess per turn.
It then parses the information it knows from the responses, makes a new histogram for the remaining letters, then makes a best guess.

Enjoy

<pre>
┌─────────┬─────────┬──────────────┐
│ (index) │    g    │      r       │
├─────────┼─────────┼──────────────┤
│    0    │ 'cigar' │ '⬛⬛⬛⬛⬛' │
│    1    │ 'humph' │ '⬛⬛⬛⬛⬛' │
│    2    │ 'stool' │ '⬛⬛⬛🟩⬛' │
│    3    │ 'enjoy' │ '🟩🟩🟩🟩🟩' │
└─────────┴─────────┴──────────────┘
</pre>

Savor

<pre>
┌─────────┬─────────┬──────────────┐
│ (index) │    g    │      r       │
├─────────┼─────────┼──────────────┤
│    0    │ 'cigar' │ '⬛⬛⬛🟨🟩' │
│    1    │ 'major' │ '⬛🟩⬛🟩🟩' │
│    2    │ 'labor' │ '⬛🟩⬛🟩🟩' │
│    3    │ 'favor' │ '⬛🟩🟩🟩🟩' │
│    4    │ 'savor' │ '🟩🟩🟩🟩🟩' │
└─────────┴─────────┴──────────────┘

</pre>

Laser

<pre>
┌─────────┬─────────┬──────────────┐
│ (index) │    g    │      r       │
├─────────┼─────────┼──────────────┤
│    0    │ 'cigar' │ '⬛⬛⬛🟨🟩' │
│    1    │ 'major' │ '⬛🟩⬛⬛🟩' │
│    2    │ 'paper' │ '⬛🟩⬛🟩🟩' │
│    3    │ 'baker' │ '⬛🟩⬛🟩🟩' │
│    4    │ 'safer' │ '🟨🟩⬛🟩🟩' │
│    5    │ 'hater' │ '⬛🟩⬛🟩🟩' │
└─────────┴─────────┴──────────────┘
</pre>

Still not perfect.

## Future Improvements

- Care more about repeat letters?
  - I put a bias against it since that's how I play as a human so I can discover more information
- Memory
  - I'm sure Wordle isn't going to use the same word it already did. We could bias away from similar words that were just played
- More bots
  - Bot that takes the "easy" approach (if you read the hard mode description on Wordle)
    - This should help with the Laser problem
  - Sister bot must start with an animal as the first guess
- Interface
  - CLI to run against Archy instead of changing the test
  - Puppeeteer to actually play against Wordle :p
