/* con este script elaboraremos una libreria, es importante qeu lo pongamos antes del final del head */
/* esta funcion se ejecutara por cada elemento que contenga el DATA ATRIBUTTE */

document.addEventListener("DOMContentLoaded", ()=>{
    const includeHTML = (el, url)=>{
        axios
        .get(url)
        .then(res=>{
            el.outerHTML=res.data;
        })
        .catch(err => {
            console.log(err.response);
            let message = err.response.statusText || "Ocurrió un error";
            el.outerHTML = `Error ${err.response.status}: ${message}`;
        })
    }

/* Con esto accedo a los elementos con el atributo data-include */
document
.querySelectorAll("[data-include]")
.forEach(el=>includeHTML(el, el.getAttribute("data-include")))
})
