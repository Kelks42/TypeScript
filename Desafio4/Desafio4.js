@@ -13,11 +13,15 @@ let requestToken;

let username;
let password;
let sessionId;
let listId = '7101979';
let listId;
let loginContainer = document.getElementById('login-container');
let loginButton = document.getElementById('login-button');
let searchButton = document.getElementById('search-button');
let searchContainer = document.getElementById('search-container');
let searchInput = document.getElementById('search');
let btnAddlist = document.getElementById('addToList');
let inputIdFilme = document.getElementById('listIdFilme');
let listContainer = document.getElementById('list-container');

loginButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield criarRequestToken();
    yield logar();
@@ -34,32 +38,47 @@ searchButton.addEventListener('click', () => __awaiter(void 0, void 0, void 0, f
    ul.id = "lista";

    for (const item of listaDeFilmes.results) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item.original_title));
        li.appendChild(document.createTextNode(`${item.id} - ${item.original_title}`));
        ul.appendChild(li);
    }
    console.log(listaDeFilmes);
    searchContainer.appendChild(ul);
}));

btnAddlist.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    yield criarLista('teste', 'lista de teste');
    let resultAddMovie = yield adicionarFilmeNaLista(inputIdFilme.value, listId);
    let resultAllMovies = yield pegarLista();
    let ul = document.getElementById('listaFilmesUsuario');
    ul.id = "listaFilmesUsuario";
    for (const item of resultAllMovies.items) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(`${item.id} - ${item.original_title}`));
        ul.appendChild(li);
    }
    console.log(resultAddMovie);
}));
// LOGIN -------------------
function preencherSenha() {
    password = document.getElementById('senha').value;
    validateLoginButton();
    return document.getElementById('senha');
}
function preencherLogin() {
    username = document.getElementById('login').value;
    validateLoginButton();
    return document.getElementById('login');
}
function preencherApi() {
    apiKey = document.getElementById('api-key').value;
    validateLoginButton();
    return document.getElementById('api-key');
}
function validateLoginButton() {
    if (password && username && apiKey) {
    username = preencherLogin().value;
    password = preencherSenha().value;
    apiKey = preencherApi().value;
    if (password != "" && username != "" && apiKey) {
        loginButton.disabled = false;
    }
    else {
        loginButton.disabled = true;
    }
}
// LOGIN ------------------------
class HttpClient {
    static get({ url, method, body = null }) {
        return __awaiter(this, void 0, void 0, function* () {
@@ -92,27 +111,6 @@ class HttpClient {
        });
    }
}
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function* () {
        query = encodeURI(query);
        console.log(query);
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
            method: "GET"
        });
        result;
        return result;
    });
}
function adicionarFilme(filmeId) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
            method: "GET"
        });
        console.log(result);
    });
}
function criarRequestToken() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
@@ -124,7 +122,7 @@ function criarRequestToken() {
}
function logar() {
    return __awaiter(this, void 0, void 0, function* () {
        yield HttpClient.get({
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
            method: "POST",
            body: {
@@ -133,17 +131,50 @@ function logar() {
                request_token: `${requestToken}`
            }
        });
        if (result.success) {
            localStorage.setItem("login", "true");
            loginContainer.style.display = "none";
            searchContainer.style.display = "block";
            listContainer.style.display = "block";
        }
        else {
            localStorage.setItem("login", "false");
        }
        return result;
    });
}
function criarSessao() {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
            method: "GET"
            url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
            method: "POST",
            body: {
                request_token: requestToken
            }
        });
        sessionId = result.session_id;
        console.log(result);
        return result;
    });
}
function procurarFilme(query) {
    return __awaiter(this, void 0, void 0, function* () {
        query = encodeURI(query);
        console.log(query);
        let result = yield HttpClient.get({
            url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
            method: "GET"
        });
        return result;
    });
}
// async function adicionarFilme(filmeId: number) {
//   let result = await HttpClient.get({
//     url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
//     method: "GET"
//   })
//   console.log(result);
// }
function criarLista(nomeDaLista, descricao) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield HttpClient.get({
@@ -155,7 +186,8 @@ function criarLista(nomeDaLista, descricao) {
                language: "pt-br"
            }
        });
        console.log(result);
        listId = result.list_id;
        // console.log(result);
    });
}
function adicionarFilmeNaLista(filmeId, listaId) {
@@ -168,6 +200,12 @@ function adicionarFilmeNaLista(filmeId, listaId) {
            }
        });
        console.log(result);
        if (result.success) {
            alert("Filme adicionado a lista");
        }
        else if (result.status_code == 34) {
            alert("Erro ao adicionar filme a lista");
        }
    });
}
function pegarLista() {
@@ -177,5 +215,6 @@ function pegarLista() {
            method: "GET"
        });
        console.log(result);
        return result;
    });
}

  184  
