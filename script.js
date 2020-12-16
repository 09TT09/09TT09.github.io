// Tableau de tous les boutons

const buttonValue = [
  'Qu\'est-ce que Appetee ?',
  'Pour qui est faite l\'application ?',
  'Comment créer un compte ?',
  'Quelle est l\'histoire d\'Appetee ?',
  /*'Combien coûte ce service',*/
  'J\'ai une autre question',
]

// Tableau des réponses du bot

const botResponse = [
  'Appetee est une application mobile permettant de simplifier la recherche de recettes adaptées à vos goûts...',
  'L\'application est idéale pour les familles ainsi que pour les étudiants souhaitant trouver des recettes adaptées à leurs besoins...',
  'Pour créer un compte, il vous suffit d\'aller sur l\'application Appetee et de rentrer votre email ainsi qu\'un mot de Passe...',
  'L\'entreprise Appetee à été fondée en ... par ... et se spécialise dans ...',
  /*'Ce service coûte ...',*/
  'Vous pouvez poser votre question directement via Messenger (lien messenger Appetee) ou envoyer un mail à l\'adresse <span style="color:#c01824">appetee.app@gmail.com</span><br><br>Vous pouvez aussi remplir un formulaire ici : <br><br><button onclick="ouvrirFormulaire()" class="button_form">Formulaire</button>',
]

let getNumberButtonClick = 0;
let IsFormulaire = false;

afficherBoutons();

// Permet de fermer le chatbot
document.getElementById('closeChatbot').addEventListener('click', function(e) {
  document.getElementById('openChatbotFlexbox').style.display = 'flex';
  document.getElementById('chatbot').style.display = 'none';
});

// Permet d'ouvrir le chatbot
document.getElementById('openChatbot').addEventListener('click', function(e) {
  document.getElementById('openChatbotFlexbox').style.display = 'none';
  document.getElementById('chatbot').style.display = 'block';
});

// Supprime les boutons et les remplacent par un formulaire de contact
function ouvrirFormulaire() {
  if (IsFormulaire === false){
    document.getElementById("flexbox").innerHTML = '';
    document.getElementById('listeMessages').style.height = 'calc( 100% - 278px)';
    document.getElementById('flexbox').style.height = '216px';
    IsFormulaire = true;
    setTimeout(function(){
      afficherFormulaire();
    }, 300);
  }
}

function exitForm(){
  document.getElementById("flexbox").innerHTML = '';
  document.getElementById('listeMessages').style.height = 'calc(100% - 208px)';
  document.getElementById('flexbox').style.height = '146px';
  setTimeout(function(){
    IsFormulaire = false;
    afficherBoutons();
  }, 300);
}

// Affiche le formulaire de contact
function afficherFormulaire() {
  let formulaire = '<div class="first_content_form"> <div class="button_form_div"><input type="button" class="exit_form" onclick="exitForm()" value="X"></div> <div class="title_form_div"><p class="title_form">Formulaire</p></div></div>'
    + '<form class="chat_form"><div class="chat_form_section_1"><label class="form_label">Adresse email</label><input class="input_form" type="text" />'
    + '<label class="form_label">Nom</label><input class="input_form" type="text" /></div>'
    + '<div class="chat_form_section_2"><label class="form_label">Message</label><textarea class="textarea_form"></textarea></div>'
    + '<input type="button" class="button_chat_form_submit" value="Envoyer"/></form>';

  document.getElementById("flexbox").insertAdjacentHTML('afterbegin', formulaire);
}

// Nous Affichons les boutons dans le html
function afficherBoutons() {
  let boutonInHtml = '';
  for (let i = 0; i < buttonValue.length; i++) {
    boutonInHtml += '<input type="button" class="bouton_reponse" value="' + buttonValue[i] + '"></input>';
  }
  document.getElementById("flexbox").insertAdjacentHTML('afterbegin', boutonInHtml);
  showMessage();
}

// Sur le click d'un bouton, nous affichons le message du bouton dans le html
function showMessage(){
  for (let i = 0; i < botResponse.length; i++) {
    document.getElementsByClassName('bouton_reponse')[i].addEventListener('click', function(e) {
      document.getElementById("listeMessages").insertAdjacentHTML(
      'beforeend',
      '<div class="message user_message"><div class="message_text_user"><p>' + document.getElementsByClassName('bouton_reponse')[i].value + '</p></div><div class="message_absolute_box_user"><div class="message_absolute_box_flexbox"><img src="img/user_redim.png" alt="Logo utilisateur"></div></div></div>'
      );
      document.getElementsByClassName('message')[document.getElementsByClassName('message').length - 1].scrollIntoView({behavior: "smooth"});
      getNumberButtonClick = i;
      unclickableButton();
    });
  }
}

// Nous rendons les boutons non clickable temporairement le temps que le bot réponde
function unclickableButton() {
  for (let i = 0; i < botResponse.length; i++) {
    document.getElementsByClassName("bouton_reponse")[i].style.pointerEvents = 'none';
    document.getElementsByClassName("bouton_reponse")[i].style.background = 'linear-gradient(to right, #acacac, #d5d5d5)';
  }
  document.getElementById("flexbox").style.overflowY = 'hidden';
  AutomaticResponse();
}

// Nous envoyons une réponse automatique
function AutomaticResponse() {
  setTimeout(function(){
    document.getElementById("listeMessages").insertAdjacentHTML(
      'beforeend',
      '<div class="message bot_message"><div class="message_absolute_box_bot"><div class="message_absolute_box_flexbox"><img src="img/appetee_logo_redim.png" alt="Logo robot"></div></div><div class="message_text_bot"><p>' + botResponse[getNumberButtonClick] + '</p></div></div>'
    );
    document.getElementsByClassName('message')[document.getElementsByClassName('message').length - 1].scrollIntoView({behavior: "smooth"});
    for (let i = 0; i < botResponse.length; i++) {
      document.getElementsByClassName("bouton_reponse")[i].style.pointerEvents = 'auto';
      document.getElementsByClassName("bouton_reponse")[i].style.background = 'linear-gradient(to right, #ff9797, #ffc4bd)';
      document.getElementById("flexbox").style.overflowY = 'auto';
    }
  }, 1000);
}