/*
Se debe de hacer referencia a los id's. No debemos utilizar palabras reservadas

*/

const btnAgregar = document.getElementById("btnAgregar");
//para el botón limpiar
const btnClear = document.getElementById("btnClear");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
//para agregar los datos a la tabla
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal"); //suma de la cantidad
const precioTotal = document.getElementById("precioTotal"); //multiplicación

let cont=0;
let costoTotal=0;
let totalEnProductos=0;

let datos = []; //new Array para declarar un arreglo. Declarar una variable global

function validarCantidad(){

    if(txtNumber.value.length<=0){
        return false;
    } //length<=0 (1)
    if(isNaN(txtNumber.value)){ //si el valor no es un número
        return false;
    } //isNaN (¿es un No a Número?) (2) Asegurar si es un número y si es número pasar a validar que sea mayor a cero >0

    if(Number(txtNumber.value)<=0){
        return false;
    }
    return true;
} 
   //1.Validar la longitud (length) >0
    //2.Validar el número
    //3.Validar que sea mayor a cero >0


//validar la cantidad

function getPrecio(){
    return Math.round(Math.random()*10000)/100; //redondea los números y regrese dos decimales
} //para obtener un precio 

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();
    let isValid = true; //se añade la bandera de si son correctos los datos agregados (al ser true permite agregar los datos a la tabla)
    //para eliminar el espacio 
    txtName.value = txtName.value.trim();
    txtNumber.value = txtNumber.value.trim();
     //para que limpie el cuadro cuando la validación sea correcta
    txtName.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

    //validar los campos de texto, el valor "value"
    if(txtName.value.length<3){
        //1.Mostrar la alerta con el error
        //2. Borde de color rojo
        txtName.style.border = "solid red medium"; //paso 2
        alertValidacionesTexto.innerHTML= "<strong>El nombre del producto no es correcto.</strong>"
        alertValidaciones.style.display="block";
        isValid = false;
    }//length<3

    //Validar los campos de cantidad, tres valores

    if(! validarCantidad()){ //si regresa false
        txtNumber.style.border="solid red medium";
        alertValidacionesTexto.innerHTML+="<br/><strong>La cantidad no es correcta.</strong>";
        alertValidaciones.style.display="block";
        isValid = false;
    }//!validar Cantidad

    if(isValid){
        cont++;
        let precio= getPrecio();
        let row=`<tr>
                    <td>${cont}</td> 
                    <td>${txtName.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;
        let elemento = {"cont": cont, 
                        "nombre": txtName.value,
                        "cantidad": txtNumber.value,
                        "precio": precio
                        };
        datos.push(elemento);
        
        localStorage.setItem("datos", JSON.stringify(datos)); //Strigify, toma el arreglo y lo convierte

        cuerpoTabla.insertAdjacentHTML("beforeend",row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$" + costoTotal.toFixed(2); //función to fixed, devuelve un número con los decimales designados. En este caso, to Fixed(2) solo son dos decimales
        contadorProductos.innerText= cont;
        totalEnProductos+= Number(txtNumber.value);
        productosTotal.innerText =totalEnProductos;

        localStorage.setItem("costoTotal", costoTotal);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("cont", cont);


        txtName.value="";
        txtNumber.value="";
        txtName.focus();

    }  //isValid, si es true se podrán agregar los datos a la tabla

    //el contador va ir contando las líneas que se van agregando

    /*La usabilidad:  */
    
}); //btn Agregar clic

btnClear.addEventListener("click", function(event){
    event.preventDefault();
    txtName.value = "";
    txtNumber.value = "";

    cont=0;
    costoTotal=0;
    totalEnProductos=0;
    precioTotal.innerText = "$" + costoTotal.toFixed(2); //función to fixed, devuelve un número con los decimales designados. En este caso, to Fixed(2) solo son dos decimales
    contadorProductos.innerTxt = cont;
    productosTotal.innerText = totalEnProductos;

    cuerpoTabla.innerHTML="";


    txtName.style.border="";
    txtNumber.style.border="";
    alertValidacionesTexto.innerHTML="";
    alertValidaciones.style.display="none";

}); //btnClear click

 window.addEventListener("load", function(event){
    if (this.localStorage.getItem("costoTotal")!=null){
    costoTotal = Number(this.localStorage.getItem("costoTotal"));
    };//null
    
    if(this.localStorage.getItem("totalEnProductos")!=null){
    totalEnProductos= Number(this.localStorage.getItem("totalEnProductos"));
    };
    
    if(this.localStorage.getItem("datos")!=null){
    datos = JSON.parse(this.localStorage.getItem("datos"));
    
    datos.forEach((r)=>{
        let row=`<tr>
                    <td>${r.cont}</td> 
                    <td>${r.nombre}</td>
                    <td>${r.cantidad}</td>
                    <td>${r.precio}</td>
                </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend",row);
    });

    precioTotal.innerText = "$" + costoTotal.toFixed(2); //función to fixed, devuelve un número con los decimales designados. En este caso, to Fixed(2) solo son dos decimales
    contadorProductos.innerTxt = cont;
    productosTotal.innerText = totalEnProductos;

}; //window load


});
