/**
 * @author Mikhail Fassakhov
 */
window.onload=initCard;

var howManyTimes;
var selectedCard;
function initCard(){
	document.getElementById("mash").addEventListener('click',function(){howManyTimes=10;mashCards();},false);
	document.getElementById("card1").addEventListener('click',function(){cardSelected(this);},false);
	document.getElementById("card2").addEventListener('click',function(){cardSelected(this);},false);
	document.getElementById("card3").addEventListener('click',function(){cardSelected(this);},false);
}

function cardSelected(elmt){
	console.log('card selected is',elmt);
	
	document.getElementById("card1").removeEventListener('click',function(){cardSelected(this);},false);
	document.getElementById("card2").removeEventListener('click',function(){cardSelected(this);},false);
	document.getElementById("card3").removeEventListener('click',function(){cardSelected(this);},false);
	
	if(!selectedCard){
	selectedCard=elmt;
	howManyTimes=5;
	document.getElementById("card3").addEventListener('transitionend', mashCards, false);
	document.getElementById("card3").addEventListener('webkitTransitionEnd', mashCards, false);
	flipCard(document.getElementById("card1"));
	flipCard(document.getElementById("card2"));
	flipCard(document.getElementById("card3"));
	}
	console.log(selectedCard);
}

function flipCard(elmt){
	elmt.classList.toggle('flipped');
	console.log('we are flipping',elmt);
}

//mashing cards function, moves them around randomly till howManyTimes var is 0
function mashCards(e){
	
		console.log(e);
	
		if (howManyTimes==0){checkIfYouWon(); return false;}
		howManyTimes--;
		var rndSelect=Math.random();
		
		console.log('mashCards running ',howManyTimes);
		console.log('current random number ',rndSelect);
		
		var leftCard=document.getElementsByClassName("left")[0];
		console.log('mashcards',leftCard);
		var middleCard=document.getElementsByClassName("middle")[0];
		console.log('mashcards',middleCard);
		var rightCard=document.getElementsByClassName("right")[0];
		console.log('mashcards',rightCard);
		
		document.getElementById("card3").removeEventListener('webkitTransitionEnd', mashCards, false);
		leftCard.removeEventListener('transitionend',mashCards,true);
		middleCard.removeEventListener('transitionend',mashCards,true);
		rightCard.removeEventListener('transitionend',mashCards,true);
		leftCard.removeEventListener('webkitTransitionEnd',mashCards,true);
		middleCard.removeEventListener('webkitTransitionEnd',mashCards,true);
		rightCard.removeEventListener('webkitTransitionEnd',mashCards,true);
		
		
		if (rndSelect>=0.6){
			console.log('>=0,6');
			leftCard.addEventListener('transitionend', mashCards, true);
			leftCard.addEventListener('webkitTransitionEnd', mashCards, true);
			removeThemPositions(leftCard);
			removeThemPositions(middleCard);
			console.log('old positions removed');
			leftCard.classList.add("middle");
			middleCard.classList.add("left");
			console.log("new classes added");
		}
		else if (rndSelect>=0.3 && rndSelect<0.6){
			console.log('>=0,3 and <0.6');
			middleCard.addEventListener('transitionend', mashCards, true);
			middleCard.addEventListener('webkitTransitionEnd', mashCards, true);
			removeThemPositions(rightCard);
			removeThemPositions(middleCard);
			console.log('old positions removed');
			rightCard.classList.add("middle");
			middleCard.classList.add("right");
			console.log("new classes added");

		}
		else{
			console.log('whateverelse');
			rightCard.addEventListener('transitionend', mashCards, true);
			rightCard.addEventListener('webkitTransitionEnd', mashCards, true);
			removeThemPositions(leftCard);
			removeThemPositions(rightCard);
			console.log('old positions removed');
			leftCard.classList.add("right");
			rightCard.classList.add("left");
			console.log("new classes added");

		}
	
	
}

function checkIfYouWon(){
	document.getElementById("card1").addEventListener('click',function(){flipCard(this); playAlert(this);},false);
	document.getElementById("card2").addEventListener('click',function(){flipCard(this);playAlert(this);},false);
	document.getElementById("card3").addEventListener('click',function(){flipCard(this);playAlert(this);},false);
}

function playAlert(elmt){
	if (elmt==selectedCard){
		document.getElementsByTagName('h1')[0].firstChild.nodeValue='you won';
	}
	else{
		document.getElementsByTagName('h1')[0].firstChild.nodeValue='wrong card';
	}
}

function removeThemPositions(elementTo){
	elementTo.classList.remove("left");
	elementTo.classList.remove("middle");
	elementTo.classList.remove("right");
}