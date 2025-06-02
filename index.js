import{a as y,S as f,i as c}from"./assets/vendor-g8RIeo89.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();const p="50492024-422e121587c507d29de78ae86",g="https://pixabay.com/api/",h=async r=>{try{return(await y.get(g,{params:{key:p,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}})).data.hits}catch(o){throw console.error("Error fetching images:",o),new Error("Could not fetch images")}};let n;const b=r=>{const o=document.querySelector(".gallery"),s=r.map(({webformatURL:i,largeImageURL:e,tags:t,likes:a,views:d,comments:u,downloads:m})=>`
      <li class="gallery-item">
        <a href="${e}">
          <img src="${i}" alt="${t}" loading="lazy" />
        </a>
        <div class="image-info">
          <span><b>Likes:</b> ${a}</span>
          <span><b>Views:</b> ${d}</span>
          <span><b>Comments:</b> ${u}</span>
          <span><b>Downloads:</b> ${m}</span>
        </div>
      </li>`).join("");o.insertAdjacentHTML("beforeend",s),n&&n.refresh()},L=()=>{const r=document.querySelector(".gallery");r.innerHTML=""},S=()=>{const r=document.querySelector(".loader");r.classList.remove("hidden"),r.classList.add("visible")},q=()=>{const r=document.querySelector(".loader");r.classList.remove("visible"),r.classList.add("hidden")},v=()=>{n&&n.destroy(),n=new f(".gallery a",{captionsData:"alt",captionDelay:250})},l=document.querySelector(".form"),w=l.querySelector('input[name="search-text"]');l.addEventListener("submit",async r=>{r.preventDefault();const o=w.value.trim();if(o===""){c.error({title:"Error",message:"Please enter a search query."});return}L(),S();try{const s=await h(o);s.length===0?c.info({title:"No Results",message:"Sorry, there are no images matching your search query. Please try again!"}):(b(s),v())}catch{c.error({title:"Error",message:"Something went wrong. Please try again later."})}finally{q()}});
//# sourceMappingURL=index.js.map
