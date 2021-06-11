var nameInput = document.getElementById("name");
var emailInput = document.getElementById("email");
var submitEmail = document.getElementById("submitEmail");
var emailAlert = document.getElementById("emailAlert")



var db = firebase.firestore();

submitEmail.onclick = function() {
	hideAlert(emailAlert)
	if (nameInput.value == "") {
		unfade(emailAlert)
		emailAlert.classList.remove("alert-success")
		emailAlert.classList.remove("alert-danger")
		emailAlert.classList.add("alert-warning")
		nameInput.focus()
		emailAlert.innerHTML = "Please enter your name.<button type='button' class='close' aria-label='Close' onclick='hideAlert()'><span aria-hidden='true'>&times;</span></button>"
	} else if (emailInput.value == "") {
		unfade(emailAlert)
		emailAlert.classList.remove("alert-success")
		emailAlert.classList.remove("alert-danger")
		emailAlert.classList.add("alert-warning")
		emailAlert.innerHTML = "Please enter a valid email address.<button type='button' class='close' aria-label='Close' onclick='hideAlert()'><span aria-hidden='true'>&times;</span></button>"
		emailInput.focus()
	} else {
		db.collection("mailing").doc(emailInput.value).set({
		    name: nameInput.value,
		})
		.then(() => {
		    unfade(emailAlert)
			emailAlert.classList.remove("alert-warning")
			emailAlert.classList.remove("alert-danger")
			emailAlert.classList.add("alert-success")
			emailAlert.innerHTML = "Success! We're excited to reach out to you soon!<button type='button' class='close' aria-label='Close' onclick='hideAlert()'><span aria-hidden='true'>&times;</span></button>"
		})
		.catch((error) => {
		    unfade(emailAlert)
			emailAlert.classList.remove("alert-success")
			emailAlert.classList.remove("alert-danger")
			emailAlert.classList.add("alert-danger")
			emailAlert.innerHTML = "<strong>Oh no!</strong> Something went wrong, please try again later.<button type='button' class='close' aria-label='Close' onclick='hideAlert()'><span aria-hidden='true'>&times;</span></button>"
		});
	}
}

function unfade(element) {
	element.style.opacity = 0.1;
	var op = 0.1;  // initial opacity
	var timer = setInterval(function () {
    if (op >= 1){
        clearInterval(timer);
    }
    element.style.opacity = op;
    element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function hideAlert() {
	emailAlert.style.opacity = 0;
}

function rollDice() {
  return new Promise((resolve, reject) => {
    const dice = document.getElementById('dice');
    let numberOfRollsLeft = Math.floor(Math.random() * 25 + 5);

    const intervalId = setInterval(() => {
      const diceValue = Math.floor(Math.random() * 6 + 1);

      // Display the dice's face for the new value
      dice.src = `./images/dice/dice${diceValue}.png`;

      // If we're done, stop rolling and return the dice's value
      if (--numberOfRollsLeft < 1) {
        clearInterval(intervalId);
        resolve(diceValue);
      }
    }, 50);
  });
}