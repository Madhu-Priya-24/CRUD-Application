const API_URL = 'http://localhost:5000/items';

async function fetchItems() {
    const res = await fetch(API_URL);
    const items = await res.json();
    document.getElementById('items-list').innerHTML = items.map(item => 
        `<tr>
            <td><input type='text' id='edit-${item._id}' value='${item.name}' /></td>
            <td>
                <button class="action-btn" onclick="updateItem('${item._id}')">Update</button>
                <button class="action-btn" style="background-color: #dc3545" onclick="deleteItem('${item._id}')">Delete</button>
            </td>
        </tr>`
    ).join('');
}

async function createItem() {
    const name = document.getElementById('name').value;
    await fetch(API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name }) });
    fetchItems();
}

async function updateItem(id) {
    const updatedName = document.getElementById(`edit-${id}`).value;
    await fetch(`${API_URL}/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: updatedName }) });
    fetchItems();
}

async function deleteItem(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchItems();
}

document.addEventListener('DOMContentLoaded', fetchItems);