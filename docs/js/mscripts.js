/*!
* Start Bootstrap - Simple Sidebar v6.0.3 (https://startbootstrap.com/template/simple-sidebar)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-simple-sidebar/blob/master/LICENSE)
*/


// Scripts ( Menu Side Bar )


        var menu_btn = document.querySelector("#menu-btn")
        var sidebar = document.querySelector("#sidebar")
        var container = document.querySelector(".my-container")
        menu_btn.addEventListener("click", () => {
            sidebar.classList.toggle("active-nav")
            container.classList.toggle("active-cont")
        })



// Variables globales


const formularioUI = document.querySelector('#formulario');
const listaVentasUI = document.getElementById('listaVentas');

let arrayVentas = [];

    let cod = document.getElementById("cod");    
    let desc = document.getElementById("desc");
    let fml = document.getElementById("fml");
    let trans = document.getElementById("trans");
    let ftr = document.getElementById("ftr");    


let item = {

    cod:'',    
    desc:'',     
    fml:'',
    trans:'',
    ftr:'',    
    estado: false
}

// Funciones

const CrearItem = ( codUI, descUI, fmlUI, transUI, ftrUI ) => {

    item = {

        codUI: codUI,
        descUI: descUI,
        fmlUI: fmlUI,
        transUI: transUI,
        ftrUI: ftrUI,

        estado: false
    }

    arrayVentas.push(item);

    return item;
}

const SaveDB = () => {

    localStorage.setItem('ocompras', JSON.stringify(arrayVentas));

    PintarDB();

}

const PintarDB = () => {

    listaVentasUI.innerHTML = '';

    arrayVentas = JSON.parse(localStorage.getItem('ocompras'));



    if(arrayVentas === null){
        arrayVentas = [];
    }else{

    for(var i=0;i<arrayVentas.length;i++){

        var codUI = arrayVentas[i].codUI;
        var descUI = arrayVentas[i].descUI;
        var fmlUI = arrayVentas[i].fmlUI;
        var transUI = arrayVentas[i].transUI;        
        var ftrUI = arrayVentas[i].ftrUI;   

        if(arrayVentas[i].estado){

            listaVentasUI.innerHTML +=         
            '<table id="listaVentas" class="table">'+
              '<tbody id="tableBody">'+
                '<tr class="success">'+
                  '<td class="t-short-fact">'+codUI+'</th>'+
                  '<td class="t-long-t">'+descUI+'</td>'+
                  '<td class="t-short-mt">'+fmlUI+'</td>'+
                  '<td class="t-short-mt">'+transUI+'</td>'+
                  '<th class="t-short-mt">'+ftrUI+'</td>'+
                  '<td class="t-short-mt"><i class="material-icons md-36 d">done</i> <i id="sdelete" class="material-icons text-danger md-36">delete</i></td>'+
                '</tr>'+                
              '</tbody>'+
            '</table>';            

        }else{

            listaVentasUI.innerHTML +=         
            '<table id="listaVentas" class="table">'+
              '<tbody id="tableBody">'+
                '<tr class="warning">'+
                  '<td class="t-short-fact">'+codUI+'</td>'+
                  '<td class="t-long-t">'+descUI+'</td>'+
                  '<td class="t-short-mt">'+fmlUI+'</td>'+
                  '<td class="t-short-mt">'+transUI+'</td>'+ 
                  '<th class="t-short-mt">'+ftrUI+'</th>'+
                  '<td class="t-short-mt"><i id="succ"class="material-icons md-36 d">done</i> <i id="sdelete" class="material-icons text-danger md-36">delete</i></td>'+

                '</tr>'+                
              '</tbody>'+
            '</table>';            

        }     

        }
    }

}    

const DeleteDB = (codUI) => {
    let indexArray;


    arrayVentas.forEach((elemento, index) => {
        //console.log(index);

        if(elemento.codUI === codUI){
            indexArray = index;
        }

    });

    arrayVentas.splice(indexArray,1);
    SaveDB();

}

const EditDB = (codUI) => {

    let indexArray = arrayVentas.findIndex((elemento)=>elemento.codUI === codUI)

    //console.log(arrayVentas[indexArray])

    arrayVentas[indexArray].estado = true;

    SaveDB();
}


//console.log(codUI);
//console.log(arrayVentas);


// EventListener

formularioUI.addEventListener('submit', (e) => {
    e.preventDefault();

    let codUI = document.querySelector('#cod').value;
    let descUI = document.querySelector('#desc').value;
    let fmlUI = document.querySelector('#fml').value;
    let transUI = document.querySelector('#trans').value;    
    let ftrUI = document.querySelector('#ftr').value;    


    CrearItem(codUI,descUI,fmlUI,transUI,ftrUI);
    SaveDB();

    //console.log(codUI,descUI,ctdadUI,provUI);

    formularioUI.reset();    
      
});

document.addEventListener('DOMContentLoaded', PintarDB);




listaVentasUI.addEventListener('click', (e) =>  {

    e.preventDefault();

    //console.log(e);


    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete') {
        let texto = (e.path[2].childNodes[0].innerHTML);

        if(e.target.innerHTML === 'delete'){

            //Acción de eliminar

            DeleteDB(texto);

            //console.log(e.path[2].childNodes[0].innerHTML);
        }
        if(e.target.innerHTML === 'done'){

            //Acción de editar

            EditDB(texto);

            //console.log(e.path[2].childNodes[0].innerHTML);
        }

    }


});


