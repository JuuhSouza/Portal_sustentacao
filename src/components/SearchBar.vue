
<template>
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <div class="btn-open" v-show="!painelAberto">
        <button class="btn-toggle" @click="togglePainel">
            Guia de chamados
        </button>
    </div>
   
    <div class="results" :class="{ aberto : painelAberto}">

      <div class="sidebar-header">
          <button class="btn-close" @click="togglePainel">
            <i class="fa-solid fa-xmark"></i>
          </button>
            <h1>Guia de chamados</h1>
        </div>

    <div class="filters">
      <select v-model="categoriaSelecionada">
        <option value="Todos">Todas as Categorias</option>
        <option value="Processos">Processos</option>
        <option value="Cupom">Cupom</option>
      </select>

      <div class="search">
         <label for=""><i class="fa-solid fa-magnifying-glass"></i></label>
        <input 
            v-model="busca"
            :placeholder="categoriaSelecionada === 'Todos' ? 'Pesquisa geral' : 'Pesquisar em ' + categoriaSelecionada"
        />
        </div>
    </div>

      <div class="card"
      v-for="item in itensFiltrados"
      :key="item.id"
      :class="{'card-ativo' : itemSelecionado?.id === item.id}"
      @click="verDetalhes(item)">
      <h1> Categoria:  <span class="badge">{{ item.categoria }}</span></h1>
      <h3> {{ item.nome }}</h3>

      <!-- DETALHES -->
        <div class="info-extra"
        v-if="itemSelecionado?.id === item.id">
          <h1>Mais detalhes :</h1>
          <p>{{ item.descricao }}</p>
          <h1> Guia em PDF : </h1>
            <ul v-if="item.links?.length">
              <li v-for="(link, index) in item.links" :key="index">
                <a :href="link.url"
                target="_blank"
                rel="noopener noreferrer"
                @click.stop
                class="link-detalhes">
              {{ link.label }}</a>
              </li>
            </ul>
         

        </div>
      </div>
    </div>

</template>

<script setup>
import { ref, computed } from 'vue'

const itens = ref([
  {
    id: 1,
    nome: 'Guia de Processos',
    categoria: 'Processos',
    descricao: "Neste link encontra-se um guia de processos gerais que serão necessários para resolver os chamados, atente-se que cada caso exige diferentes medidas, além de que pode ser que um chamado completamente novo apareça e é sempre importante consultar seus colegas sobre isso. ",
    links: [
      {
        url: "https://ciazaffari-my.sharepoint.com/:w:/g/personal/kaillanny_santos_ciazaffari_com_br/IQCnvptunduyQJ6i23cHx3BKATUgpWMv7nOrMi5Qn-evkqE?e=XjhO9J&wdOrigin=TEAMS-WEB.p2p_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1770723259084&web=1",
        label: "Guia de chamados"
      }
    ]
  },
  {
    id: 2,
    nome: 'Guia de Processos',
    categoria: '...',
    descricao: "alguma coisa",
    links: [
      {
        url: "",
        label: "Guia de chamados"
      }
    ]
  },
  {
    id: 3,
    nome: 'Análise Contingência Pendente',
    categoria: 'Cupom',
    descricao: "Neste link encontra-se um guia de como resolver chamados do tipo contingência/pendente, com um passo-a-passo detalhado e que permite um entendimento facilitado e rápido de todo o contexto. Sendo que, pode ocorrer algumas adversidades durante a resolução deste chamado e em caso de quaisquer dúvidas, consulte o Rilo ou o Rinaldo.",
    links: [
      {
        url: "https://ciazaffari-my.sharepoint.com/:w:/g/personal/kaillanny_santos_ciazaffari_com_br/IQBBMq8NK1bERKYxS-q2u-XzAdwooG-jQrbImnzD5bIuexY?e=puee0f&wdOrigin=TEAMS-WEB.null_ns.rwc&wdExp=TEAMS-TREATMENT&wdhostclicktime=1770726204880&web=1",
        label: "Análise Contingência Pendente"
      }
    ]
  },
])

