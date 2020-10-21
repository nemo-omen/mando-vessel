<script>
	import { onMount } from 'svelte';
	import {fade} from 'svelte/transition';
	import { socket } from './socket.js';

	export let name;

	$: graphics = [];

	let dummyGraphic = {
		"type": "lowerthird",
        "show": "cvhp",
        "scene": "A03",
        "entranceAnimation": {
            "type": "fly",
            "direction": "left",
            "duration": "500",
            "delay": "0"
        },
        "exitAnimation": {
            "type": "fly",
            "direction": "left",
            "duration": "500",
            "delay": "0"
        },
        "playoutOptions": {
            "loop": "true",
            "onScreen": "7000",
            "offScreen": "120000"
        },
        "subjects": [
            {
                "title": "David Wagner",
                "subtitle": "KLST/KSAN"
            },
            {
                "title": "Cody Brown",
                "subtitle": "KLST/KSAN"
            }
        ],
	}

	async function updateGraphics() {
		socket.get('/graphics', (body, response) => {
			graphics = [...body];
			console.log(graphics);
			console.log('updateGraphics socket response: ', response);
		});
	}

	async function saveGraphic() {
		const response = await fetch('http://localhost:1337/graphics', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(dummyGraphic),
		});
	console.log('http POST response: ', response);
	}

	async function saveSocketGraphic() {
		socket.post('/graphics', dummyGraphic, (resData, jwRes) => {
			if(jwRes.statusCode === 200) {
				updateGraphics();
			}
		});
	}

	async function deleteGraphic(id) {
		console.log(id);
		const response = await fetch(`http://localhost:1337/graphics/${id}`, {
			method: 'DELETE'
		});
		const data = await response.json();
	}

	async function deleteSocketGraphic(id) {
		socket.delete(`/graphics/${id}`, function(resData, jwRes) {
			if(jwRes.statusCode === 200) {
				updateGraphics();
			}
		});
	}

	socket.on('graphics', (data) => {
		console.log('graphics event data: ', data);
		updateGraphics();
	});

	onMount(async() => {
		updateGraphics();
	});
</script>

<main>
	<div class="vessel">
		<img src="submarine.svg" alt="A Yellow Underwater Vessel" title="Vessel">
	</div>
	<h1>Hello {name}!</h1>
	<button on:click={saveGraphic}>Add With Fetch</button>
	<button on:click={saveSocketGraphic}>Add With Socket</button>
	{#each graphics as graphic}
		<h3 transition:fade={{duration:300}}><button on:click={() => deleteSocketGraphic(graphic.id)}>Socket Delete</button> {graphic.type} <button on:click={() => deleteGraphic(graphic.id)}>Fetch Delete</button></h3>
	{/each}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff9801;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	.vessel {
		margin: 7em 0;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>