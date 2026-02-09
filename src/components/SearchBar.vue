
<template>
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

  <div class="container">
    <div class="filters">
      <select v-model="categoriaSelecionada">
        <option value="Todos">Todas as Categorias</option>
        <option value="Eletrônicos">Eletrônicos</option>
        <option value="Informática">Informática</option>
        <option value="Móveis">Móveis</option>
      </select>

      <div class="search">
         <label for=""><i class="fa-solid fa-magnifying-glass"></i></label>
        <input 
            v-model="busca"
            :placeholder="categoriaSelecionada === 'Todos' ? 'Pesquisa geral' : 'Pesquisar em ' + categoriaSelecionada"
        />
        </div>
    </div>

    <div class="results">
      <div class="card"
      v-for="item in itensFiltrados"
      :key="item.id"
      :class="{'card-ativo' : itemSelecionado?.id === item.id}"
      @click="verDetalhes(item)">
      <span class="badge"> {{ item.categoria }}</span>
      <h3> {{ item.nome }}</h3>

      <!-- DETALHES -->
        <div class="info-extra"
        v-if="itemSelecionado?.id === item.id">
          <p>Mais detalhes</p>
          <p>{{ item.descricao }}</p>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const itens = ref([
    { id: 1, nome: 'iPhone 15', categoria: 'Eletrônicos', descricao: "alguma coisa" },
    { id: 2, nome: 'samrt', categoria: 'Eletrônicos', descricao: "alguma coisa" },
    { id: 3, nome: 'samsung', categoria: 'Eletrônicos', descricao: "alguma coisa" },
    { id: 4, nome: 'tv', categoria: 'Eletrônicos', descricao: "alguma coisa" },
  
    { id: 5, nome: 'Monitor Dell', categoria: 'Informática', descricao: "alguma coisa" },
    { id: 6, nome: 'Monitor qualquer', categoria: 'Informática', descricao: "alguma coisa" },
    { id: 7, nome: 'Monitor pilata', categoria: 'Informática', descricao: "alguma coisa" },

    { id: 8, nome: 'Cadeira Gamer', categoria: 'Móveis', descricao: "alguma coisa" },
])

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
.container{
    align-items: center;
    border: 1px red solid;
    padding: 2em 22em;
}

.search{
    display: flex;
    align-items: center;
    border: 1px solid red;
    background-color: rgba(255, 255, 255, 0.575);
    width: 400px;
    margin: 20px auto;
    border-radius: 20px;
    padding: 5px 10px;
    color: blue;
}

.search input{
    padding: 8px;
    border: none;
    background-color: transparent;
    width: 100%;
    outline: none;
}

.search label{
    height: 20px;
    color: black;
}

.results{
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
}

.card{
    width: 300px;
    background-color: rgba(0, 0, 255, 0.233);
    border: 1px solid white;
    border-radius: 10px;
    margin: 10px;
    padding: 10px 20px;
    box-shadow: 0 0 0px rgba(0, 0, 0, 0.5);
}

.filters select{
    padding: .6em;
    margin: 1em;

}




</style>
