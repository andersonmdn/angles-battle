<template>
  <v-app id="app" style="background-color: transparent;">
    <div id="stars"></div>
    <div id="stars2"></div>
    <div id="stars3"></div>
    <v-navigation-drawer app dark mini-variant expand-on-hover permanent color="#17171A">
      <v-list>
        <router-link v-for="item in items" :key="item.title" :to="item.to">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      items: [
        { title: "Jogo", icon: "mdi-gamepad", to: "/" },
        { title: "Ranking", icon: "mdi-trophy", to: "/ranking" }
      ]
    };
  }
};
</script>

<style lang="sass">
.cssmenu
	position: fixed
	left: 0
	top: 0

#app
	font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"
	//font-family: "teko", "Avenir", Helvetica, Arial, sans-serif
	//font-family: "KenVector Future Thin", "teko" !important
	-webkit-font-smoothing: antialiased
	-moz-osx-font-smoothing: grayscale
	text-align: center
	color: #2c3e50
	background-color: #17171A !important
	//background: radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)
	overflow: hidden

// n is number of stars
@function multiple-box-shadow ($n)
	$value: '#{random(2000)}px #{random(2000)}px #FFF'
	@for $i from 2 through $n
		$value: '#{$value} , #{random(2000)}px #{random(2000)}px #FFF'

	@return unquote($value)

$shadows-small:  multiple-box-shadow(700)
$shadows-medium: multiple-box-shadow(200)
$shadows-big:    multiple-box-shadow(100)

#stars
	width: 1px
	height: 1px
	background: transparent
	box-shadow: $shadows-small
	animation: animStar 50s linear infinite

	&:after
		content: " "
		position: absolute
		top: 2000px
		width: 1px
		height: 1px
		background: transparent
		box-shadow: $shadows-small

#stars2
	width: 2px
	height: 2px
	background: transparent
	box-shadow: $shadows-medium
	animation: animStar 100s linear infinite
	
	&:after
		content: " "
		position: absolute
		top: 2000px
		width: 2px
		height: 2px
		background: transparent
		box-shadow: $shadows-medium

#stars3
	width: 3px
	height: 3px
	background: transparent
	box-shadow: $shadows-big
	animation: animStar 150s linear infinite
  
	&:after
		content: " "
		position: absolute
		top: 2000px
		width: 3px
		height: 3px
		background: transparent
		box-shadow: $shadows-big

@keyframes animStar
	from
		transform: translateY(0px)
	to
		transform: translateY(-2000px)
</style>
