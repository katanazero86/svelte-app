<script>

	import {FIREBASE_DB} from './firebase';

	let list = [];
	FIREBASE_DB.collection("list")
			.orderBy("age", "asc").onSnapshot(snapData => {
				list = snapData.docs;
	});


	export let name;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
</main>
<div class="bg-blue-100">
	tailwindcss
</div>

<!-- https://www.youtube.com/watch?v=L39XLne7EU8 -->

<div class="bg-gray-200">
	{#each list as listItem}
		<div>
			<p>{listItem.data().name}</p>
			<p>{listItem.data().age}</p>
		</div>
	{/each}
</div>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>