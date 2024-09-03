const btnAgregar = document.getElementById("btnAgregar");
const txtNombre =  document.getElementById("Name");
const txtNumber =  document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones")
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto")
const tablaListaCompras = document.getElementById("tablaListaCompras")
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0)
const contadorProductos =document.getElementById("contadorProductos")
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal")

//Declaramos una bandera, al ser true nos oermite ingresar datos a la tabla.
let isValid = true; 
//Declaramos un contador
let contador = 0;
let precio = 0;
let costoTotal = 0;
let TotalEnProductos = 0;

function validarCantidad(){
    //Validamos que el campo Cantidad tenga al menos un caracter
    if(txtNumber.value.length==0){
        return false;
    }
    // Validamos que la info registrada corresponda a un numero
    if(isNaN(txtNumber.value)){
        return false;
    }
    //Validamos que la cantidad sea mayor a 0
    if(Number(txtNumber.value)<=0){
        return false;
    }

    return true;
} //validarCantidad

//Creamos la funcion para generar el precio
function getPrecio(){
    return Math.round((Math.random()*10000))/100;
}; // GetPrecio


btnAgregar.addEventListener("click", function(event){
    //Este metodo lo añadimos para prevenir el funcionamiento del boton
    // que tiene por default
    event.preventDefault();
    //Aqui declaramos que el recuadro de alerta no se vea, sino que solo cuando tenga
    // menos de 3 caracteres
    txtNombre.style.border="";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";
    isValid = true;

    //Con este if validamos que el nombre del producto sea mayor a 3 letras
    if(txtNombre.value.length<3)
    {   // Ponemos un recuadro de alerta
        txtNombre.style.border="solid red medium";
        alertValidacionesTexto.innerHTML = "El <strong>Nombre</strong> no es correcto.</br>";
        alertValidaciones.style.display="block";
        isValid = false;
      }

    //Validamos la cantidad del producto
    if(! validarCantidad())
    {
        txtNumber.style.border="solid red medium";
        //Ponemos += para que se muestren los 2 mensajes en caso de ser necesario
        alertValidacionesTexto.innerHTML += "La <strong>Cantidad</strong> no es valida.</br>";
        alertValidaciones.style.display="block";
        isValid = false;
    }

    if(isValid)
    {
        contador ++;
        precio = getPrecio();
        //Insertamos el producto a la tabla de compras
        let row = `<tr> 
                    <td>${contador}</td>
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
        </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        //Una vez que garegamos el producto, limpiamos los campos de nombre y cantidad
        
        costoTotal += precio * Number(txtNumber.value);
        TotalEnProductos += Number(txtNumber.value);
        contadorProductos.innerText = contador;

        //Poner la info en total en productos y y total
        productosTotal.innerText=TotalEnProductos;
        precioTotal.innerText="$ "+costoTotal;

        //Agregamos el local Storage
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos", TotalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);

        txtNombre.value="";
        txtNumber.value="";
        txtNombre.focus();
    }
    
}); //btnAgregar.addEventListener

//Metodo para quitar los espacios
//Evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim();
}); // txtNombre.

window.addEventListener("load",function(){
    if(this.localStorage.getItem("contador") != null){
        contador = Number(this.localStorage.getItem("contador"))
    }

    if(this.localStorage.getItem("TotalEnProductos") != null){
        contador = Number(this.localStorage.getItem("TotalEnProductos"))
    } 
    
    if(this.localStorage.getItem("costoTotal") != null){
        contador = Number(this.localStorage.getItem("costoTotal"))
    } 

    contadorProductos.innerText = contador;
    productosTotal.innerText=TotalEnProductos;
    precioTotal.innerText="$ "+costoTotal;
})