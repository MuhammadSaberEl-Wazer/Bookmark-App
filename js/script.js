var websiteList = [];

var name1 = document.getElementById("websiteName");
var url1 = document.getElementById("websiteURL");
var urlInvalido = document.getElementById("urlInvalid");
var button = document.getElementById("main-btn");


if (localStorage.getItem("allproducts") != null) {
    websiteList = JSON.parse(localStorage.getItem("allproducts"));
    dispalyProducts();
}


function ValidateURL(input2) {

    var validRegex = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,7}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;

    if (url1.value.match(validRegex)) {

        urlInvalido.innerHTML = "";
        button.removeAttribute("disabled");
        return true;

    } else {

        if (url1.value != "") {
            urlInvalido.innerHTML = "Invalid URL website, Please try again!";


        } else if (url1.value == "") {
            urlInvalido.innerHTML = "Empty URL!";

        };
        return false;
    }
}

url1.addEventListener('blur', (e) => {
    ValidateURL(url1);
})

button.addEventListener('click', (e) => {
    button.setAttribute('disabled', '');
})

function add() {

    var productobj1 = {

        name: name1.value,
        url: url1.value,

    }

    websiteList.push(productobj1);
    localStorage.setItem('allproducts', JSON.stringify(websiteList));

    dispalyProducts();


    document.getElementById("websiteName").value = '';
    document.getElementById("websiteURL").value = '';


}



function dispalyProducts() {
    var container1 = ``;

    if (websiteList.length < 1) {
        container1 += `
    <tr>
      
   </tr> 
    `;
        document.getElementById('myTableo').innerHTML = container1;
    } else {

        for (i = 0; i < websiteList.length; i++) {
            container1 += `
      <tr>
        
        
        <td><p>${i+1}- ${websiteList[i].name} <p></td>
        <td>  <a href="https://${websiteList[i].url}" target="_blank">Visit</a> </td>   

        
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
        
     </tr> 
      `;
            document.getElementById('myTableo').innerHTML = container1;

        }
    }

}




function deleteProduct(indexdelete) {
    if (websiteList.length > 1) {
        websiteList.splice(indexdelete, 1);
        localStorage.setItem('allproducts', JSON.stringify(websiteList));
        dispalyProducts();

    } else {
        websiteList.length = 0;

        localStorage.setItem('allproducts', JSON.stringify(websiteList));
        dispalyProducts();

    }
}
