const itemInput = document.getElementById('item-input');
const addItemButton = document.getElementById('add-item-button');
const shoppingList = document.getElementById('shopping-list');

// Data structures for storing list items
const listArr = [];
const normalizedSet = new Set();

/**
 * Normalize a string: trims whitespace and reduces multiple spaces.
 */
function normalizeString(str) {
    return str.trim().replace(/\s+/g, ' ');
}

/**
 * Check for duplicates and add a new item if it doesn't already exist.
 */
function checkDuplicate() {
    const rawItem = itemInput.value;
    const normalizedItem = normalizeString(rawItem);
    const normalizedLower = normalizedItem.toLowerCase();

    if (!normalizedItem) {
        alert("Item cannot be empty!");
        return;
    }

    if (normalizedSet.has(normalizedLower)) {
        const duplicateItem = listArr.find(item => normalizeString(item).toLowerCase() === normalizedLower);
        alert(`Duplicate detected: "${duplicateItem}" is already in the list.`);
    } else {
        listArr.push(rawItem);
        normalizedSet.add(normalizedLower);
        renderList();
    }
}

/**
 * Render the shopping list with delete and edit buttons.
 */
function renderList() {
    shoppingList.innerHTML = ''; // Clear the current list

    listArr.forEach((item, index) => {
        const listItem = document.createElement('li');

        // Item text
        const textNode = document.createElement('span');
        textNode.textContent = item;
        textNode.classList.add('item-text');

        // Edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.onclick = () => editItem(index);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = () => deleteItem(index);

        // Append buttons and text to the list item
        listItem.appendChild(textNode);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        shoppingList.appendChild(listItem);
    });

    itemInput.value = ''; // Clear the input field
}

/**
 * Edit an item in the list.
 */
function editItem(index) {
    const newItem = prompt("Edit item:", listArr[index]);
    if (newItem === null) return; // If the user cancels editing

    const normalizedNewItem = normalizeString(newItem);
    const normalizedLower = normalizedNewItem.toLowerCase();

    if (!normalizedNewItem) {
        alert("Item cannot be empty!");
        return;
    }

    if (normalizedSet.has(normalizedLower) && normalizedLower !== normalizeString(listArr[index]).toLowerCase()) {
        alert(`Duplicate detected: "${normalizedNewItem}" is already in the list.`);
    } else {
        // Update the normalized set
        normalizedSet.delete(normalizeString(listArr[index]).toLowerCase());
        normalizedSet.add(normalizedLower);

        // Update the list array
        listArr[index] = newItem;
        renderList();
    }
}

/**
 * Delete an item from the list.
 */
function deleteItem(index) {
    const item = listArr[index];

    // Remove from list array and normalized set
    listArr.splice(index, 1);
    normalizedSet.delete(normalizeString(item).toLowerCase());

    renderList();
}

// Event listeners for adding items
addItemButton.addEventListener('click', checkDuplicate);
itemInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkDuplicate();
    }
});
