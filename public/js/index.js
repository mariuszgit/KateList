

const add_btn = document.querySelector('#add-btn');
const add_order = document.querySelector('.add-order');

add_btn.addEventListener('click', ()=> {
    showAddOrder()
})

function showAddOrder() {
    back_btn = document.querySelector('#back_btn');
    submit_btn = document.querySelector('#submit_add_btn');
    form_title = document.querySelector('#form_title');
    form_description = document.querySelector('#form_description');
    add_order.style.display = 'block'

    back_btn.addEventListener('click', (e) => {
        e.preventDefault();
        add_order.style.display = 'none'
    });
    
    submit_btn.addEventListener('click', () => {
        const data = {
            action: 'add',
            title: form_title.value,
            description: form_description.value,
            status: 'active',
            category: 'personal'
        }
        sendData(data);
    })
}

async function sendData(data) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
    }
    const response = await fetch('/api', options);
    const json = await response.json();
    console.log(json);
}

async function printList() {
    const response = await fetch('/api');
    const json = await response.json();
    console.log(json);
    json.forEach(element => {
        createListItem(element)
    });
}

printList();

function createListItem(element) {
    const list = document.querySelector('.list');
    const list_item = document.createElement('div');
        list_item.classList.add('list-item');
        list_item.setAttribute('data-id', element._id);
    const list_content = document.createElement('div');
        list_content.classList.add('list-item__content');
    const list_category = document.createElement('div');
        list_category.classList.add('list-item__category');
        list_category.innerHTML = '<img src="img/personal.svg" alt="">';
    const list_description = document.createElement('div');
        list_description.classList.add('list-item__description');
    const list_title = document.createElement('div');
        list_title.classList.add('list-item__title');
        list_title.textContent = element.title;
    const list_details = document.createElement('div');
        list_details.classList.add('list-item__details');
        list_details.textContent = element.description;
    const list_check = document.createElement('div');
        list_check.classList.add('list-item__check');

    
    
    list_description.append(list_title, list_details);
    list_content.append(list_category, list_description);
    list_item.append(list_content, list_check);
    list.appendChild(list_item);

}