src/desafio_4/desafio4.ts
@@ -1,44 +1,19 @@
let apiKey : string = "ee6d9c4c59652e78ceff23ee85b4530b";
let requestToken : string;
let username : string;
let password : string;
let sessionId : string;
let listId = '7101979';

interface IFilmeResultados{
    adult: boolean,
    backdrop_path: string,
    genre_ids: string[],
    id: number,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    title: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

interface IFilmeResposta {
    page: number,
    results: IFilmeResultados
    total_pages: number,
    total_results: number
}

interface IGetReturn{
    url : string,
    method: 'GET' | 'POST' | 'DELETE' | 'PUT',
    body: Object | null | Document
}

let apiKey: string = "ee6d9c4c59652e78ceff23ee85b4530b";
let requestToken: string;
let username: string;
let password: string;
let sessionId: string;
let listId: string;

let loginContainer = document.getElementById('login-container') as HTMLDivElement;
let loginButton = document.getElementById('login-button') as HTMLButtonElement;
let searchButton = document.getElementById('search-button') as HTMLButtonElement;
let searchContainer = document.getElementById('search-container') as HTMLDivElement;
let searchInput = document.getElementById('search') as HTMLInputElement;
let btnAddlist = document.getElementById('addToList') as HTMLButtonElement;
let inputIdFilme = document.getElementById('listIdFilme') as HTMLInputElement;
let listContainer = document.getElementById('list-container') as HTMLDivElement;

loginButton.addEventListener('click', async () => {
  await criarRequestToken();
  await logar();
@@ -51,44 +26,61 @@ searchButton.addEventListener('click', async () => {
    lista.outerHTML = "";
  }
  let query = searchInput.value;
  let listaDeFilmes : IFilmeResultados = await procurarFilme(query);
  let listaDeFilmes = await procurarFilme(query);
  let ul = document.createElement('ul');
  ul.id = "lista"
  for (const item of listaDeFilmes.results) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(item.original_title))
    ul.appendChild(li)
    li.appendChild(document.createTextNode(`${item.id} - ${item.original_title}`));
    ul.appendChild(li);
  }
  console.log(listaDeFilmes);
  searchContainer.appendChild(ul);
})

btnAddlist.addEventListener('click', async () => {
  await criarLista('teste', 'lista de teste');
  let resultAddMovie = await adicionarFilmeNaLista(inputIdFilme.value, listId)
  let resultAllMovies = await pegarLista();

  let ul = document.getElementById('listaFilmesUsuario') as HTMLUListElement;
  ul.id = "listaFilmesUsuario"
  for (const item of resultAllMovies.items) {
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(`${item.id} - ${item.original_title}`));
    ul.appendChild(li);
  }
  console.log(resultAddMovie);

})

// LOGIN -------------------
function preencherSenha() {
  password = document.getElementById('senha').value;
  validateLoginButton();
  return document.getElementById('senha') as HTMLInputElement;
}

function preencherLogin() {
  username =  document.getElementById('login').value;
  validateLoginButton();
  return document.getElementById('login') as HTMLInputElement;
}

