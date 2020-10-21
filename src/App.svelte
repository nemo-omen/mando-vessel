<script>
 	import { Route } from 'tinro';
	import Home from './pages/Home.svelte';
	import Playout from './pages/Playout.svelte';

</script>

<Route path="/">
	<Home />
</Route>
<Route path ="/playout">
	<Playout />
</Route>



<style>

</style>