let players = ['Adam', 'Adrian', 'Alex', 'Bill', 'Brittany', 'Carlene', 'Colin', 'Katrina', 'Les', 'Rob'];
let playerCount = players.length;
let playersPerGame = 4;

// let games = [];

// for (let i = 0; i < playerCount; i++) {

// 	let primaryPlayer = players[i];

// 	for (let j = 0; j < playersPerGame; j++) {
// 		let game = 
// 		games.push(game);
// 	}

// }

function getUniqueCombinations(array) {
	let combinations = [];

	for (let i = 0; i < array.length; i++) {
		for (let j = i + 1; j < array.length; j++) {
			let k = j + 1;
			
			if (k >= array.length) {
				k = array.length - k;
			}

			let l = k + 1;

			if (l >= array.length) {
				l = array.length - l;
			}

			let combination = [array[i], array[j], array[k], array[l]];
			combinations.push(combination);
		}
	}

	return combinations;
}

let combinations = getUniqueCombinations(players);

var m = 0;
var gameHtml = 
	combinations.map(function (combination) {
		m++;
		return '<tr><td>' + m + '</td><td>' + combination.join('</td><td>') + '</td></tr>';
	});

var tableHtml = '<table><thead><tr><th>Game #</th><th>Player 1</th><th>Player 2</th><th>Player 3</th><th>Player 4</th></tr></thead>' + gameHtml + '</table>';

document.getElementById("matchups").innerHTML = tableHtml;