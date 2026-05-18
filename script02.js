let produtos = JSON.parse(localStorage.getItem("produtos")) || [];

const nome = document.getElementById("nome");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");

const btnSalvar = document.getElementById("btnSalvar");

const listaProdutos = document.getElementById("listaProdutos");

const totalProdutos = document.getElementById("totalProdutos");
const valorTotal = document.getElementById("valorTotal");
const estoqueBaixo = document.getElementById("estoqueBaixo");

const campoPesquisa = document.getElementById("campoPesquisa");

let editandoId = null;
let termoPesquisa = "";
let categoriaSelecionada = "Todos";

// =======================
// SALVAR NO STORAGE
// =======================
function salvarLocal() {
  localStorage.setItem("produtos", JSON.stringify(produtos));
}

// =======================
// SALVAR / EDITAR
// =======================
function salvarProduto() {

  const n = nome.value.trim();
  const c = categoria.value.trim();
  const p = Number(preco.value);
  const q = Number(quantidade.value);

  if (!n || !c || p <= 0 || q < 0) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  const produto = {
    id: editandoId || Date.now(),
    nome: n,
    categoria: c,
    preco: p,
    quantidade: q
  };

  if (editandoId) {

    produtos = produtos.map(item =>
      item.id === editandoId ? produto : item
    );

    editandoId = null;
    btnSalvar.textContent = "➕ Salvar Produto";

  } else {
    produtos.push(produto);
  }

  salvarLocal();
  limparCampos();
  renderizar();
}

// =======================
// FILTRO CATEGORIA
// =======================
function filtrarCategoria(cat) {
  categoriaSelecionada = cat;
  renderizar();
}

// =======================
// RENDER PRINCIPAL
// =======================
function renderizar() {

  const lista = produtos.filter(p => {

    const matchCategoria =
      categoriaSelecionada === "Todos" ||
      p.categoria.toLowerCase() === categoriaSelecionada.toLowerCase();

    const matchPesquisa =
      p.nome.toLowerCase().includes(termoPesquisa) ||
      p.categoria.toLowerCase().includes(termoPesquisa);

    return matchCategoria && matchPesquisa;
  });

  listaProdutos.innerHTML = "";

  if (lista.length === 0) {
    listaProdutos.innerHTML = `
      <tr>
        <td colspan="6">Nenhum produto encontrado</td>
      </tr>
    `;
    atualizarDashboard();
    return;
  }

  lista.sort((a, b) => a.nome.localeCompare(b.nome));

  lista.forEach(p => {

    const total = p.preco * p.quantidade;

    listaProdutos.innerHTML += `
      <tr class="${p.quantidade <= 5 ? "baixo" : ""}">
        <td>${p.nome}</td>
        <td>${p.categoria}</td>
        <td>R$ ${p.preco.toFixed(2)}</td>
        <td><b>${p.quantidade}</b></td>
        <td>R$ ${total.toFixed(2)}</td>
        <td>

          <button onclick="alterar(${p.id},1)">+</button>
          <button onclick="alterar(${p.id},-1)">-</button>
          <button onclick="editar(${p.id})">Editar</button>
          <button onclick="remover(${p.id})">Excluir</button>

        </td>
      </tr>
    `;
  });

  atualizarDashboard();
}

// =======================
// DASHBOARD (FORÇADO CORRETO)
// =======================
function atualizarDashboard() {

  totalProdutos.textContent = produtos.length;

  let soma = 0;
  let baixo = 0;

  for (let p of produtos) {
    soma += p.preco * p.quantidade;
    if (p.quantidade <= 5) baixo++;
  }

  valorTotal.textContent = soma.toFixed(2);
  estoqueBaixo.textContent = baixo;
}

// =======================
// EDITAR
// =======================
function editar(id) {

  const p = produtos.find(x => x.id === id);

  nome.value = p.nome;
  categoria.value = p.categoria;
  preco.value = p.preco;
  quantidade.value = p.quantidade;

  editandoId = id;

  btnSalvar.textContent = "💾 Atualizar Produto";
}

// =======================
// REMOVER
// =======================
function remover(id) {

  if (!confirm("Deseja excluir este produto?")) return;

  produtos = produtos.filter(p => p.id !== id);

  salvarLocal();
  renderizar();
}

// =======================
// ALTERAR QUANTIDADE
// =======================
function alterar(id, valor) {

  produtos = produtos.map(p => {

    if (p.id === id) {
      p.quantidade += valor;
      if (p.quantidade < 0) p.quantidade = 0;
    }

    return p;
  });

  salvarLocal();
  renderizar();
}

// =======================
// PESQUISA REAL TIME
// =======================
campoPesquisa.addEventListener("input", (e) => {

  termoPesquisa = e.target.value.toLowerCase().trim();

  renderizar();
});

// =======================
// LIMPAR CAMPOS
// =======================
function limparCampos() {
  nome.value = "";
  categoria.value = "";
  preco.value = "";
  quantidade.value = "";
}

// =======================
// BOTÃO
// =======================
btnSalvar.addEventListener("click", salvarProduto);

// ENTER
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") salvarProduto();
});

// START
renderizar();