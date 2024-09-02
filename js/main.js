const btnAgregar = document.getElementById("btnAgregar");
const txtNombre =  document.getElementById("Name");
const txtNumber =  document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones")
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto")

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

btnAgregar.addEventListener("click", function(event){
    //Este metodo lo añadimos para prevenir el funcionamiento del boton
    // que tiene por default
    event.preventDefault();
    //Aqui declaramos que el recuadro de alerta no se vea, sino que solo cuando tenga
    // menos de 3 caracteres
    txtNombre.style.border="";
    alertValidacionesTexto.innerHTML = "";
    alertValidaciones.style.display="none";

    //Con este if validamos que el nombre del producto sea mayor a 3 letras
    if(txtNombre.value.length<3)
    {   // Ponemos un recuadro de alerta
        txtNombre.style.border="solid red medium";
        alertValidacionesTexto.innerHTML = "El <strong>Nombre</strong> no es correcto.</br>";
        alertValidaciones.style.display="block";
      }

    //Validamos la cantidad del producto
    if(! validarCantidad())
    {
        txtNumber.style.border="solid red medium";
        //Ponemos += para que se muestren los 2 mensajes en caso de ser necesario
        alertValidacionesTexto.innerHTML += "La <strong>Cantidad</strong> no es valida.</br>";
        alertValidaciones.style.display="block";

    }
    
});

//Metodo para quitar los espacios
//Evento blur es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function(event){
    txtNombre.value = txtNombre.value.trim();
}); // txtNombre.addEventListener