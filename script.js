const d = document,
$main = d.getElementById("axios")

const getHTML = (options)=>{
    let{url,success,error}=options;//destructuracion
    
    axios
    .get(url)
    .then(res=>{
        let html=res.data
        success(html);
    })
    .catch((err) => {
        console.log(err.response);
        let message = err.response.statusText || "Ocurrió un error";
        $main.innerHTML = `Error ${err.response.status}: ${message}`;
    })
}
d.addEventListener("DOMContentLoaded",()=>{
    getHTML({
        url:"assets/home.html",
        success:(html)=>$main.innerHTML =html,
        error:(err)=>$main.innerHTML = `<h1>${err}</h1>`
    })

 

})
d.addEventListener("click",e=>{
   if(e.target.matches(".menu__link")||e.target.matches(".blog-item")){
    e.preventDefault()
  
    getHTML({
        url:e.target.href,
        success:(html)=>$main.innerHTML =html,
        error:(err)=>$main.innerHTML = `<h1>${err}</h1>`
    })
   }
    
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