const addBtn = document.querySelector('#addBtn');
const sku = document.querySelector('#sku');

addBtn.addEventListener('click', () => {
    console.log("Inicia")
    let url = '/add'
    let formData =  new FormData();
    formData.append('id', sku);
    console.log(formData);
    
    fetch(url, {
        method: 'POST',
        body: formData
    }).then(response => response.json);
})