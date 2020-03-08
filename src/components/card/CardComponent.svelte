<script>
    import ArrowDown from "../icons/ArrowDown.svelte";
    import ArrowUp from "../icons/ArrowUp.svelte";

</script>

<div class="max-w-sm rounded overflow-hidden shadow-lg">

    <div class="px-6 py-4">
        <div class="flex flex-row flex-no-wrap items-center justify-between">
            <div class="font-bold text-xl mb-2 whitespace-no-wrap truncate text-gray-800">TODO title</div>
            <div style="cursor: pointer">
                <ArrowDown/>
            </div>
        </div>
        <div>
            <p class="text-gray-700 text-base">
                TODO contents..
            </p>
        </div>
    </div>
    <div class="px-6 py-4">
        <span class="block font-medium text-blue-500 tracking-tighter text-base subpixel-antialiased">
            2020.01.01 ~ 2020.01.03
        </span>
    </div>
    <div class="px-6 py-4">
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#photography</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#travel</span>
        <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">#winter</span>
    </div>
</div>
