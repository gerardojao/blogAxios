const d = document,
$main = d.querySelector("main");

const getHTML = (options)=>{
    let{url,success,error}=options;//destructuracion
    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange",()=>{
        if(xhr.readyState!==4)return;

        if(xhr.status>=200 && xhr.status<300){
            //responseText nos devuelve el contenido
            let html = xhr.responseText;
          
            success(html);
        }else{
            let msg =  `Ocurrio un Error`;
            error(`Error ${xhr.status}: ${msg}`)

        }
    })
    xhr.open("GET",url);

    //establecemos una cabecera por este metodo:
    xhr.setRequestHeader("Content-type", "text/html; charset=utf-8")

    xhr.send()

}
d.addEventListener("DOMContentLoaded",()=>{
    getHTML({
        url:"assets/home.html",
        success:(html)=>$main.innerHTML =html,
        error:(err)=>$main.innerHTML = `<h1>${err}</h1>`
    })

 

})
d.addEventListener("click",e=>{
   if(e.target.matches(".menu__link")){
    getHTML({
        url:e.target.href,
        success:(html)=>$main.innerHTML =html,
        error:(err)=>$main.innerHTML = `<h1>${err}</h1>`
    })
   }
    e.preventDefault()
})