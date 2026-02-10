<template>
    <header>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <nav>
        <ul>
            <li><img src="../assets/icones/mobaxterm-icone.png" alt=""></li>
            <li><img src="../assets/icones/sql-icone.jpg" alt=""></li>
            <li><img src="../assets/icones/winspc-icone.jpg" alt=""></li>
            
        </ul>
    </nav>
    </header>
</template>

<script>
    export default {
        name: "NavBar"
    }
</script>

<style scoped>
header{
    padding: 0.2rem 0;
    top: 0;
    left: 0;
    position: absolute;
    position: fixed;
    width: 100%;
}

nav{
    background-color: var(--nav-background-color);
    margin: 0 auto;
    padding: 0 2rem;
    display: flex;
    justify-content:start;
}

nav ul{
    display: flex;
    list-style: none;
    align-items: center;
}

/* nav ul a{
    text-decoration: none;
    color: var(--nav-color-a);
    padding: 0 1.5rem;
    transform: uppercase;
    font-weight: 480;
    font-size: 1.2em;
    transition: all .3s ease;
} */

nav img{
    width: 2.5em;
    margin: auto 1.4em;
    transition: all .3s ease;
}

nav img:hover{
    transform: translateY(-5px);
}

/* nav ul a:hover{
    color: var(--nav-color-hover);
}
 */
</style>