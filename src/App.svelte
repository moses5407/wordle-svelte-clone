<script>
	import {
		currentWord,
		modal,
		allWords,
		currentWords,
		current,
		cols,
		rows,
		message,
		lightMode,
		win,
		lose,
		randomWord
	} from "./stores";
	import Header from "./components/Header.svelte";
	import Grid from "./components/Grid.svelte";
	import Keyboard from "./components/Keyboard.svelte";
	import Message from "./components/Message.svelte";
	import Modal from "./components/Modal.svelte";
	import Win from "./components/modals/Win.svelte";
	import Lose from "./components/modals/Lose.svelte";

	const keys = [
		'q', 'w', 'e', 'r', 't', 'y', 'u', 'ı', 'o', 'p', 'ğ', 'ü',
		'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ş', 'i',
		'z', 'x', 'c', 'v', 'b', 'n', 'm', 'ö', 'ç'
	]

	document.addEventListener('keyup', e => {

		// add if the letter is a valed letter
		if (keys.includes(e.key.toLowerCase()) && $currentWord.length < $cols) {
			$currentWord = [...$currentWord, e.key.toLowerCase()]
		}

		// If the current word's length is greater than 0, reduce it by one and subtract the letter.
		if (e.key === 'Backspace') {
			$currentWord.length = $currentWord.length > 0 ? $currentWord.length - 1 : 0
		}

		if (e.key === 'Enter') {

			// if the word is incomplete
			if ($currentWord.length !== $cols) {
				$message = true
			} else {

				// if the word is ok and found in existing words
				// add to existing words and pass to the next
				if ($allWords[$cols].includes($currentWord.join(''))) {

					$currentWords = [...$currentWords, $currentWord]
					$currentWord = []

					// did you win?
					if ($currentWords.length > 0 && $currentWords.map(words => words.join('')).includes($randomWord.join(''))) {
						$win = true
					} else if ($currentWords.length === $rows) {
						$lose = true
					}

					$current += 1

				} else {
					$message = 'Word not found'
				}
			}
		}
	})

	// reset the game if settings change
	$: if ($cols || $rows) {
		$currentWord = $currentWords = []
		$current = 0
	}

	// change random word if word changes length
	$: if ($cols) {
		$randomWord = $allWords[$cols][Math.floor(Math.random() * $allWords[$cols].length)].split('')
	}

	$: $lightMode ? document.body.classList.add('light') : document.body.classList.remove('light')

</script>

<div class="container">
    <Message/>
    <Header/>
    {#if $win}
        <Win/>
    {/if}
    {#if $lose}
        <Lose/>
    {/if}
    <Grid/>
    {#if $modal}
        <Modal/>
    {/if}
    <Keyboard keys={keys}/>
</div>

<style>
    .container {
        width: 500px;
        margin: 0 auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>
