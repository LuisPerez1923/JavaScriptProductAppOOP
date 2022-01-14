class Product {
    constructor(name, price, year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product){
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-3">
                <div class="card-body">
                    <strong>Producto</strong>: ${product.name}
                    <strong>Precio del producto</strong>: ${product.price}
                    <strong>Año del producto</strong>: ${product.year}
                    <a href="#" class="btn btn-danger" name="delete">Borrar</a>
                </div>
            </div>
        `;

        productList.appendChild(element);
        //this.resetForm(); //se utiliza this para que la clase pueda llamar a una funcion de la misma clase
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if (element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Producto eliminado satisfactoriamente', 'info')
        }
    }

    showMessage(message, cssClass){
        const div = document.createElement('div');

        div.className = `alert alert-${cssClass} mt-3`;
        div.appendChild(document.createTextNode(message));
        //mostrando en el DOM

        const container = document.querySelector('.container');
        const app = document.querySelector('#app');

        container.insertBefore(div, app);
        setTimeout(function () { 
            document.querySelector('.alert').remove();
         }, 3000);

    }
}

//Eventos del DOM
document.getElementById('product-form').addEventListener('submit', function (evento) { 
    evento.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const year = document.getElementById('year').value;

    const newProduct = new Product(name, price, year);
    const userInterface = new UI();

    if (name === '' || price === '' || year === '') {
        return userInterface.showMessage('Por favor complete los campos', 'danger')
    }

    userInterface.addProduct(newProduct)
    userInterface.resetForm();
    userInterface.showMessage('Producto agregado satisfactoriamente', 'success')

});

document.getElementById('product-list').addEventListener('click', function (evento) { 
    evento.preventDefault();

    const userInterface = new UI();
    userInterface.deleteProduct(evento.target);

 });
