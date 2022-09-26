

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
    
    json.forEach(element => {
        const list = document.querySelector('.list');
        const list_item = document.createElement('div');
    });
}

printList();