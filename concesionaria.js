const autos=require('./autos'); //requerimiento del módulo con la base de datos de autos

const clientes=require('./clientes'); //requerimiento del módulo con la base de datos de clientes

//////////CLIENTES POR CÓGIDO PARA SECCIÓN DE AGREGANDO FUNCIONALIDADES - NO FUNCIONA PLAYGROUND (03/09/2022)
// const cliente1={
//     nombre: 'Juan',
//     capacidadDePagoEnCuotas: 20000,
//     capacidadDePagoTotal: 100000
// };

// const cliente2={
//     nombre: 'Pablo',
//     capacidadDePagoEnCuotas: 30000,
//     capacidadDePagoTotal: 100000000
// };

// const cliente3={
//     nombre: 'Mateo',
//     capacidadDePagoEnCuotas: 100,
//     capacidadDePagoTotal: 100000000
// };

//////////////////////////////////////////////////////////////////////////////////

let concesionaria={
    autos: autos,

    clientes: clientes,

    //FUNCIÓN QUE BUSCA UN AUTO EN LA LISTA BASADO EN LA PATENTE DEL MISMO
    buscarAuto: function(patente){ //función que filtra el array autos por la patente del auto
        autoFiltradoPatente=this.autos.filter(element=>element.patente==patente);
        return autoFiltradoPatente.length==0 ? null : autoFiltradoPatente[0];
    },

    //--------------------------------------------------//

    // buscarAuto: function(patente){  //función que da el mismo resultado que la de arriba pero está hecha con el método .find
    //     autoPorPatente=this.autos.find(element=>element.patente==patente);
    //     return autoPorPatente==undefined ? null : autoPorPatente;

    // },

    //--------------------------------------------------//

    //FUNCIÓN QUE BUSCA UN AUTO EN LA LISTA BASADO EN LA PATENTE DEL MISMO Y LE ASIGNA EL ESTADO DE VENDIDO
    venderAuto: function(patente){
        autoBuscar=this.buscarAuto(patente);
        if(autoBuscar!=undefined){
            autoBuscar.vendido=true;
            return autoBuscar;
        }else{
            return null;
        }
    },

    //FUNCIÓN QUE LISTA LOS AUTOS PARA VENDER
    autosParaLaVenta: function(){
        autosParaVender=this.autos.filter(element=>element.vendido==false);
        return autosParaVender;

    },

    //FUNCIÓN QUE LISTA LOS AUTOS PARA VENDER CON MENOS DE 100 KM 
    autosNuevos: function(){
        autosDeVenta=this.autosParaLaVenta();
        autosDeVentaNuevos=autosDeVenta.filter(element=>(element.km>=0)&&(element.km<100))
        return autosDeVentaNuevos;
    },

    //FUNCIÓN QUE LISTA EN UN ARRAY LOS PRECIOS DE LOS AUTOS VENDIDOS
    listaDeVentas: function(){
        autosVendidos=this.autos.filter(element=>element.vendido==true);
        precioAutosVendidos=autosVendidos.map(element=>element.precio); //esta línea de código recorre el array de la línea anterior (con un .map()) buscando el atributo precio, generando un array nuevo con dichos precios
        return precioAutosVendidos;

    },

    //FUNCIÓN QUE RETORNA EL TOTAL DE VENTAS USANDO .reduce()
    totalDeVentas: function(){
        arrayPreciosVendidos=this.listaDeVentas(); // acá está el array con la lista de los autos ya vendidos
        totalVentas=arrayPreciosVendidos.reduce((valorAnterior,valorActual)=>valorAnterior+valorActual , 0);
        return totalVentas;
    },

    // FUNCIÓN PARA SABER SI EL CLIENTE PUEDE COMPRAR EL AUTO BASADO EN SU PERCEPCIÓN DEL PRECIO DEL AUTO Y CAPACIDAD DE PAGO DE LAS CUOTAS DEL AUTO
    // FUNCIÓN PUEDE COMPRAR SIRVE CON LA BASE DE DATOS GENERADA CON LAS PROPIEDADES DE LA MARCA DEL AUTO (STRING) Y EL NOMBRE DE LA PERSONA (STRING)
    puedeComprar: function(autoMarca , persona){
        autoFiltradoMarca=this.autos.filter(element=>element.marca==autoMarca);  //array con los datos de los carros filtrados por la marca del carro
        personaFiltro=this.clientes.filter(element=>element.nombre==persona); //array con los datos del cliente filtrado por el nombre de la persona
        costoAutoCuotas=autoFiltradoMarca[0].precio/autoFiltradoMarca[0].cuotas; //RECORDAR QUE EL MÉTODO .filter DEVUELVE UN ARRAY, POR LO QUE ES IMPORTANTE ACCEDER A SU INDICE [0]

        if((autoFiltradoMarca[0].precio<=personaFiltro[0].capacidadDePagoTotal) && (costoAutoCuotas<=personaFiltro[0].capacidadDePagoEnCuotas)){
            return true;
        }else{
            return false;
        }
        
        //MICROOPTIMIZACIÓN PARA DISMINUIR LAS LÍNEAS DE CÓDIGO, SOLO USA EL RETURN PARA DEVOLVER EL VALOR BOOLEANO DE LA OPERACIÓN
        //return (autoFiltradoMarca[0].precio<=personaFiltro[0].capacidadDePagoTotal) && (costoAutoCuotas<=personaFiltro[0].capacidadDePagoEnCuotas); 
    },

    ////////////-------------------------------///////////////////////////////////////////
    // puedeComprar: function(auto , persona){
    //     autoFiltradoMarca=this.autos.filter(element=>element.marca==auto);
    //     costoCuotasAuto=autoFiltradoMarca[0].precio/autoFiltradoMarca[0].cuotas;
    //     if((autoFiltradoMarca[0].precio<=persona.capacidadDePagoTotal) && (costoCuotasAuto<=persona.capacidadDePagoEnCuotas)){
    //         return true;
    //     } else{
    //         return false;
    //     }

    // }

    //FUNCIÓN QUE DEVUELVE, DE ACUERDO A UNA PERSONA, UNA LISTA DE AUTOS QUE PUEDE COMPRAR
    autosQuePuedeComprar: function(persona){
        autosParaVender=this.autosParaLaVenta();
        autosCompraViable=autosParaVender.filter(element=>this.puedeComprar(element.marca , persona)) //esto se puede ya que la función puedeComprar retorna un valor booleano, y .filter() evalúa una condición booleana
        if(autosCompraViable.length!=0){
            return autosCompraViable.map(element=>element.marca); //el map está solo para devolver algún atributo del objeto literal 
        }else{
            return 'No puede comprar ningún auto por pobre'
        }
        

    }

};


