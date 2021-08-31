/* con este script elaboraremos una libreria, es importante qeu lo pongamos antes del final del head */
/* esta funcion se ejecutara por cada elemento que contenga el DATA ATRIBUTTE */

document.addEventListener("DOMContentLoaded", ()=>{
    const includeHTML = (el, url)=>{
        const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange",()=>{
        if (xhr.readyState!==4)return;

        if (xhr.status>=200&&xhr.status<300) {
           el.outerHTML = xhr.responseText;
       } else {
           let msg = "Verifica que estes haciendo la peticion por http o https"
           el.outerHTML = `<div><p>Error ${xhr.status}: ${msg}</p></div>`
       } 
    });

    xhr.open("GET",url)
    xhr.setRequestHeader("Content-type","text/html; charset = utf-8")
    xhr.send()
    }

/* Con esto accedo a los elementos con el atributo data-include */
document
.querySelectorAll("[data-include]")
.forEach(el=>includeHTML(el, el.getAttribute("data-include")))
})
