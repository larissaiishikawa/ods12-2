// Função para incluir os dados do formulário em uma lista e no Local Storage

let formEntries = JSON.parse(localStorage.getItem('formEntries')) || [];
const form = document.querySelector('.contato-form');
const list = document.querySelector('#list');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    let formData = {
        name: form.elements['name'].value,
        email: form.elements['email'].value,
        phone: form.elements['phone'].value,
        message: form.elements['message'].value,
        date: new Date().toLocaleDateString()  // Padronizando a exibição da data
    };

    formEntries.push(formData);
    localStorage.setItem('formEntries', JSON.stringify(formEntries));

    clearFormFields();

    displayFormEntries();
});


// Função para pesquisar na lista
const searchField = document.querySelector('#searchField');
const searchButton = document.querySelector('#searchButton');

searchButton.addEventListener('click', function () {
    const searchTerm = searchField.value.toLowerCase();

    const filteredEntries = formEntries.filter(function (entry) {
        return entry.name.toLowerCase().includes(searchTerm) || entry.email.toLowerCase().includes(searchTerm);
    });

    displayFormEntries(filteredEntries);
});

// Função para excluir um item da lista e do Local Storage
function deleteFormEntry(index) {
    formEntries.splice(index, 1);
    localStorage.setItem('formEntries', JSON.stringify(formEntries));
    displayFormEntries();
}

function addDeleteButton(li, index) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.dataset.index = index;  // Armazenando o índice como um atributo de dados

    deleteButton.addEventListener('click', function () {
        const indexToDelete = parseInt(this.dataset.index);
        deleteFormEntry(indexToDelete);
    });

    li.appendChild(deleteButton);
}


// Função para excluir todos os itens da lista e do Local Storage
function deleteAllFormEntries() {
    formEntries = [];
    localStorage.setItem('formEntries', JSON.stringify(formEntries));
    displayFormEntries();
}

const deleteAllButton = document.querySelector('#deleteAllButton');
deleteAllButton.addEventListener('click', deleteAllFormEntries);

// Função para limpar os campos do formulário
const clearButton = document.querySelector('#clearButton');

function clearFormFields() {
    form.reset();
}

clearButton.addEventListener('click', clearFormFields);

// Função para exibir as entradas do formulário em uma lista na página
function displayFormEntries(entries = formEntries) {
    list.innerHTML = '';

    entries.forEach(function (entry, index) {
        const li = document.createElement('li');
        const formattedDate = entry.date;
        li.textContent = `Data: ${formattedDate}, Nome: ${entry.name}, Email: ${entry.email}, Telefone: ${entry.phone}, Mensagem: ${entry.message}`;
        li.dataset.index = index;

        addDeleteButton(li);

        list.appendChild(li);
    });
}


// Função para exibir as entradas iniciais ao carregar a página
displayFormEntries();

// Função para mostrar a lista completa
function showAllEntries() {
    displayFormEntries(formEntries);
}

const showAllButton = document.querySelector('#showAllButton');
showAllButton.addEventListener('click', showAllEntries);