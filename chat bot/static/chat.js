//---------------------------------------------------------------- Chatbot open loading page

window.onload = function () {
  setTimeout(function () {
    var coll = document.getElementsByClassName("menubar");
    for (let i = 0; i < coll.length; i++) {
      coll[i].classList.add("active");
      var content = coll[i].nextElementSibling;
      content.style.maxHeight = content.scrollHeight + "px";
      document.getElementById("mini-iconbot").style.display = "none";
      document.getElementById("chat-button").style.display = "block";
      document.getElementById("bubbleContent").style.display = "none";
    }
  }, 300);
};

//------------------------------------------------------------------------ Chatbot open

var coll = document.getElementsByClassName("menubar");
var activateButton = document.getElementById("mini-iconbot");

activateButton.addEventListener("click", function () {
  for (let i = 0; i < coll.length; i++) {
    coll[i].classList.add("active");
    var content = coll[i].nextElementSibling;
    content.style.maxHeight = content.scrollHeight + "px";
    document.getElementById("mini-iconbot").style.display = "none";
    document.getElementById("chat-button").style.display = "block";
    document.getElementById("bubbleContent").style.display = "none";
  }
});

//------------------------------------------------------------------------ Chatbot close

function closeBot() {
  var coll = document.getElementsByClassName("menubar");

  setTimeout(function () {
    for (let i = 0; i < coll.length; i++) {
      coll[i].classList.remove("active");

      var content = coll[i].nextElementSibling;

      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
      document.getElementById("mini-iconbot").style.display = "block";
      document.getElementById("bubbleContent").style.display = "block";
    }
    document.getElementById("chat-button").style.display = "none";
  }, 500);
}

//-------------------------------------------------------------------------------- time

function getTime() {
  let today = new Date();
  hours = today.getHours();
  minutes = today.getMinutes();

  let day = today.getDate();
  let month = today.getMonth();
  let year = today.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  console.log(currentDate)

  if (hours < 10) {
    hours = "0" + hours;
    console.log(hours);
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
    console.log(minutes);
  }

  let time = "Le "+ currentDate +" "+ "à " + hours + ":" + minutes;
  console.log(time);
  return time;
 
}

//----------------------------------------------------------------- Message de bienvenue

function firstBotMessage() {
  let firstMessage =
    "Bonjour! je suis SkapGPT, votre assistant virtuel! 🤖 Comment-puis-je vous aider?";
  document.getElementById("botStarterMessage").innerHTML =
    ' <p class="botText">&nbsp;&nbsp;<img src="/ressource/logo.png" width="25px" height="25px"> SkapGPT: <br><span>' +
    firstMessage +
    "</span></p>";
  let time = getTime();
  $("#chat-timestamp").append(time);
  document.getElementById("userInput").scrollIntoView(false);
}

firstBotMessage();

//---------------------------------------------------------------------- reponse bot

function getHardResponse(userText) {
  let botResponse = getBotResponse(userText);
  let botHtml =
    ' <br><p class="botText">&nbsp;&nbsp;<img src="/ressource/logo.png" width="25px" height="25px"> SkapGPT: <br><span>' +
    botResponse +
    "</span></p>";
  $("#chatbox").append(botHtml);
  document.getElementById("chatbarbottom").scrollIntoView(true);
}

//-------------------------------------------------------------- reponse input


//-------------------------------------------------------- envoi de la saisie dans l'input de message

function buttonSendText(sampleText) {
  let userHtml =
    '<p class="userText">Vous:&nbsp;&nbsp;&nbsp;<br><span>' +
    sampleText +
    "</span></p>";
  $("#textInput").val("");
  $("#chatbox").append(userHtml);
  document.getElementById("chatbarbottom").scrollIntoView(true);
}

function sendButton() {
  getResponse();
}

function getreponseafterfile(userText) {
  if (userText == "fichiers envoyés") {
    getBotResponse();
    $("#chatbox").append(botHtml);
  }
}
function uploadButton() {
  document.getElementById("uploadbox").style.display = "block";
  document.getElementById("blockbox").style.background = "#c1c2c3";
  document.getElementById("textInput").disabled = true;
  var maDiv = document.querySelector(".chat-container");
  maDiv.style.overflow = "hidden"; 
  maDiv.scrollTop = maDiv.scrollHeight - maDiv.clientHeight;
  document.getElementById("chatbox").style.opacity = "0.2";
  document.getElementById("inputchatuser").style.opacity = "0.4";

}

// --------------------------------------------------------- raccourci de l'enter pour valider le message saisi

$("#textInput").keypress(function (e) {
  if (e.which == 13) {
    getResponse();
  }
});

function closeInput() {
  document.getElementById("blockbox").style.background = "white";
  document.getElementById("uploadbox").style.display = "none";
  buttonSendText("fichiers envoyés");
  document.getElementById("textInput").disabled = false;
  document.getElementById("textInput").style.background = "white";
  document.getElementById("inputchatuser").style.background = "#eceeee";
  document.getElementById("userInput").style.background = "#eceeee";
  document.getElementById("textInput").style.display = "block";
  document.getElementById("inputchatuser").style.display = "flex";
  var maDiv = document.querySelector(".chat-container");
  maDiv.scrollTop = maDiv.scrollHeight - maDiv.clientHeight;
  getreponseafterfile();
  maDiv.style.overflow = "auto"; 
  document.getElementById("chatbox").style.opacity = "1";
  document.getElementById("inputchatuser").style.opacity = "1";
  let file = document.querySelector('.form-control');
  file.value = '';
  document.getElementById("sendbutton").disabled = true;

}

