// Configuración de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyDKrW6ytkqv8kDsSpQryCG1f7rzcYVI1Dg",
    authDomain: "clientes-pedidos-yollotlparfum.firebaseapp.com",
    projectId: "clientes-pedidos-yollotlparfum",
    storageBucket: "clientes-pedidos-yollotlparfum.firebasestorage.app",
    messagingSenderId: "58924847959",
    appId: "1:58924847959:web:4efcbdb172182d53066412",
    measurementId: "G-DTBXM6Y33E"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Obtener elementos del DOM
const nameInput = document.getElementById('nameInput');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

// Función para deshabilitar todos los botones
function disableButtons() {
    button1.disabled = true;
    button2.disabled = true;
    button3.disabled = true;
    window.onbeforeunload = function() {
        disableButtons();
    };
}

// Función para habilitar todos los botones
function enableButtons() {
    button1.disabled = false;
    button2.disabled = false;
    button3.disabled = false;
    window.onbeforeunload = null;
}

// Función para agregar datos al documento "documentoExistenteId" en Firestore
function updateData(buttonId) {
    const name = nameInput.value.trim();
    if (name) {
        // ID del documento que se va a actualizar
        const documentId = "DatosDePedido";
        
        db.collection('users').doc(documentId).update({
            name: name,
            button: buttonId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert('Datos actualizados con éxito en el documento existente.');
        })
        .catch(error => {
            console.error('Error al actualizar los datos en el documento existente:', error);
        });
    } else {
        alert('Por favor, ingrese su nombre.');

    }
}

// Función para crear un nuevo documento en la colección "users"
function createNewDocument(buttonId) {
    const name = nameInput.value.trim();
    if (name) {
        db.collection('users').add({
            name: name,
            button: buttonId,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            alert('Nuevo documento creado con éxito.');
          
        })
        .catch(error => {
            console.error('Error al crear el nuevo documento:', error);
            enableButtons(); // Habilitar botones incluso si ocurre un error
        });
    } else {
        alert('Por favor, ingrese su nombre.');
        enableButtons(); // Habilitar botones si no se ingresa el nombre
    }
}

// Event listeners para los botones
button1.addEventListener('click', () => {
    disableButtons(); // Deshabilitar botones al presionar uno
    updateData('button1');
    createNewDocument('button1');
});
button2.addEventListener('click', () => {
    disableButtons(); // Deshabilitar botones al presionar uno
    updateData('button2');
    createNewDocument('button2');
});
button3.addEventListener('click', () => {
    disableButtons(); // Deshabilitar botones al presionar uno
    updateData('button3');
    createNewDocument('button3');
});
