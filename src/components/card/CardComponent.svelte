<script>

    import {createEventDispatcher} from 'svelte';
    import {fade} from 'svelte/transition';

    import ArrowDown from "../icons/ArrowDown.svelte";
    import ArrowUp from "../icons/ArrowUp.svelte";
    import Done from "../icons/Done.svelte";

    // -- component data
    let isShow = false;
    // -- component data

    // -- component props
    export let item = null;
    export let id = null;
    // -- component props

    const dispatchModule = (() => {

        const dispatch = createEventDispatcher();

        return {
            done() {
                dispatch('done', id);
            },

            update() {
                dispatch('update', {item : item, id : id});
            },

            delete() {
                dispatch('delete', id);
            },
        }

    })();


</script>

<div class="w-full rounded overflow-hidden shadow-lg bg-white">

    <div class="px-6 py-4">
        <div class="flex flex-row flex-no-wrap items-center justify-between">
            <div class="font-bold text-xl mb-2 whitespace-no-wrap truncate text-gray-800">{item.title}</div>
            {#if isShow}
                <ArrowUp on:click={() => isShow = false }/>
            {:else}
                <ArrowDown on:click={() => isShow = true }/>
            {/if}
        </div>
        {#if isShow}
            <div transition:fade="{{delay: 0, duration: 250}}">
                <p class="text-gray-700 text-base">
                    {item.description}
                </p>
            </div>
        {/if}
    </div>
    <div class="px-6 py-4">
        <span class="block font-medium text-blue-500 tracking-tighter text-base subpixel-antialiased">
            Due date : {item.dueDate}
        </span>
    </div>
    <div class="px-6 py-4">
        {#if !item.done}
            <button class="bg-indigo-500 hover:bg-indigo-700 text-white text-sm font-bold p-1 rounded" on:click={dispatchModule.done}>
                완료
            </button>
            <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold p-1 rounded" on:click={dispatchModule.update}>
                수정
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 rounded" on:click={dispatchModule.delete}>
                삭제
            </button>
        {/if}
        {#if item.done}
            <div class="flex items-center justify-between">
                <Done/>
                <button class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 rounded" on:click={dispatchModule.delete}>
                    삭제
                </button>
            </div>
        {/if}
    </div>
</div>
