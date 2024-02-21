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

const getLastesnews = async ()=>{
    const url=new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=us&apiKey=${API_KEY}`
    ); 
    const response =await fetch(url);
    const data = await response.json()
    newslist = data.articles; //newslist가 확정 되는 부분 -> 이 다음줄에 render함수 호출
    render()
    console.log("rrr",newslist)
};

const getnewsbycategory=async (event)=>{
     const category = event.target.textContent.toLowerCase();
    console.log("category",category);
    const url = new URL(`https://benevolent-toffee-df4f4d.netlify.app//top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    const response = await fetch(url)
    const data =await response.json()
    console.log("ddd",data)
    newslist = data.articles; //2. newslist에 data.articles를 넣어준다
    render(); // 1.render로 보여주기 전 render 함수에 처음에 정의 된 newslist를 재정립 해준다.
};

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

getLastesnews();

