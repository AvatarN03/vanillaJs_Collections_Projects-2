  const balance = document.getElementById("balance");
        const moneyPlus = document.getElementById("money-plus");
        const moneyMinus = document.getElementById("money-minus");
        const list = document.getElementById("list");
        const form = document.getElementById("form");
        const text = document.getElementById("text");
        const amount = document.getElementById("amount");
        const category = document.getElementById("category");
        const totalTransactions = document.getElementById("total-transactions");
        const avgTransaction = document.getElementById("avg-transaction");
        const filterButtons = document.querySelectorAll(".filter-btn");
        const clearAllBtn = document.getElementById("clear-all");

        let currentFilter = "all";

        const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));
        let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

        function addTransaction(e) {
            e.preventDefault();

            if (text.value.trim() === "" || amount.value.trim() === "" || category.value === "") {
                alert("Please fill in all fields");
                return;
            }

            const transaction = {
                id: Date.now(),
                text: text.value,
                amount: +amount.value,
                category: category.value,
                date: new Date().toLocaleDateString()
            };

            transactions.push(transaction);
            updateLocalStorage();
            init();

            text.value = "";
            amount.value = "";
            category.value = "";
        }

        function addTransactionDOM(transaction) {
            const sign = transaction.amount < 0 ? "-" : "+";
            const item = document.createElement("li");
            item.classList.add(transaction.amount < 0 ? "minus" : "plus");
            
            const categoryEmoji = getCategoryEmoji(transaction.category);
            
            item.innerHTML = `
                <span class="transaction-text">${categoryEmoji} ${transaction.text}</span>
                <span class="transaction-amount ${transaction.amount < 0 ? 'minus' : 'plus'}">
                    ${sign}$${Math.abs(transaction.amount).toFixed(2)}
                </span>
                <button class="delete-btn" onclick="removeTransaction(${transaction.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            `;

            list.appendChild(item);
        }

        function getCategoryEmoji(category) {
            const emojis = {
                salary: "💼",
                freelance: "💻",
                investment: "📈",
                food: "🍔",
                transport: "🚗",
                entertainment: "🎮",
                shopping: "🛍️",
                bills: "📄",
                other: "📌"
            };
            return emojis[category] || "📌";
        }

        function updateValues() {
            const amounts = transactions.map(transaction => transaction.amount);
            const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
            const income = amounts
                .filter(item => item > 0)
                .reduce((acc, item) => acc + item, 0)
                .toFixed(2);
            const expense = (amounts
                .filter(item => item < 0)
                .reduce((acc, item) => acc + item, 0) * -1)
                .toFixed(2);

            balance.textContent = `$${total}`;
            moneyPlus.textContent = `$${income}`;
            moneyMinus.textContent = `$${expense}`;
            totalTransactions.textContent = transactions.length;
            
            const avg = transactions.length > 0 
                ? (amounts.reduce((acc, item) => acc + Math.abs(item), 0) / transactions.length).toFixed(2)
                : "0.00";
            avgTransaction.textContent = `$${avg}`;
        }

        function updateLocalStorage() {
            localStorage.setItem("transactions", JSON.stringify(transactions));
        }

        function removeTransaction(id) {
            transactions = transactions.filter(transaction => transaction.id !== id);
            updateLocalStorage();
            init();
        }

        function filterTransactions(filter) {
            currentFilter = filter;
            init();
        }

        function init() {
            list.innerHTML = "";
            
            let filteredTransactions = transactions;
            if (currentFilter === "income") {
                filteredTransactions = transactions.filter(t => t.amount > 0);
            } else if (currentFilter === "expense") {
                filteredTransactions = transactions.filter(t => t.amount < 0);
            }

            if (filteredTransactions.length === 0) {
                list.innerHTML = `
                    <div class="empty-state">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p>No transactions yet. Add your first transaction!</p>
                    </div>
                `;
            } else {
                filteredTransactions.forEach(addTransactionDOM);
            }
            
            updateValues();
        }

        // Event Listeners
        form.addEventListener("submit", addTransaction);

        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                filterTransactions(btn.dataset.filter);
            });
        });

        clearAllBtn.addEventListener("click", () => {
            if (confirm("Are you sure you want to clear all transactions?")) {
                transactions = [];
                updateLocalStorage();
                init();
            }
        });

        init();