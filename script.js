let players = ['Adam', 'Adrian', 'Alex', 'Bill', 'Brittany', 'Carlene', 'Colin', 'Katrina', 'Les', 'Rob'];
let playerCount = players.length;

// Get all combinations of 4 players
function getCombinations(players) {
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

function removeDuplicateSubArrays(combinations) {
	let uniqueCombinations = [];

	for (let i = 0; i < combinations.length; i++) {
		let combination = combinations[i];
		combination.sort();

		if (checkIfArrayIsUnique(combination)) {
			uniqueCombinations.push(combination);
		}
	}

	return uniqueCombinations;
}

function reallyRemoveDuplicates(array) {

	let finallyUnqiueCombinations = [];

	for (let p = 0; p < array.length; p++) {

		let combination = array[p];
		let j = p + 1;

		if (undefined !== array[j]) {
			if (combination.toString() !== array[j].toString()) {
				finallyUnqiueCombinations.push(combination);
			}
		} else {
			finallyUnqiueCombinations.push(combination);
		}
	}

	return finallyUnqiueCombinations;
}

let combinations = removeDuplicateSubArrays(getCombinations(players));

combinations.sort();

let finalCombinations = reallyRemoveDuplicates(combinations);


var m = 0;
var gameHtml = 
finalCombinations.map(function (combination) {
		m++;
		return '<tr><td>' + m + '</td><td>' + combination.join('</td><td>') + '</td></tr>';
	}).join('');

var tableHtml = '<table><thead><tr><th>Game #</th><th>Player 1</th><th>Player 2</th><th>Player 3</th><th>Player 4</th></tr></thead>' + gameHtml + '</table>';

document.getElementById("matchups").innerHTML = tableHtml;
