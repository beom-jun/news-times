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

const getLastesnews = async ()=>{
    const url=new URL(`https://newsapi.org/v2/top-headlines?country=kr&content=200&apiKey=${API_KEY}`
    ); 
    const response =await fetch(url);
    const data = await response.json()
    newslist = data.articles; //newslist가 확정 되는 부분 -> 이 다음줄에 render함수 호출
    render()
    console.log("rrr",newslist)
};

const render=()=>{
    const newshtml = newslist.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="newsimg-size"
            src=${news.urlToImage} />
    </div>

    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p>
            ${news.description}
        </p>
        <div>
            ${news.source.name} * ${news.publishedAt}
        </div>
    </div>
</div>`
)

.join("");


    document.getElementById("news-board").innerHTML=newshtml
}

getLastesnews();

