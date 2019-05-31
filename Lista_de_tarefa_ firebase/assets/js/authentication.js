var authGitHubButton = document.getElementById('authGitHubButton');
var authEmailPassButton = document.getElementById('authEmailPassButton');
var authGoogleButton = document.getElementById('authGoogleButton');
var authTwitterButton = document.getElementById('authTwitterButton');
var authFacebookButton = document.getElementById('authFacebookButton');
var authAnonymouslyButton = document.getElementById('authAnonymouslyButton');
var createUserButton = document.getElementById('createUserButton');
var logOutButton = document.getElementById('logOutButton');
var perfil = document.getElementById('perfil');




//Inputs
var emailInput = document.getElementById('emailInput');
var passwordInput = document.getElementById('passwordInput');

//Display

var displayName = document.getElementById('displayName');

 // --------------------------------------------------------------------------

 createUserButton.addEventListener('click', function(){
 	firebase
 	.auth()
 	.createUserWithEmailAndPassword(emailInput.value, passwordInput.value)
 	.then(function(){
 		alert('Bem vindo '+emailInput.value);
 	}).catch(function(error){
 		console.log(error.code);
 		console.log(error.message);
 		alert("Falha ao cadastrar");
 	});
 });

 // --------------------------------------------------------------------------

 authEmailPassButton.addEventListener('click', function(){
 	firebase
 	.auth()
 	.signInWithEmailAndPassword(emailInput.value, passwordInput.value)
 	.then(function(results){
 		console.log(results);
 		displayName.innerText = 'Bem vindo,' +emailInput.value;
 		alert('Autenticado '+emailInput.value)
 	}).catch(function(error){
 		console.log(error.code);
 		console.log(error.message);
 		alert("Falha ao Autenticar");
 	});
 });

  // --------------------------------------------------------------------------

  logOutButton.addEventListener('click', function(){
 	firebase
 	.auth()
 	.signOut()
 	.then(function(){
 		displayName.innerText = 'Você não esta autenticado!!!';
 		alert('Você deslogou');
 	},function(error){
 		console.log(error);
 	});
 });

// --------------------------------------------------------------------------

authAnonymouslyButton.addEventListener('click', function(){
 	firebase
 	.auth()
 	.signInAnonymously()
 	.then(function(results){
 		console.log(results);
 		displayName.innerText = 'Bem vindo, desconhecido';
 		alert('Autenticado anonimamente!!!');
 	}).catch(function(error){
 		console.log(error.code);
 		console.log(error.message);
 		alert("Falha ao Autenticar");
 	});
 });

// --------------------------------------------------------------------------

// para criar uma autenticação no git:
// https://github.com/settings/applications/new
authGitHubButton.addEventListener('click', function(){
	var provider = new firebase.auth.GithubAuthProvider();
	signIn(provider);
});

// --------------------------------------------------------------------------

authGoogleButton.addEventListener('click', function(){
	var provider = new firebase.auth.GoogleAuthProvider();
	signIn(provider);
});

// --------------------------------------------------------------------------

// http://apps.twitter.com

authTwitterButton.addEventListener('click', function(){
	var provider = new firebase.auth.TwitterAuthProvider();
	signIn(provider);
});


// --------------------------------------------------------------------------

authFacebookButton.addEventListener('click', function(){
	var provider = new firebase.auth.FacebookAuthProvider();
	signIn(provider);
});

// --------------------------------------------------------------------------


function signIn(provider){
	firebase.auth()
	.signInWithPopup(provider)
	.then(function(results){
		console.log(results);
		var token = results.credential.accessToken;
		displayName.innerText = 'Bem vindo, '+results.user.displayName;
	

		var img = document.createElement('img');
		img.setAttribute("src", results.user.photoURL);
		img.setAttribute("width", "100");
  		img.setAttribute("height", "100");

		perfil.appendChild(img);



	}).catch(function(error){
		console.log(error);
		alert('Falha na Autenticação');
	});
}

