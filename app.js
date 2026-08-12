
const PRODUCTS=[
{id:1,brand:"CeraVe",name:"Hydrating Facial Cleanser",price:28.49,cat:"Skincare",img:"https://www.cerave.com/-/media/project/loreal/brand-sites/cerave/master/cera-products/cleansers/hydrating-facial-cleanser/2025/473ml/3337875597210.png",rating:4.8,badge:"POPULAR"},
{id:2,brand:"Blackmores",name:"Fish Oil 1000 400 Capsules",price:48.99,cat:"Vitamins",img:"https://aushealthcaredirect.com.au/wp-content/uploads/2020/10/Blackmores-Fish-Oil-1000mg-400-Capsules.jpg",rating:4.6,badge:"BEST SELLER"},
{id:3,brand:"Blackmores",name:"Omega Triple Concentrated Fish Oil 150 Capsules",price:60.25,cat:"Vitamins",img:"https://www.cutpriceonline.com.au/cdn/shop/files/Blackmores-Omega-Triple-Concentrated-Fish-Oil-150-Capsules.jpg",rating:4.7,badge:"SAVE"},
{id:4,brand:"L'Oréal Elvive",name:"Power Moisture Hydrating Shampoo",price:12.99,cat:"Haircare",img:"https://rqeeqa.com/wp-content/uploads/2019/11/L%E2%80%99Or%C3%A9al-Paris-ELVIVE-Power-Moisture-Hydrating-Shampoo.jpg",rating:4.6,badge:"DEAL"},
{id:5,brand:"L'Oréal Elvive",name:"Extraordinary Oil Shampoo",price:11.99,cat:"Haircare",img:"https://www.banglashoppers.com/media/catalog/product/cache/ae30f4ea59211f5f98bc8770ef22abc0/3/6/3610340019982.jpg",rating:4.5,badge:"DEAL"},
{id:6,brand:"L'Oréal Elvive",name:"Hyaluron Plump Hydrating Shampoo",price:13.99,cat:"Haircare",img:"https://i5.walmartimages.com/seo/L-Oreal-Paris-Elvive-Hyaluron-Plump-Hydrating-Shampoo-with-Hyaluronic-Acid-12-6-fl-oz_0d0a.jpg",rating:4.6,badge:"NEW"}
];
let cart=JSON.parse(localStorage.getItem("carecart")||"{}");
const money=n=>"$"+n.toFixed(2)+" NZD";
function save(){localStorage.setItem("carecart",JSON.stringify(cart));updateCount()}
function updateCount(){document.querySelectorAll(".count").forEach(x=>x.textContent=Object.values(cart).reduce((a,b)=>a+b,0))}
function add(id){cart[id]=(cart[id]||0)+1;save();openCart()}
function change(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save();renderCart()}
function renderCart(){
 let e=Object.entries(cart).map(([id,q])=>({p:PRODUCTS.find(x=>x.id==id),q})).filter(x=>x.p);
 let el=document.getElementById("cartitems"); if(!el)return;
 el.innerHTML=e.length?e.map(x=>`<div class="cartrow"><div class="mini"><img src="${x.p.img}" alt=""></div><div><b>${x.p.name}</b><div>${money(x.p.price)}</div><div class="qty"><button onclick="change(${x.p.id},-1)">−</button><span>${x.q}</span><button onclick="change(${x.p.id},1)">+</button></div></div><b>${money(x.p.price*x.q)}</b></div>`).join(""):`<div class="empty">Your cart is empty.</div>`;
 let subtotal=e.reduce((s,x)=>s+x.p.price*x.q,0), ship=subtotal?(subtotal>=50?0:6.99):0,total=subtotal+ship;
 document.getElementById("summary").innerHTML=`<div class="row"><span>Subtotal</span><b>${money(subtotal)}</b></div><div class="row"><span>Shipping</span><b>${ship?money(ship):subtotal?"FREE":"$0.00 NZD"}</b></div><div class="row" style="font-size:19px"><b>Total</b><b>${money(total)}</b></div><button class="wide" onclick="alert('Demo checkout. Connect Stripe or another payment provider before taking real payments.')">Checkout</button>`;
}
function openCart(){document.getElementById("drawer").classList.add("open");renderCart()}
function closeCart(){document.getElementById("drawer").classList.remove("open")}
function renderProducts(target="products",filter="All",query=""){
 let list=PRODUCTS.filter(p=>(filter==="All"||p.cat===filter)&&(`${p.brand} ${p.name} ${p.cat}`.toLowerCase().includes(query.toLowerCase())));
 let el=document.getElementById(target);if(!el)return;
 el.innerHTML=list.length?list.map(p=>`<article class="card"><div class="photo"><span class="badge">${p.badge}</span><button class="heart" onclick="this.textContent=this.textContent==='♡'?'♥':'♡'">♡</button><img src="${p.img}" alt="${p.name}" onerror="this.style.display='none'"></div><div class="body"><div class="brand">${p.brand}</div><div class="name">${p.name}</div><div class="stars">★★★★★ <span class="muted">${p.rating}</span></div><div class="price">${money(p.price)}</div><button class="add" onclick="add(${p.id})">Add to cart</button></div></article>`).join(""):`<div class="empty">No products found.</div>`;
}
function initShop(){
 let filter=new URLSearchParams(location.search).get("cat")||"All";
 let chips=document.getElementById("chips");
 if(chips){["All","Skincare","Vitamins","Haircare"].forEach(c=>{let b=document.createElement("button");b.className="chip "+(c===filter?"active":"");b.textContent=c;b.onclick=()=>{location.href="shop.html?cat="+encodeURIComponent(c)};chips.appendChild(b)})}
 renderProducts("products",filter,document.getElementById("search")?.value||"");
 document.getElementById("search")?.addEventListener("input",e=>renderProducts("products",filter,e.target.value));
}
function initHome(){renderProducts("featured","All","")}
document.addEventListener("DOMContentLoaded",()=>{updateCount();renderCart();initHome();initShop()});
