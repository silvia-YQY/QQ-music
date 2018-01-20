var pageWidth = window.innerWidth
document.write(`<style>html{font-size:${pageWidth/10}px}</style>`)
window.addEventListener("resize", function () {  
    var pageWidth = window.innerWidth
    document.getElementsByTagName("html")[0].style[ "font-size" ]  = pageWidth/10 + 'px'
    
   //console.log(document.getElementsByTagName("html")[0].style[ "font-size" ])
    
});  