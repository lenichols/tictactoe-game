function TicTacToeGame(){

	"use strict";

	let randArr;
	let found;
	let selItm = "";
	let targetedBox = "";
	let storedBoxArrO = [];
	let storedBoxArrX = [];
	var comPlayer = "O";
	var m = document.getElementById("message");
	var mc = document.getElementById("msgContent");
	var mt = document.getElementById("alertName");
	var cl = document.getElementById("close");
	var rf = document.getElementById("refresh");
	var gridBox = document.getElementsByClassName('box');
	var boxElements = document.querySelectorAll('.box');

	// events
	cl.addEventListener("click", function(){
		m.classList.remove("opened");
		m.className += " closenow";
	});

	rf.addEventListener("click", function(){
		refreshPg();
	});

	// initially hide the message box
	// document.getElementById("popup1").style.display = "none";
	// document.getElementById("popup").style.display = "none";
	// create a checkbox element to toggle message dropdown
	this.startNewGame = function() {
		var foundBoxes = gridBox.length;
		for (var i = 0; i < foundBoxes; i++) {
			gridBox[i].addEventListener('click', function(){
				//set initial value of selected to user X
				let targetedItem = event.target.id;
				checkSelected(targetedItem, selItm);
			});
		}
		m.classList.remove("closenow");
		m.className += " opened";
		mt.innerHTML = "<span class='wi'>TicTacToe Game</span>";
		mc.innerHTML = "Welcome Player 1 - To play, click close...";
	}

	// loop through WinningCombinations Array
	// convert to json string
	// then search winningComb string
	// to runAutomatedTurn which happens next
	function confirmWin() {
		// 8 Ways to Win
		var winningCombinations = [
				["one", "two", "three"],
				["one", "four", "seven"],
				["one", "five", "nine"],
				["two", "five", "eight"],
				["three", "six", "nine"],
				["three", "five", "seven"],
				["four", "five", "six"],
				["seven", "eight", "nine"] ];

		var wc = JSON.stringify(winningCombinations);
		var sbaX = JSON.stringify(storedBoxArrX);
		var sbaO = JSON.stringify(storedBoxArrO);
		var checkO = wc.indexOf(sbaO);
		var checkX = wc.indexOf(sbaX);

		if(selItm === "X"){
			if(checkX != -1){
				m.classList.remove("closenow");
				m.className += " opened";
				mt.innerHTML = "<span class='wi'>Congratulations!</span>";
				mc.innerHTML = selItm + " wins! (That's you...)";
				found = true;
				return false;
			} else {
				found = false;
				console.log("x turn did not win...");
				return true;
			}
		}

		if(selItm === "O") {
			if(checkO != -1){
				m.classList.remove("closenow");
				m.className += " opened";
				mt.innerHTML = "<span class='er'>Bummer...</span>";
				mc.innerHTML = "The computer won!";
				found = true;
				return false;
			} else {
				found = false;
				console.log("o turn did not win...");
				return true;
			}
		}
	}

	// Set boxes with either X or O depending on which player
	// turn it is. If Computer player turn, push to "O" array
	// then confirm win. If no winner, keep going - runAutomatedTurn
	function changeItem(item, sel) {
		if(sel !== "X"){
			selItm = "O";
			setTimeout(function(e){
			     document.getElementById(item).innerHTML = sel;
			}, 2000);
			storedBoxArrO.push(item);
			confirmWin();
		} else {
			document.getElementById(item).innerHTML = sel;
			confirmWin();
			runAutomatedTurn();
		}
	}

	// If user has already selected the box, alert
	function checkSelected(item, sel) {
		var fx = storedBoxArrX;
		var fo = storedBoxArrO;
		m.classList.remove("opened");
		m.className += " closenow"; //close alert
		if(sel){
			if(fx.indexOf(item) !== -1){
				m.classList.remove("closenow");
				m.className += " opened error";
				mt.innerHTML = "Oops!";
				mc.innerHTML = "You already set this answer.";
				return false;
			} else if (fo.indexOf(item) !== -1) {
				m.classList.remove("closenow");
				m.className += " opened error";
				mt.innerHTML = "Oops!";
				mc.innerHTML = "Hey... you can't play this box!";
				return false;
			} else {
				setSelection(item, sel);
			}

		} else {
			setSelection(item, sel);
		}
	}

	// if sel = "X", automated turn will be initated
	// AutomatedTurn will skip this case/switch check
	function setSelection(item, sel) {
		if(selItm === "") {
			selItm = "X";
			storedBoxArrX.push(item);
			changeItem(item, selItm);
		} else if (selItm === "O") {
			selItm = "X";
			storedBoxArrX.push(item);
			changeItem(item, selItm);
		} else {
			console.log("Nothing happened...");
		}
	}

	// This method is what generates the computer turn
	// using Math.random() it searches empty boxes then stores
	// the selItem(Player letter) into the box
	function runAutomatedTurn() {
		if(found == false){
			// create a new array for empty box items
			let emptyBxArr = [];
			// loop through all box elements with the class .box
			// then store to empty box array
		     for(var i = 0; i<boxElements.length; i++){
				let c = document.getElementById(boxElements[i].id);
				if(c.innerHTML === ""){
					emptyBxArr.push(boxElements[i].id);
				}
		     }
			// using the empty boxArray choose a random box to player
			// for computer user
			var randBx = emptyBxArr.sort(function() {
				return 0.5 - Math.random()
			})[0];
			// if emptybox array is not empty, use the randBx's array
			// to randomly place the automated move
			if(emptyBxArr.length !== 0) {
				randArr = randBx.toString();
				changeItem(randArr, comPlayer);
			}
		}
	}

	// method used for onclick event - refresh page
	function refreshPg() {
		window.location.reload();
	}
}
