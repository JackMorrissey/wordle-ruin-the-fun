# Wordle (ruin the fun)

I started playing Wordle with some siblings and my lovely wife.

The "This is solveable." engineering brain took over and I took a shot at it.

I beat it. I should be able to sleep soundly again.

## Archibald

Archibald the bot analyzes all the letters in it's known 5 letter words and comes up with their best guess per turn.
It then parses the information it knows from the responses, makes a new histogram for the remaining letters, then makes a best guess.

Boson

<pre>
┌─────────┬─────────┬──────────────┐
│ (index) │    g    │      r       │
├─────────┼─────────┼──────────────┤
│    0    │ 'about' │ '⬛🟨🟨⬛⬛' │
│    1    │ 'begin' │ '🟩⬛⬛⬛🟩' │
│    2    │ 'boron' │ '🟩🟩⬛🟩🟩' │
│    3    │ 'boson' │ '🟩🟩🟩🟩🟩' │
└─────────┴─────────┴──────────────┘
</pre>

Laser

<pre>
┌─────────┬─────────┬──────────────┐
│ (index) │    g    │      r       │
├─────────┼─────────┼──────────────┤
│    0    │ 'about' │ '🟨⬛⬛⬛⬛' │
│    1    │ 'calls' │ '⬛🟩🟨⬛🟨' │
│    2    │ 'daily' │ '⬛🟩⬛🟨⬛' │
│    3    │ 'large' │ '🟩🟩🟨⬛🟨' │
│    4    │ 'laser' │ '🟩🟩🟩🟩🟩' │
└─────────┴─────────┴──────────────┘
</pre>

Enjoy

<pre>
┌─────────┬─────────┬──────────────┐
│ (index) │    g    │      r       │
├─────────┼─────────┼──────────────┤
│    0    │ 'about' │ '⬛⬛🟨⬛⬛' │
│    1    │ 'coded' │ '⬛🟨⬛🟨⬛' │
│    2    │ 'enjoy' │ '🟩🟩🟩🟩🟩' │
└─────────┴─────────┴──────────────┘
</pre>

(well that's meta)

Savor

<pre>
┌─────────┬─────────┬──────────────┐
│ (index) │    g    │      r       │
├─────────┼─────────┼──────────────┤
│    0    │ 'about' │ '🟨⬛🟨⬛⬛' │
│    1    │ 'calls' │ '⬛🟩⬛⬛🟨' │
│    2    │ 'handy' │ '⬛🟩⬛⬛⬛' │
│    3    │ 'major' │ '⬛🟩⬛🟩🟩' │
│    4    │ 'razor' │ '⬛🟩⬛🟩🟩' │
└─────────┴─────────┴──────────────┘
</pre>

Archibald has yet to learn to favor or savor. He is yet a simple bot.

## Future Improvements

- Better word list
  - Archy never learned to savor the moment
- Care more about repeat letters?
  - I put a bias against it since that's how I play as a human so I can discover more information
- Memory
  - I'm sure Wordle isn't going to use the same word it already did. We could bias away from similar words that were just played
- Interface
  - CLI to run against Archy instead of changing the test
  - Puppeeteer to actually play against Wordle :p
- More bots
  - Sister bot must start with an animal as the first guess
