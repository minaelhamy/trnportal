<template>
<footer class="the-footer">
	<ul class="nav justify-content-center">
		<li class="nav-item">
			<a class="nav-link">&copy; TechRecruit Ninja {{ year }}. All Rights Reserved.</a>
		</li>
		<li class="nav-item">
			<a><router-link :to="{ name: 'all_candidates' }" class="nav-link"><i class="fas fa-home"></i> Home</router-link></a>
		</li>
		<li class="nav-item">
			<a><router-link :to="{name: 'create_candidate'}" class="nav-link"><i class="fas fa-user-plus"></i> Create</router-link></a>
		</li>
	</ul>
</footer>	
</template>

<script>
export default {
  name: 'footers',
  data () {
    return {
			msg: 'The footer',
			year: new Date().getFullYear()
    }
  }
}
</script>