// console.log('-------------------------------------------');

// console.log(concesionaria.buscarAuto('JJK116'));

// console.log('-------------------------------------------');

// console.log(concesionaria.venderAuto('JJK116'));

// console.log('-------------------------------------------');

// console.log(concesionaria.autosParaLaVenta());

// console.log('-------------------------------------------');

// console.log(concesionaria.autosNuevos());

// console.log('-------------------------------------------');

// console.log(concesionaria.listaDeVentas());

// console.log('-------------------------------------------');

// console.log(concesionaria.totalDeVentas());

console.log('------------------Ford----------------------');

console.log(concesionaria.puedeComprar('Ford','Juan'));

console.log('------------------Toyota----------------------');

console.log(concesionaria.puedeComprar('Toyota','Juan'));

console.log('------------------Wolkswagen----------------------');

console.log(concesionaria.puedeComprar('Wolkswagen','Juan'));

console.log('-------------------------------------------');

console.log(concesionaria.autosQuePuedeComprar('Juan'));

////////////////////////////////////////////////////////////

// console.log('------------------CLIENTE 1-------------------');

// console.log(concesionaria.puedeComprar('Ford',cliente1));

// console.log('------------------CLIENTE 2-------------------');

// console.log(concesionaria.puedeComprar('Ford',cliente2));

// console.log('------------------CLIENTE 3-------------------');

// console.log(concesionaria.puedeComprar('Ford',cliente3));

////////////////////////////////////////////////////////////
    