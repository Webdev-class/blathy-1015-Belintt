interface User {
    id: string;
    userName: string;
    age: number;
    address: string;
    isAdmin: boolean;
}

let users: User[] = [];

// HTML elemek referenciái
const addUserForm = document.getElementById('userForm') as HTMLDivElement;
const userTableBody = document.getElementById('userTableBody') as HTMLTableSectionElement;
const addUserBtn = document.getElementById('addUserBtn') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancelBtn') as HTMLButtonElement;
const newUserForm = document.getElementById('newUserForm') as HTMLFormElement;

// A form megjelenítése új felhasználó hozzáadásához
addUserBtn.addEventListener('click', () => {
    addUserForm.classList.remove('hidden');
});

// A form elrejtése ha a "Mégse" gombra kattintanak
cancelBtn.addEventListener('click', () => {
    addUserForm.classList.add('hidden');
});

// Felhasználó hozzáadása: tömb,táblázat
newUserForm.addEventListener('submit', (e: Event) => {
    e.preventDefault();

    const id = (document.getElementById('id') as HTMLInputElement).value;
    const userName = (document.getElementById('userName') as HTMLInputElement).value;
    const age = parseInt((document.getElementById('age') as HTMLInputElement).value);
    const address = (document.getElementById('address') as HTMLInputElement).value;
    const isAdmin = (document.getElementById('isAdmin') as HTMLInputElement).checked;

    addUser(id, userName, age, address, isAdmin);

    renderUsers();
    addUserForm.classList.add('hidden');
    newUserForm.reset();
});

// A felhasználók hozzáadása
function addUser(id: string, userName: string, age: number, address: string, isAdmin: boolean): void {
    const newUser: User = { id, userName, age, address, isAdmin };
    users.push(newUser);
}

function renderUsers() {
    userTableBody.innerHTML = '';
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.userName}</td>
            <td>${user.age}</td>
            <td>${user.address}</td>
            <td>${user.isAdmin ? 'Yes' : 'No'}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
        `;
        userTableBody.appendChild(row);
    });

    // Törlés gombok
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (e: Event) => {
            const index = (e.target as HTMLButtonElement).getAttribute('data-index');
            if (index !== null) {
                removeUser(parseInt(index));
                renderUsers();
            }
        });
    });
}

// Felhasználó törlése index alapján
function removeUser(index: number): void {
    users.splice(index, 1);
}
