<template>
  <div id="footer">
    <p>
      <a
        id="git"
        href="https://github.com/romainfrz"
        target="blank"
        style="text-decoration: none; color: black"
        >© Romain FREZIER - IG3</a
      >
    </p>
    <a id="polytech" href="https://www.polytech.umontpellier.fr" target="blank">
      <img
        id="logoPolytech"
        src="../assets/polytech.png"
        alt="logo-polytech"
      />
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
  height: 10vh;
  background-color: rgb(232, 78, 70);
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

#logoPolytech {
  max-height: 70%;
}
</style>
