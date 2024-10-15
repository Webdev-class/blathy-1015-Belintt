
const addUserBtn = document.getElementById('addUserBtn');
const userFormOverlay = document.getElementById('userFormOverlay');
const cancelUserBtn = document.getElementById('cancelUserBtn');
const submitUserBtn = document.getElementById('submitUserBtn');
const formTitle = document.getElementById('formTitle');

let isEditMode = false;
let editUserId = null;


let users = [
    { id: '1', userName: 'JohnDoe', age: 28, address: '123 Elm St', isAdmin: false },
    { id: '2', userName: 'JaneDoe', age: 34, address: '456 Oak St', isAdmin: true }
];


function renderTable() {
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.userName}</td>
            <td>${user.age}</td>
            <td>${user.address}</td>
            <td>${user.isAdmin ? 'Yes' : 'No'}</td>
            <td>
                <button class="edit-btn" onclick="editUser(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteUser(${index})">Delete</button>
            </td>
        `;
        userTable.appendChild(row);
    });
}


submitUserBtn.addEventListener('click', () => {
    const userName = document.getElementById('userName').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const isAdmin = document.getElementById('isAdmin').checked;

    if (isEditMode) {
        users[editUserId].userName = userName;
        users[editUserId].age = age;
        users[editUserId].address = address;
        users[editUserId].isAdmin = isAdmin;

        isEditMode = false;
        editUserId = null;
        formTitle.textContent = 'Add New User';
        submitUserBtn.textContent = 'Add User';
    } else {
        
        const newUser = {
            id: (users.length + 1).toString(),
            userName,
            age,
            address,
            isAdmin
        };

        users.push(newUser);
    }

    renderTable();
    userFormOverlay.classList.remove('active');
});


function editUser(index) {
    isEditMode = true;
    editUserId = index;

    const user = users[index];

    document.getElementById('userName').value = user.userName;
    document.getElementById('age').value = user.age;
    document.getElementById('address').value = user.address;
    document.getElementById('isAdmin').checked = user.isAdmin;

    formTitle.textContent = 'Edit User';
    submitUserBtn.textContent = 'Save Changes';
    userFormOverlay.classList.add('active');
}

function deleteUser(index) {
    users.splice(index, 1);
    renderTable();
}

addUserBtn.addEventListener('click', () => {
    isEditMode = false;
    editUserId = null;

    document.getElementById('userName').value = '';
    document.getElementById('age').value = '';
    document.getElementById('address').value = '';
    document.getElementById('isAdmin').checked = false;

    formTitle.textContent = 'Add New User';
    submitUserBtn.textContent = 'Add User';
    userFormOverlay.classList.add('active');
});

cancelUserBtn.addEventListener('click', () => {
    userFormOverlay.classList.remove('active');
});

renderTable();





let customers = [
    { id: '1', userName: 'JohnDoe', age: 28, address: '123 Elm St', isAdmin: false },
    { id: '2', userName: 'JaneDoe', age: 34, address: '456 Oak St', isAdmin: true }
];

function addCustomer() {
    const userName = document.getElementById('userName').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const isAdmin = document.getElementById('isAdmin').checked;

    const newCustomer = {
        userName,
        age,
        address,
        isAdmin
    };

    customers = addCustomer(customers, newCustomer);
    renderTable();
}

function editCustomer(index) {
    const customer = customers[index];
    document.getElementById('userName').value = customer.userName;
    document.getElementById('age').value = customer.age;
    document.getElementById('address').value = customer.address;
    document.getElementById('isAdmin').checked = customer.isAdmin;

    
    document.getElementById('submitUserBtn').onclick = function () {
        customer.userName = document.getElementById('userName').value;
        customer.age = document.getElementById('age').value;
        customer.address = document.getElementById('address').value;
        customer.isAdmin = document.getElementById('isAdmin').checked;

        customers = modifyCustomer(customers, customer);
        renderTable();
    };
}

function removeCustomer(customerId) {
    customers = removeCustomer(customers, customerId);
    renderTable();
}

renderTable();

