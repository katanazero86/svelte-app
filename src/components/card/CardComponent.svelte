<script>
    import ArrowDown from "../icons/ArrowDown.svelte";
    import ArrowUp from "../icons/ArrowUp.svelte";

    import {fade} from 'svelte/transition';

    let isShow = false;

</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg">

    <div class="px-6 py-4">
        <div class="flex flex-row flex-no-wrap items-center justify-between">
            <div class="font-bold text-xl mb-2 whitespace-no-wrap truncate text-gray-800">TODO title</div>
            {#if isShow}
                <ArrowUp on:click={() => isShow = false }/>
            {:else}
                <ArrowDown on:click={() => isShow = true }/>
            {/if}
        </div>
        {#if isShow}
            <div transition:fade="{{delay: 0, duration: 250}}">
                <p class="text-gray-700 text-base">
                    TODO contents..
                </p>
            </div>
        {/if}
    </div>
    <div class="px-6 py-4">
        <span class="block font-medium text-blue-500 tracking-tighter text-base subpixel-antialiased">
            2020.01.01 ~ 2020.01.03
        </span>
    </div>
    <div class="px-6 py-4">
        <button class="bg-indigo-500 hover:bg-indigo-700 text-white text-sm font-bold p-1 rounded">
            완료
        </button>
        <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold p-1 rounded">
            수정
        </button>
        <button class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 rounded">
            삭제
        </button>
    </div>
</div>
