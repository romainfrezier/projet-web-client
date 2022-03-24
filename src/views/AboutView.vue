<template>
  <div>
    <Visitors></Visitors>
    <div id="about">
      <div class="part1">
        <p class="title">Personnal Presentation</p>
        <p class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed harum
          optio mollitia maxime! Qui voluptatem nemo voluptates fuga rem quod,
          delectus libero, dolorem nesciunt voluptate ullam iste eligendi
          doloribus asperiores a, itaque harum doloremque. Quas nobis facere
          quasi, similique libero nostrum, dignissimos impedit voluptas
          reiciendis labore iusto quos suscipit aperiam mollitia culpa, porro
          aliquid quis quisquam dicta pariatur accusamus et animi alias vel.
          Vero nisi soluta odio error. Modi quae tempora ex. Iusto obcaecati
          nostrum ipsam accusantium facilis impedit ipsum est, ratione aliquid,
          similique neque. Praesentium a quia eum numquam, alias repudiandae
          odit molestias, omnis optio temporibus eaque officiis dolor.
        </p>
        <p class="title">Contact Me</p>
        <p class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed harum
          optio mollitia maxime! Qui voluptatem nemo voluptates fuga rem quod,
          delectus libero, dolorem nesciunt voluptate ullam iste eligendi
          doloribus asperiores a, itaque harum doloremque. Quas nobis facere
          quasi, similique libero nostrum, dignissimos impedit voluptas
          reiciendis labore iusto quos suscipit aperiam mollitia culpa, porro
          aliquid quis quisquam dicta pariatur accusamus et animi alias vel.
          Vero nisi soluta odio error. Modi quae tempora ex. Iusto obcaecati
          nostrum ipsam accusantium facilis impedit ipsum est, ratione aliquid,
          similique neque. Praesentium a quia eum numquam, alias repudiandae
          odit molestias, omnis optio temporibus eaque officiis dolor.
        </p>
      </div>
      <div class="part2">
        <p class="title">Web Site Presentation</p>
        <p class="content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          repudiandae aliquid eveniet laborum officiis molestiae corporis
          quaerat, suscipit consequuntur perspiciatis non mollitia nisi
          doloremque quis incidunt exercitationem iure et consequatur quasi
          blanditiis similique ex labore voluptatem sit! Autem iure modi enim
          blanditiis odio, voluptas facilis quas eaque illum eveniet, deleniti
          veniam placeat eligendi vel cumque consequuntur voluptatem tempora ex
          perferendis impedit excepturi natus provident, minus voluptate?
          Nesciunt voluptate nostrum perspiciatis porro omnis? Repellat eveniet,
          a voluptate exercitationem similique adipisci illum quaerat minus
          vitae, nesciunt, accusamus voluptas! Mollitia, optio eum saepe amet
          nulla ipsam harum officia assumenda consequatur nesciunt esse
          exercitationem illum consectetur eveniet veritatis quidem fugit
          necessitatibus modi labore. Magnam qui dolorum sapiente dolore
          tenetur, officiis incidunt fugiat autem suscipit cupiditate omnis
          deleniti porro doloremque sed, tempora maxime rem quos voluptates
          alias eaque necessitatibus magni vitae quam? Eum fugiat in deserunt
          tenetur quia quos molestiae eaque ad dignissimos, consequatur corporis
          recusandae enim ducimus voluptatem exercitationem quod rem? Quos dicta
          placeat cum dolor nulla libero inventore repellat modi velit
          recusandae, perferendis beatae neque facere quis? Sit, ut? Impedit
          rem, libero commodi, deserunt mollitia dolorum facere illum asperiores
          ab sit adipisci dolore officia, reiciendis ratione explicabo dicta
          quo. Labore officiis dignissimos sequi.
        </p>
      </div>  
    </div>
  </div>
</template>

<script>
import Visitors from "../components/VisitorsHead.vue";

export default {
  name: "VisitorsView",
  components: {
    Visitors,
  },
};
</script>
<style scoped>

#about {
  display: grid;
  grid-template-columns: 50% 50%;
  vertical-align: middle;
  height: 75vh;
  color: #393E46;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.part1{
  grid-column: 0;
  padding: 20px;
  margin-bottom: 10px;
  overflow-y: overlay;
}

.part2{
  grid-column: 2;
  padding: 20px;
  margin-bottom: 10px;
  overflow-y: overlay;
}

.title {
  margin-top: 60px;
  margin-bottom: 30px;
  font-size: 30px;
  font-weight: bold;
  border-bottom: solid 1px #FFD369;
  user-select: none;
  cursor: default;
}

.content {
  text-align: justify;
  font-size: 20px;
}

::-webkit-scrollbar {
  width: 5px;
}

::-webkit-scrollbar-thumb {
  background: #393E46;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
</style>