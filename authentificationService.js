const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDnEbOepblXj2qxiwT8GMLYb_hZpWhZAvM",
  authDomain: "invoicemasters.firebaseapp.com",
  projectId: "invoicemasters",
  storageBucket: "invoicemasters.appspot.com",
  messagingSenderId: "114175730381",
  appId: "1:114175730381:web:fc9365bd8e0f0360aa7f84",
  measurementId: "G-YFVW8PFMNM",
});

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();

const register = () => {
  const email = document.getElementById("newAccEmail").value;
  const password = document.getElementById("newAccPassword").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res.user);
      window.location.href = "profilePage.html";
    })
    .catch((err) => {
      alert(
        "Adresa de mail nu exista sau deja a fost creat un cont cu aceasta adresa."
      );
      console.log(err.code);
      console.log(err.message);
    });
};

let currentUser = {};

const signIn = () => {
  const email = document.getElementById("signInEmail").value;
  const password = document.getElementById("signInPassword").value;

  auth
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res.user);

      currentUser = res.user;

      window.location.href = "profilePage.html";
    })
    .catch((err) => {
      alert("Email sau parola gresita. Incearca din nou!");
      console.log(err.code);
      console.log(err.message);
    });
};

const logOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("Logged out");
    })
    .catch((error) => {
      console.error(error);
    });
};

const resetPassword = () => {
  const email = document.getElementById("resetPassUser").value;

  auth
    .sendPasswordResetEmail(email)
    .then(() => {
      alert("Emailul de resetare a parolei a fost trimis cu succes.");
    })
    .catch((error) => {
      console.error(error);
    });
};
//asign random unique id to users not logged in
let s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

// listen for auth status changes

let loggedIn = false;
auth.onAuthStateChanged((user) => {
  if (user) {
    currentUser = user.displayName;
    loggedIn = true;
    // } else {
    // currentUser=s4()+s4()+ '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
});
