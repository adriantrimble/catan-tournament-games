/**
 * This logic could be made much easier using JS Maps (IIRC) cause they won't allow duplicates in each player set.
 */

const refreshButt = document.getElementById('refresh-matchups');

refreshButt.addEventListener('click', refreshCombinations);
	
refreshCombinations();

// Get all combinations of 4 players
function getCombinationsFours(players) {
	let combinations = [];
	let playerCount = players.length;

	for (let i = 0; i < playerCount; i++) {
		let primaryPlayer = players[i];

		for (let j = 0; j < playerCount; j++) {
			let secondaryPlayer = players[j];

			for (let k = 0; k < playerCount; k++) {
				let tertiaryPlayer = players[k];

				for (let l = 0; l < playerCount; l++) {
					let quaternaryPlayer = players[l];

					let game = [primaryPlayer, secondaryPlayer, tertiaryPlayer, quaternaryPlayer];
					combinations.push(game);
				}
			}
		}
	}

	return combinations;
}

// Check if an array contains multiple of the same person
function checkIfArrayIsUnique(arr) {
	var map = {}, i, size;

	for (i = 0, size = arr.length; i < size; i++){
			if (map[arr[i]]){
					return false;
			}

			map[arr[i]] = true;
	}

	return true;
}

// Removes arrays where the same player appears more than once
function removeDuplicateSubArrays(combinations) {
	let uniqueCombinations = [];

	for (let i = 0; i < combinations.length; i++) {
		let combination = combinations[i];
		combination.sort();

		// Used to check if an array contains multiple of the same person
		if (checkIfArrayIsUnique(combination)) {
			uniqueCombinations.push(combination);
		}
	}

	return uniqueCombinations;
}

// Remove dupliate match-ups from a sorted array
function reallyRemoveDuplicates(array) {

	let finallyUnqiueCombinations = [];

	for (let p = 0; p < array.length; p++) {

		let combination = array[p];

		// Array is sorted so we can compare to the next element
		let j = p + 1;

		if (undefined !== array[j]) {
			// Stringify the arrays to compare
			if (combination.toString() !== array[j].toString()) {
				finallyUnqiueCombinations.push(combination);
			}
		} else {
			finallyUnqiueCombinations.push(combination);
		}
	}

	return finallyUnqiueCombinations;
}

// Count number of games for a given player
function countPlayerGames(combinations, player) {
	let count = 0;

	for (let i = 0; i < combinations.length; i++) {
		let combination = combinations[i];

		if (combination.includes(player)) {
			count++;
		}
	}

	return count;
}

function countAllPlayerGames(combinations, players) {
	let gameCount = [];

	for (let i = 0; i < players.length; i++) {
		let player = players[i];
		gameCount[i] = countPlayerGames(combinations, player);
	}

	return gameCount;
}

function getFinalGames(combinations) {
	let finalGames = [];
	let gamesPerPlayer = 20;

	for (let i = 0; i < combinations.length; i++) {
		let combination = combinations[i];
		let gameCounts = [];

		// Get the number of games for each player in this combination
		for (let j = 0; j < combination.length; j++) {
			let player = combination[j];

			let games = countPlayerGames(finalGames, player);

			gameCounts[j] = [player, games];
		}

		if (gameCounts[0][1] < gamesPerPlayer && gameCounts[1][1] < gamesPerPlayer && gameCounts[2][1] < gamesPerPlayer && gameCounts[3][1] < gamesPerPlayer) {
			finalGames.push(combination);
		}
	}

	// if (finalGames.length < 50) {
	// 	return getFinalGames(combinations);
	// }

	return finalGames;
}

function refreshCombinations() {

	let Combine = () => {

		let combos = [];

		while (combos.length < 50) {
			
			let players = [
				'Adam',
				'Adrian',
				'Alex',
				'Bill',
				'Brittany',
				'Carlene',
				'Colin',
				'Katrina',
				'Jenny',
				'Rob'
			];
			
			// Get combinations of 4 players, remove instances of multiple players in same game
			let combinations = removeDuplicateSubArrays(getCombinationsFours(players));
			
			// Sort
			combinations.sort();
			
			// Remove duplicate match-ups
			let uniqueCombinations = reallyRemoveDuplicates(combinations);
			
			// Randomize the order of the match-ups
			uniqueCombinations.sort(() => Math.random() - 0.5);
			
			combos = getFinalGames(uniqueCombinations);
		
		}

		combos = shuffleArray(combos);

		return combos;

	};

	const app = document.querySelector('main');

	finalCombinations = Combine();	

	// Render the combinations
	var m = 0;
	var gameHtml = 
	finalCombinations.map(function (combination) {
			m++;
			return '<tr><td>' + m + '</td><td>' + combination.join('</td><td>') + '</td></tr>';
		}).join('');

	var tableHtml = '<table><thead><tr><th>Game #</th><th>Player 1</th><th>Player 2</th><th>Player 3</th><th>Player 4</th></tr></thead>' + gameHtml + '</table>';

	document.getElementById("matchups").innerHTML = tableHtml;

}

function shuffleArray(array) {
	for (var i = array.length - 1; i > 0; i--) {
	
		// Generate random number
		var j = Math.floor(Math.random() * (i + 1));
					
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
		
	return array;
 }