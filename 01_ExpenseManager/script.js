
getStoragValue = () => {
    let transactionTable = document.getElementById("transactionTable");
    let budgetStatus = document.getElementById("budgetStatus");
    let expenseStatus = document.getElementById("expenseStatus");
    let budgetLeft = document.getElementById("budgetLeft");
    budgetStatus.innerText = 0;
    let totalBudget = 0;
    let totalExpense = 0;
    let totalLeft = 0;
    expenseStatus.innerText = 0;
    budgetLeft.innerText = 0;
    let storageValue = Object.keys(localStorage).map(key => {
        let item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        }


    }
    ).filter(item => item !== undefined);
    console.log(storageValue);
    transactionTable.innerHTML = "";
    storageValue.forEach(item => {
        if (item.type === "budget") {
            totalBudget += parseFloat(item.amount);
            budgetStatus.innerText = totalBudget;
        }
        if (item.type === "expense") {
            totalExpense += parseFloat(item.amount);
            expenseStatus.innerText = totalExpense;
        }
        totalLeft = totalBudget - totalExpense;
        budgetLeft.innerText = totalLeft;
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.type}</td>
            <td>${item.amount}</td>
            <td>${item.date}</td>
            <td>
            <button class="btn btn-danger" onclick="deleteTransaction(${item.id})">Delete</button>
            <button class="btn btn-primary" onclick="editTransaction(${item.id})">Edit</button>
            </td>
        `;
        transactionTable.appendChild(row);
    });

}

function addTransaction(type) {
    if (type == "budget") {
        let budgetTilte = document.getElementById("budgetTitle").value;
        let budgetAmount = document.getElementById("budgetAmount").value;
        saveInStorage("budget", budgetTilte, budgetAmount);

    } else if (type == "expense") {
        let expenseTilte = document.getElementById("expenseTitle").value;
        let expenseAmount = document.getElementById("expenseAmount").value
        saveInStorage("expense", expenseTilte, expenseAmount);
    }
    document.getElementById("budgetTitle").value = "";
    document.getElementById("budgetAmount").value = "";
    document.getElementById("expenseTitle").value = "";
    document.getElementById("expenseAmount").value = "";
}

saveInStorage = (type, title, amount) => {
    let data = {
        id: new Date().getTime(),
        type: type,
        title: title,
        amount: amount,
        date: new Date().toLocaleDateString()
    };
    localStorage.setItem(data.id, JSON.stringify(data));
    getStoragValue();
}
function deleteTransaction() {
    let id = event.target.parentElement.parentElement.firstElementChild.innerText;
    localStorage.removeItem(id);
    getStoragValue();

}

function editTransaction() {
    let id = event.target.parentElement.parentElement.firstElementChild.innerText;
    let item = JSON.parse(localStorage.getItem(id));
    if (item.type === "budget") {
        document.getElementById("budgetTitle").value = item.title;
        document.getElementById("budgetAmount").value = item.amount;
    } else if (item.type === "expense") {
        document.getElementById("expenseTitle").value = item.title;
        document.getElementById("expenseAmount").value = item.amount;
    }
    deleteTransaction();
    getStoragValue();
}

getStoragValue()