function preencherApi() {
  apiKey = document.getElementById('api-key').value;
  validateLoginButton();
  return document.getElementById('api-key') as HTMLInputElement;
}

function validateLoginButton() {
  if (password && username && apiKey) {
  username = preencherLogin().value;
  password = preencherSenha().value;
  apiKey = preencherApi().value;
  if (password != "" && username != "" && apiKey ) {
    loginButton.disabled = false;
  } else {
    loginButton.disabled = true;
  }
}

// LOGIN ------------------------
class HttpClient {
  static async get({url, method, body = null} : IGetReturn) {
    return new Promise((resolve, reject) => {
  static async get<T>({ url, method, body = null }: IGetReturn) {
    return new Promise<T>((resolve, reject) => {
      let request = new XMLHttpRequest();
      request.open(method, url, true);

@@ -118,35 +110,16 @@ class HttpClient {
  }
}

async function procurarFilme(query : string) : Promise<IFilmeResposta>{
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  result
  return result
}

async function adicionarFilme(filmeId) {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
    method: "GET"
  })
  console.log(result);
}

async function criarRequestToken () {
  let result = await HttpClient.get({
async function criarRequestToken() {
  let result = await HttpClient.get<IGetToken>({
    url: `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
    method: "GET"
  })
  requestToken = result.request_token
}

async function logar() {
  await HttpClient.get({
  let result = await HttpClient.get<IGetAutenticationLogin>({
    url: `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`,
    method: "POST",
    body: {
@@ -155,18 +128,57 @@ async function logar() {
      request_token: `${requestToken}`
    }
  })

  if(result.success){
    localStorage.setItem("login","true");
    loginContainer.style.display = "none";
    searchContainer.style.display = "block";
    listContainer.style.display = "block";
  }

  else{
    localStorage.setItem("login", "false");
  }

  return result
}


async function criarSessao() {
  let result = await HttpClient.get({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}&request_token=${requestToken}`,
    method: "GET"
  let result = await HttpClient.get<IGetSession>({
    url: `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
    method: "POST",
    body:{
      request_token:requestToken
    }
  })
  sessionId = result.session_id;
  console.log(result);

  return result;
}


async function procurarFilme(query: string): Promise<IFilmeResposta> {
  query = encodeURI(query)
  console.log(query)
  let result = await HttpClient.get<IFilmeResposta>({
    url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`,
    method: "GET"
  })
  return result
}

async function criarLista(nomeDaLista, descricao) {
  let result = await HttpClient.get({
// async function adicionarFilme(filmeId: number) {
//   let result = await HttpClient.get({
//     url: `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=en-US`,
//     method: "GET"
//   })
//   console.log(result);
// }

async function criarLista(nomeDaLista: string, descricao: string) {
  let result = await HttpClient.get<ICreateList>({
    url: `https://api.themoviedb.org/3/list?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
@@ -175,24 +187,34 @@ async function criarLista(nomeDaLista, descricao) {
      language: "pt-br"
    }
  })
  console.log(result);
  listId = result.list_id
  // console.log(result);
}

async function adicionarFilmeNaLista(filmeId, listaId) {
  let result = await HttpClient.get({
async function adicionarFilmeNaLista(filmeId: string, listaId: string) {
  let result = await HttpClient.get<IAddMovieToList> ({
    url: `https://api.themoviedb.org/3/list/${listaId}/add_item?api_key=${apiKey}&session_id=${sessionId}`,
    method: "POST",
    body: {
      media_id: filmeId
    }
  })
  console.log(result);

  if(result.success){
    alert("Filme adicionado a lista");
  }
  else if(result.status_code == 34) {
    alert("Erro ao adicionar filme a lista");
  }

}

async function pegarLista() {
  let result = await HttpClient.get({
  let result = await HttpClient.get<IGetList>({
    url: `https://api.themoviedb.org/3/list/${listId}?api_key=${apiKey}`,
    method: "GET"
  })
  console.log(result);
  return result
}