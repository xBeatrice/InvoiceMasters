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

// AUTHENTIFICATION SERVICE

const register = () => {
  const email = document.getElementById("newAccEmail").value;
  const password = document.getElementById("newAccPassword").value;

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      console.log(res.user);
      location.href = "profilePage.html";
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
      location.href = "profilePage.html";
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
      location.href = "authentificationPage.html";
    })
    .catch((error) => {
      console.error(error);
    });
};

const resetPassword = () => {
  const email = currentUser;

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
    currentUser = user.email;
    loggedIn = true;
    // } else {
    // currentUser=s4()+s4()+ '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
});

//PROJECTS STORAGE SERVICE

let projectId = "";
const newProject = (name, description, date, currentUser) => {
  return db.collection("projects").add({
    name,
    description,
    date,
    currentUser,
  });
};

const getProjects = () => db.collection("projects").get();

const newTemplate = (name, description, date, currentUser, projectId) => {
  db.collection("templates")
    .add({
      name,
      description,
      date,
      currentUser,
      projectId,
    })
    .then((queryResult) =>
      console.log("Document written with ID: ", queryResult.id)
    )
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
};

const newCompany = (
  companyName,
  companyAdress,
  companyVAT,
  companyIBAN,
  currentUser,
  companyInvoiceNo
) => {
  return db
    .collection("companyInfo")
    .add({
      companyName,
      companyAdress,
      companyVAT,
      companyIBAN,
      currentUser,
      companyInvoiceNo,
    })
    .then((queryResult) =>
      console.log("Document written with ID: ", queryResult.id)
    )
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
};

const newVendor = (
  vendorName,
  vendorAdress,
  vendorVAT,
  vendorEmail,
  currentUser
) => {
  return db
    .collection("vendors")
    .add({
      vendorName,
      vendorAdress,
      vendorVAT,
      vendorEmail,
      currentUser,
    })
    .then((queryResult) =>
      console.log("Document written with ID: ", queryResult.id)
    )
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
};

const newProduct = (
  productName,
  productDescription,
  productPrice,
  productStock,
  currentUser
) => {
  return db
    .collection("products")
    .add({
      productName,
      productDescription,
      productPrice,
      productStock,
      currentUser,
    })
    .then((queryResult) =>
      console.log("Document written with ID: ", queryResult.id)
    )
    .catch((err) => {
      console.log(err.code);
      console.log(err.message);
    });
};

const getProducts = () => db.collection("products").get();

const getVendors = () => db.collection("vendors").get();

const updateVendor = async (vendorId, name, adress, VAT, email) => {
  db.collection("vendors").doc(vendorId).set({
    vendorName: name,
    vendorAdress: adress,
    vendorVAT: VAT,
    vendorEmail: email,
    currentUser: currentUser,
  });
};
const updateProduct = async (productId, name, description, price, stock) => {
  db.collection("products").doc(productId).set({
    productName: name,
    productDescription: description,
    productPrice: price,
    productStock: stock,
    currentUser: currentUser,
  });
};
const getCompanyInfo = () => db.collection("companyInfo").get();

const updateCompanyInfo = async (
  companyId,
  name,
  adress,
  VAT,
  IBAN,
  currentUser,
  companyInvoiceNo
) => {
  db.collection("companyInfo").doc(companyId).set({
    companyName: name,
    companyAdress: adress,
    companyVAT: VAT,
    companyIBAN: IBAN,
    currentUser: currentUser,
    companyInvoiceNo: companyInvoiceNo,
  });
};

const updateCompanyInvoiceNo = async (companyId, companyInvoiceNo) => {
  db.collection("companyInfo").doc(companyId).set({
    companyInvoiceNo: companyInvoiceNo,
    companyName: companyName,
    companyAdress: companyAdress,
    companyVAT: companyVAT,
    companyIBAN: companyIBAN,
    currentUser: currentUser,
  });
};

const getTemplates = () => db.collection("templates").get();

const editProjectData = async (projectId, today, newName, newDescription) => {
  db.collection("projects").doc(projectId).set({
    name: newName,
    description: newDescription,
    date: today,
    currentUser: currentUser,
  });
};

const editTemplateData = async (
  templateId,
  today,
  newName,
  newDescription,
  projectId
) => {
  db.collection("templates").doc(templateId).set({
    name: newName,
    description: newDescription,
    date: today,
    currentUser: currentUser,
    projectId: projectId,
  });
};
const modifyTemplateContent = async (templateId, templateContent) => {
  db.collection("templates")
    .doc(templateId)
    .set({ content: templateContent }, { merge: true });
};
const deleteProjectDB = async (projectId) => {
  db.collection("projects").doc(projectId).delete();
};
const deleteTemplateDB = async (templateId) => {
  db.collection("templates").doc(templateId).delete();
};
const deleteVendorData = async (vendorId) => {
  db.collection("vendors").doc(vendorId).delete();
};
const deleteProductData = async (productId) => {
  db.collection("products").doc(productId).delete();
};
