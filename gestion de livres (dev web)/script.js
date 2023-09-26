
const livreTable = document.getElementById("livre");
const form = document.getElementById("form");
const titreInput = document.getElementById("titre");
const auteurInput = document.getElementById("auteur");
const prixInput = document.getElementById("prix");
const ajouterButton = document.getElementById("Ajouter");


let livres = [];

// ajouter livre
function addLivre(event) {
    event.preventDefault();
    const titre = titreInput.value;
    const auteur = auteurInput.value;
    const prix = parseFloat(prixInput.value);

    if (!titre || !auteur || isNaN(prix)) {
        alert("Veuillez remplir tous les champs correctement.");
        return;
    }

    const livre = {
        id: Date.now(),
        titre,
        auteur,
        prix
    };

    livres.push(livre);
    displayLivres();
    form.style.display = "none";
    ajouterButton.style.display = "block";
    form.reset();
}

// Afficher les livres
function displayLivres() {
    livreTable.innerHTML = "";
    livres.forEach(livre => {
        const row = document.createElement("tr");
        const rowHTML = `
            <td>${livre.id}</td>
            <td>${livre.titre}</td>
            <td>${livre.auteur}</td>
            <td>${livre.prix}</td>
            <td>
                <button onclick="editLivre(${livre.id})">Editer</button>
            </td>
            <td>
                <button onclick="deleteLivre(${livre.id})">Supprimer</button>
            </td>
        `;
        row.innerHTML = rowHTML;
        livreTable.appendChild(row);
    });
}


// supprimer livre
function deleteLivre(id) {
    const livreToDelete = livres.find(livre => livre.id === id);

    if (!livreToDelete) {
        alert("Le livre que vous essayez de supprimer n'existe pas.");
        return;
    }

    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer le livre "${livreToDelete.titre}" ?`);

    if (confirmation) {
        livres = livres.filter(livre => livre.id !== id);
        displayLivres();
        alert(`Le livre "${livreToDelete.titre}" a été supprimé.`);
    }
}


// editer livre
function editLivre(id) {
    const livreToEdit = livres.find(livre => livre.id === id);
    if (livreToEdit) {
        titreInput.value = livreToEdit.titre;
        auteurInput.value = livreToEdit.auteur;
        prixInput.value = livreToEdit.prix;
        deleteLivre(id);
        form.style.display = "block";
        ajouterButton.style.display = "none";
    }
}

// cacher le formulaire
ajouterButton.addEventListener("click", () => {
    form.style.display = "block";
    ajouterButton.style.display = "none";
});


form.addEventListener("submit", addLivre);

displayLivres();
