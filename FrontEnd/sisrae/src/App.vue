<template>
  <div id="app" >
  <h1></h1>
  <div style="height:110px;background-color:#198da0;position:sticky; top:0px;  z-index:1;"></div>
 
    <b-navbar  type="dark" fixed="top"  style="
    margin-top: 25px;
    border-bottom-width: 10px;
    margin-bottom: 20px;
    background-color:#5eafbc;
    z-index:1;
    height:55px">
    </b-navbar>
     <b-navbar-brand href="../"> 
     <img id="logo" src="./assets/white-logo.png" alt="Kitten" height="90"  style="
      position: fixed;
      z-index:3;
      top: 5px; left:20px
      ">
     </b-navbar-brand>

     <!-- Get the call -->
      <router-view />
   

  </div>

</template>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0f0f0f;
 //  background-color:#198DA0 ;
}
.text-right {
  text-align: right !important;
}
#side-nav {
  width: 160px;
}
.nav-link {
    color: #535556 !important;
}
.main-box {
  padding: 0px !important;
  margin: 0px !important;
  max-width: 100% !important;
}

#logo {
  padding-left: 10px;
}

#logo-title {
  padding-top: 10px;
 
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