/* menu-toggle */
const painelAberto = ref(false)
const togglePainel = () => {
  painelAberto.value = !painelAberto.value
}

/*armazena o item */
const itemSelecionado = ref(null);

/* selecionar */
const verDetalhes = (item) => {
  itemSelecionado.value = itemSelecionado.value?.id === item.id ? null : item;
}

// Estados dos filtros
const busca = ref('')
const categoriaSelecionada = ref('Todos')

//Computed Property que filtra tudo automaticamente
const itensFiltrados = computed(() => {
  return itens.value.filter(item => {
    const termo = busca.value.toLocaleLowerCase();

    /* filtragem por texto */
    const matchTexto = item.nome.toLocaleLowerCase().includes(termo) || item.descricao.toLocaleLowerCase().includes(termo);

    /* filtragem categoria */
    const matchCategoria = categoriaSelecionada.value === 'Todos' || item.categoria === categoriaSelecionada.value

    return matchTexto && matchCategoria
  })
})
</script>

<style scoped>
.sidebar-header{
  display: flex;
  align-items: center;
  justify-content: baseline;
}

.sidebar-header h1{
  font-size: 2em;
  margin-left: 4em;
  color: var(--color-title);
}

.btn-close{
  color: var(--color-btn);
  background-color: var(--background-color-btn);
}

.btn-open{
  position: fixed;
  top: 1em;
  right: 1em;
  z-index: 1000;
}
.btn-toggle{
  color: var(--color-btn);
  background-color: var(--background-color-btn);
}

.filters {
  width: 100%;
  margin-bottom: 1em;
}

.filters select {
  padding: .6em;
  font-size: 1em;
  margin-bottom: 10px;
}

.search{
    display: flex;
    align-items: center;
    border: 1px solid #3698D4;
    background-color: rgba(255, 255, 255, 0.575);
    width: 100% auto; 
    margin: 20px auto;
    border-radius: 20px;
    padding: 5px 10px;
    color: red;
}

.search input{
    padding: 8px;
    border: none;
    background-color: transparent;
    width: 100%;
    outline: none;
    color: black;
}

.search label{
    height: 20px;
    color: black;
}

select{
  background-color: var(--select-background);
  color: var(--select-color);
  border-radius: 20px;
  border: 1px solid var(--select-border);
}

.results {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 40%;
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transform: translateX(100%);
  background-color: var(--background-color-all);
  transition: transform 0.3s ease-in-out;
  box-shadow: -5px 0 15px rgba(0,0,0,0.2);
  overflow-y: auto;
}

.results.aberto {
  transform: translateX(0);
}

.card{
    width: 90%;
    background-color: var(--background-card);
    color: var(--color-card);
    border: 1px solid white;
    border-radius: 12px;
    padding: 11px;
    cursor: pointer;
    transition: all .3s ease;
    display: flex;
    flex-direction: column;
    margin: .4em auto;
    align-items: start;
    gap: 6px;
}

.card::-webkit-scrollbar{
  width: 6px;
}

.card::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
}

.card h1{
  font-size: 1em;
}

.card span{
  font-size: 1em;
  color: var(--categoria-color-span);
}

.card h3{
  font-size: 1.5em;
  margin-bottom: 4px;
}

.card p{
  font-size: 1em;
}

.info-extra p{
  font-size: 1em;
  text-align: start;
  padding:1em;
}

.card,
.info-extra {
  align-items: flex-start;
  text-align: left;
}


.badge{
  font-size:2em ;
}

.card h3,
.card p,
.card span {
  margin: 0;
}

.lista-links {
  list-style: none;      /* tira bolinhas */
  padding: 0;
  margin: 6px 0;
}

.lista-links li {
  margin-bottom: 6px;
}

.link-detalhes {
  color: var(--color-link);
  font-size: 0.95em;
  text-decoration: none;
  cursor: pointer;
}

.link-detalhes:hover {
  opacity: 0.8;
  text-decoration: underline;
}

</style>
