var i,acc=document.getElementsByClassName("accordion");for(i=0;i<acc.length;i++)acc[i].addEventListener("click",function(){this.classList.toggle("active");var e=this.nextElementSibling;e.style.maxHeight?e.style.maxHeight=null:e.style.maxHeight=e.scrollHeight+"px"});