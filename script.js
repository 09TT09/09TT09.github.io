const buttonValue = [
  ['Je veux en apprendre d\'avantage sur Appetee.','J\'ai une question.','Je regarde juste.','Présentez-moi l\'équipe.'],
  ['Histoire d\'Appetee','Valeurs d\'Appetee','Pour qui est faite l\'application ?'],
  ['Où peut-on télécharger l\'appli ?', 'Qu\'est-ce que Appetee ?', 'Quand la société à t\'elle été créée ?'],
  ['Thème 1', 'Thème 2'],
  ['Qui est Monsieur ... ?', 'Qui est Madame ... ?']
];

const botResponse = [
  ['Que voulez-vous savoir sur Appetee ?','Quelle est votre question ?','Nous vous recommandons ces thèmes :<br>- Thème 1<br>- Thème 2','Voici les membres de l\'équipe:<br>- nom test 1<br>- nom test 2'],
  ['Appetee est à la base un projet étudiant...','Les valeurs que nous défendons sont ...','L\'application est destiné aux étudiants ainsi qu\'aux familles...'], 
  ['Voici le lien de téléchargement de l\'application <a>Ici</a>...', 'Appetee est...', 'La société à été créée en...'],
  ['Le thème 1 est...', 'Le thème 2 est...'],
  ['Monsieur ... est le fondateur de la marque.', 'Madame ... est la co-fondatrice.']
];

let numberStep = 0;
let numberButtonAccumulation = 0;
let getNumberButtonClick = 0;
let compteur = 0;

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

// Nous Affichons les boutons dans le html

function afficherBoutons() {
  let boutonInHtml = '';
  for (let i = 0; i < botResponse[numberStep].length; i++) {
    boutonInHtml += '<input type="button" class="bouton_reponse" value="' + buttonValue[numberStep][numberButtonAccumulation] + '"></input>';
    numberButtonAccumulation++;
  }
  document.getElementById("flexbox").insertAdjacentHTML('afterbegin', boutonInHtml);
  showMessage();
}

// Sur le click d'un bouton, nous affichons le message du bouton dans le html

function showMessage(){
  for (let i = 0; i < botResponse[numberStep].length; i++) {
    document.getElementsByClassName('bouton_reponse')[i].addEventListener('click', function(e) {
      document.getElementById("listeMessages").insertAdjacentHTML(
      'beforeend',
      '<div class="message user_message"><p>' + document.getElementsByClassName('bouton_reponse')[i].value + '</p><img src="img/user_redim.png" alt="Logo utilisateur"></div>'
      );
      document.getElementsByClassName('message')[document.getElementsByClassName('message').length - 1].scrollIntoView({behavior: "smooth"});
      getNumberButtonClick = i;
      deleteButton();
    });
  }
}

// Nous effaçons les boutons récents

function deleteButton() {
  document.getElementById("flexbox").innerHTML = '';
  AutomaticResponse();
}

// Nous envoyons une réponse automatique

function AutomaticResponse() {

  compteur++;

  setTimeout(function(){
    document.getElementById("listeMessages").insertAdjacentHTML(
      'beforeend',
      '<div class="message bot_message"><img src="img/user.png" alt="Logo robot"><p>' + botResponse[numberStep][getNumberButtonClick] + '</p></div>'
    );
    numberStep = getNumberButtonClick + 1;
    numberButtonAccumulation = 0;

    if (compteur >= 2){
      numberStep = 0;
      compteur = 0;
      setTimeout(function(){
        document.getElementById("listeMessages").insertAdjacentHTML(
          'beforeend',
          '<div class="message bot_message"><img src="img/user.png" alt="Logo robot"><p>Avez-vous une autre question ?</p></div>'
        );
        document.getElementsByClassName('message')[document.getElementsByClassName('message').length - 1].scrollIntoView({behavior: "smooth"});
        afficherBoutons();
      }, 500);
    }
    else {
      afficherBoutons();
    }
    document.getElementsByClassName('message')[document.getElementsByClassName('message').length - 1].scrollIntoView({behavior: "smooth"});

  }, 1000);
}