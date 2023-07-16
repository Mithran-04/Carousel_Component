var tbody = document.querySelector("tbody");
var pageUl = document.querySelector(".pagination");
var itemShow = document.querySelector("#itemperpage");
var tr = tbody.querySelectorAll("tr");
var arr = [];
var index = 1;
var itemPerPage = 4;

for(let i=0; i<tr.length; i++){ 
	arr.push(tr[i]);
}

itemShow.onchange = ItemsPerPage;
function ItemsPerPage(){
	itemPerPage = Number(this.value);
	TableItems(itemPerPage);
	PageNumbers(itemPerPage);
	getpagElement(itemPerPage);
}

function TableItems(limit){
	tbody.innerHTML = '';
	for(let i=0; i<limit; i++){
		tbody.appendChild(arr[i]);
	}
	const  pageNum = pageUl.querySelectorAll('.list');
	pageNum.forEach(i=> i.remove());
}

TableItems(itemPerPage);
//No
function PageNumbers(getem){
	const num_of_tr = arr.length;
	if(num_of_tr <= getem){
		pageUl.style.display = 'none';
	}else{
		pageUl.style.display = 'flex';
		const num_Of_Page = Math.ceil(num_of_tr/getem);
		for(i=1; i<=num_Of_Page; i++){
			const li = document.createElement('li'); 
			li.className = 'list';
			const a =document.createElement('a'); 
			a.href = '#'; 
			a.innerText = i;
			a.setAttribute('page-index', i);
			li.appendChild(a);
			pageUl.insertBefore(li,pageUl.querySelector('.next'));
		}
	}
}

PageNumbers(itemPerPage);
let pageLink = pageUl.querySelectorAll("a");
let TotalPages =  pageLink.length - 2;

function pageRunner(pageLink, itemsPerPage, TotalPages, PageList){
	for(button of pageLink){
		button.onclick = event=>{
			const page_num = event.target.getAttribute('page-index');
			const page_mover = event.target.getAttribute('id');
			if(page_num != null){
				index = page_num;

			}else{
				if(page_mover === "next"){
					index++;
					if(index >= TotalPages){
						index = TotalPages;
					}
				}else{
					index--;
					if(index <= 1){
						index = 1;
					}
				}
			}
			pageMaker(index, itemsPerPage, PageList);
		}
	}

}
var pageLi = pageUl.querySelectorAll('.list'); 
pageLi[0].classList.add("active");
pageRunner(pageLink, itemPerPage, TotalPages, pageLi);

function getpagElement(val){
	let pagelink = pageUl.querySelectorAll("a");
	let TotalPages =  pagelink.length - 2;
	let pageli = pageUl.querySelectorAll('.list');
	pageli[0].classList.add("active");
	pageRunner(pagelink, val, TotalPages, pageli);
	
}

function pageMaker(index, item_per_page, PageList){
	const start = item_per_page * index;
	const end  = start + item_per_page;
	const current_pageItems =  arr.slice((start - item_per_page), (end-item_per_page));
	tbody.innerHTML = "";
	for(let j=0; j<current_pageItems.length; j++){
		let item = current_pageItems[j];					
		tbody.appendChild(item);
	}
	Array.from(PageList).forEach((e)=>{e.classList.remove("active");});
	PageList[index-1].classList.add("active");
}