function closeInput2() {
  document.getElementById("blockbox").style.background = "white";
  document.getElementById("uploadbox").style.display = "none";
  document.getElementById("textInput").disabled = false;
  document.getElementById("textInput").style.background = "white";
  document.getElementById("inputchatuser").style.background = "#eceeee";
  document.getElementById("userInput").style.background = "#eceeee";
  document.getElementById("textInput").style.display = "block";
  document.getElementById("inputchatuser").style.display = "flex";
  var maDiv = document.querySelector(".chat-container");
  maDiv.scrollTop = maDiv.scrollHeight - maDiv.clientHeight;
  maDiv.style.overflow = "auto"; 
  document.getElementById("chatbox").style.opacity = "1";
  document.getElementById("inputchatuser").style.opacity = "1";
  document.getElementById("sendbutton").disabled = true;

}

function verifFiles(){
  if (input =! ""){
    document.getElementById("sendbutton").disabled = false;
  }else{
    document.getElementById("sendbutton").disabled = true;
  }
}

/*------------------------------------------------------------ Bot Reponse -------*/

function getResponse() {
  let userText = $("#textInput").val();
  
  if (userText == "") {
    userText = "Aide";
  }

  let userHtml =
    '<br><p class="userText">Vous:&nbsp;&nbsp;&nbsp;<br><span>' +
    userText +
    "</span></p>";
  $("#textInput").val("");
  $("#chatbox").append(userHtml);

  setTimeout(() => {
    getHardResponse(userText);
  }, 1000);
  document.getElementById("chatbarbottom").scrollIntoView(true);

  if (userText == "fichiers envoyés") {
    $("#textInput").val("");
    $("#chatbox").append(userHtml);
  
    setTimeout(() => {
      getHardResponse(userText);
    }, 1000);
    document.getElementById("chatbarbottom").scrollIntoView(true);
  }

}

//Donner l'heure à chaque click 

class HoverableElement {
  constructor(element, generatedTime) {
    this.element = element;
    this.generatedTime = generatedTime;
    this.hoverTimeAdded = false; 
    this.timeoutId = null;
  }

  addHoverEvent() {
    let self = this;
    this.element.on("click", function() {
      self.showHoverTime();
      self.startTimer();
    });
  }

  showHoverTime() {
    if (!this.hoverTimeAdded) {
      this.element.append('<span class="hoverContainer"><span class="hoverTime customHoverTime">' + this.generatedTime + '</span></span>');
      this.hoverTimeAdded = true; 
      $('.customHoverTime').fadeIn(); 
    }
  }

  hideHoverTime() {
    $('.hoverContainer').fadeOut(function() {
      $(this).remove(); 
    });
    this.hoverTimeAdded = false; 
  }

  startTimer() {
    let self = this;
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(function() {
      self.hideHoverTime();
    }, 1500);
  }
}

function getHardResponse(userText) {
  const response = getBotResponse(userText);
  let botHtml =
    ' <div class="botText customHover">&nbsp;&nbsp;<img src="/ressource/logo.png" width="25px" height="25px"> SkapGPT:</div>';


  let generatedTime = new Date().toLocaleTimeString();

  $("#chatbox").append(botHtml);

  
  let hoverableElement = new HoverableElement($(".customHover:last-child"), generatedTime);
  hoverableElement.addHoverEvent();

  showLetters(response);
  document.getElementById("chatbarbottom").scrollIntoView(true);
}


function getBotResponse(input) {
  if (input == "bonjour" || input == "salut" || input == "hello") {
    return "Bonjour! En quoi puis-je vous aider?";
  } else if (input == "aurevoir" || input == "bye" || input == "au revoir") {
    return "Aurevoir et à bientôt! 🤖";
  } else if (input == "Aide") {
    return "Je m'occupe de vous faire une simulation pour un rachat de crédit";
  } else if (input == "merci") {
    return "Mais de rien, avec plaisir! ";
  } else if (input == "rachat de credit" || input == "regroupement de crédits") {
    return "Merci de télécharger vos tableaux d'amortissement!";
  } else if (input == "fichiers envoyés") {
    return "Vos fichiers ont été pris en compte !";
  } else {
    return "Je ne comprends pas! Reformulez votre demande!";
  }
}

//function de lecture letre par lettre


function showLetters(response) {


  const chatbox = document.getElementById("chatbox");
  const botResponse = document.createElement("p");
  botResponse.classList.add("botResponse");
  chatbox.appendChild(botResponse);
  botResponse.style.maxWidth = "65%";

  const words = response.split(" ");
  let i = 0;
  let timeOut;

  function addLetter() {
    if (i < words.length) {
      botResponse.innerHTML += words[i] + " ";
      i++;
      timeOut = setTimeout(addLetter, 250); // Change the timeout value to adjust the speed of word display
      document.getElementById("chatbarbottom").scrollIntoView(true);
      document.getElementById("textInput").readOnly = true;
    } else {
      clearTimeout(timeOut);
      document.getElementById("textInput").readOnly = false;
    }
  }

  addLetter();
 
 
  
}