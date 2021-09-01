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
            console.log(html);
            success(html);
        }else{
            let msg =  `Ocurrio un Error`;
            error(`Error ${xhr.status}: ${msg}`)

        }
    })
    xhr.open("GET",url);

    xhr.setRequestHeader("Content-type", "text/html; charset=utf-8")

    xhr.send()

}
d.addEventListener("DOMContentLoaded",()=>{
    getHTML({
        url:"assets/blog.html",
        success:(html)=>$main.innerHTML =html,
        error:(err)=>$main.innerHTML = `<h1>${err}</h1>`
    })
    console.log(html);
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


const ls= localStorage;


const darkTheme = (darkBtn)=>{
    const themeBtn = d.querySelector(darkBtn),
        selectors = d.querySelectorAll("[data-dark]")
       
    let sun ="☀️", moon="🌙" ;

    const lightMode = ()=>{
        selectors.forEach(el=>el.classList.remove("dark-mode"))   
      
        themeBtn.textContent=moon;
        ls.setItem("theme","light")
    }
    const darkMode = ()=>{
        selectors.forEach(el=>el.classList.add("dark-mode"))
      
        themeBtn.textContent=sun;
        ls.setItem("theme","dark")
    }
    d.addEventListener("click",e=>{
        if(e.target.matches(darkBtn)){
            if(themeBtn.textContent===moon){
                darkMode()
             }else {
                lightMode()
            }
        }
     })

    d.addEventListener("DOMContentLoaded",()=>{ 
        if (ls.getItem("theme")==null)ls.setItem("theme","light")
        if(ls.getItem("theme")=="light")lightMode()
        if(ls.getItem("theme")=="dark")darkMode()

    })
    
}

 darkTheme(".dark-theme-btn")