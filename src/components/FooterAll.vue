<template>
  <div id="footer">
    <p>
      <a id="git" href="https://github.com/romainfrz" target="blank">© Romain FREZIER - IG3</a>
    </p>
    <a id="polytech" href="https://www.polytech.umontpellier.fr" target="blank">
      <img id="logoPolytech" src="../assets/polytech.png" alt="logo-polytech"/>
    </a>
  </div>
</template>

<script>
export default {
  name: "FooterAll",
}
</script>

<style>
#footer {
  position: sticky;
  bottom: 0px;
  height: 10vh;
  background-color: #222831;
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 20px;
  user-select: none;
}

#footer > p {
  display: inline-block;
  margin: 0 auto;
  margin-right: 80px;
}

#footer > p:hover {
  cursor: default;
}

#footer > a {
  height: 100%;
  display: flex;
  align-items: center;
  margin: 0 auto;
}

#git{
  color: #EEEEEE;
  text-decoration: none;
}

#logoPolytech {
  max-height: 70%;
}
</style>
