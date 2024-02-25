document.querySelector('.hamburger-menu').addEventListener('click', function() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
});

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

const API_KEY = `d442e5b521b24b44b3eff15add9db6bd`;
let newslist=[];
const menus =document.querySelectorAll(".menus button");
menus.forEach(menu=>menu.addEventListener("click",(event)=>getnewsbycategory(event)))

let url = new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`
);

let totalResults = 0
let page = 1
const pageSize = 10 //한 페이지 안에 뜨는 뉴스 갯수
const groupSize = 5 

const getnews =async ()=>{

  try{
   url.searchParams.set("page",page); //"page"라는 파라미터를 셋팅한다. 그 값은 위의 page 함수 값이다. 이걸 다르게 표현하면 &page=page 이다.
   url.searchParams.set("pageSize", pageSize); //여기서 두 파라미터 함수는 fetch 함수 전에 쓰여야 한다
  
   const response =await fetch(url);
   const data = await response.json();
  
      if(response.status===200){ 
          if(data.articles.length===0){
              throw new Error("No Result For This Search");
          }
          newslist = data.articles;
          totalResults = data.totalResults
          render();
          paginationRender();
      }else{
          throw new Error(data.message)
      }
  }catch(error){
      errorRender(error.message); //밑에 errorRender를 호출 할 때 마다 error.message를 보여줌
  }

};


const getLastesnews = async ()=>{
  url=new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=kr&apiKey=${API_KEY}`
  ); 
  getnews();
};

const getnewsbycategory=async (event)=>{
   const category = event.target.textContent.toLowerCase();
  console.log("category",category);
  url = new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  getnews();
};

const searchNews=async ()=>{
  const keyword = document.getElementById("search-input").value
  console.log(keyword);
  url = new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  getnews();
}

const render=()=>{
  const newshtml = newslist.map(news=>`<div class="row news">
  <div class="col-lg-4">
      <img class="newsimg-size"
          src="${news.urlToImage || "https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"}" />
  </div>

  <div class="col-lg-8">
      <h2>${news.title}</h2>
      <p>
          ${news.description == null || news.description ==""
          ?"내용 없음"
          :news.description.length > 200
          ?news.description.substring(0,200) + "..."
          :news.description
      }
      </p>
      <div>
          ${news.source.name || "No Soucre"} * ${moment(news.publishedAt).startOf('hour').fromNow()}
      </div>
  </div>
</div>`
)

.join("");


  document.getElementById("news-board").innerHTML=newshtml
}

const errorRender=(errorMessage)=>{
 const errorHtml = `<div class="alert alert-danger" role="alert">
${errorMessage}
  </div>`;

  document.getElementById("news-board").innerHTML=errorHtml //에러가 발생하면 에러 메시지를 뉴스를 보여주는 곳에서 보여줌 
};


const paginationRender=()=>{
  //totalResult
  //page
  //pageSize
  //groupSize
  //totalpage
  const totalPages = Math.ceil(totalResults/pageSize);
  //pageGroup
  const pageGroup = Math.ceil(page/groupSize);
  //lastPage

  let lastPage = pageGroup * 5;  //마지막 페이지그룹이 그룹사이즈보다 작으면 lastpage = totalpage
  if(lastPage > totalPages){
    // 마지막 그룹이 5개 이하
      lastPage = totalPages;
  }
  //firstPage
  let firstPage = lastPage - 4 <=0? 1 : lastPage - 4 ;


let paginationHtml=``

if(page -1 ==0){
  paginationHtml=`<li class="page-item" style="display:none" onclick="moveToPage(${firstPage})"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
  <li class="page-item" style="display:none" onclick="moveToPage(${page -1})"><a class="page-link" href="#"><</a></li>`
}else{
  paginationHtml=`<li class="page-item" onclick="moveToPage(${firstPage})"><a class="page-link" href="#" aria-label="<"><span aria-hidden="true">&laquo;</span></a></li>
  <li class="page-item" onclick="moveToPage(${page -1})"><a class="page-link" href="#"><</a></li>`
};

for(let i=firstPage; i<=lastPage; i++){
  paginationHtml+=`<li class="page-item ${i===page? 'active': ''}" onclick="moveToPage(${i})"><a class="page-link pointer">${i}</a></li>`;
};

if (page >= lastPage) {
  paginationHtml+=`<li class="page-item" style="display:none" onclick="moveToPage(${lastPage})"><a class="page-link" href="#" aria-label=">"><span aria-hidden="true">&raquo;</span></a></li>
  <li class="page-item" style="display:none" onclick="moveToPage(${page +1})"><a class="page-link" href="#">></a></li>`               
}else{
    paginationHtml+=`<li class="page-item" onclick="moveToPage(${page +1})"><a class="page-link" href="#">></a></li>
    <li class="page-item" onclick="moveToPage(${lastPage})"><a class="page-link" href="#" aria-label=">"><span aria-hidden="true">&raquo;</span></a></li>`
    
};


document.querySelector(".pagination").innerHTML=paginationHtml;

};
const moveToPage=(pagenum)=>{
  console.log("movetopage",pagenum);
  page = pagenum;
  getnews();
};

getLastesnews();

/* <nav aria-label="Page navigation example">
<ul class="pagination">
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Previous">
      <span aria-hidden="true">&laquo;</span>
    </a>
  </li>
  <li class="page-item"><a class="page-link" href="#">1</a></li>
  <li class="page-item"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">3</a></li>
  <li class="page-item">
    <a class="page-link" href="#" aria-label="Next">
      <span aria-hidden="true">&raquo;</span>
    </a>
  </li>
</ul>
</nav> */

//enter키 입력
let input = document.getElementById("search-input");

  input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("button-enter").click();
    }
  });
