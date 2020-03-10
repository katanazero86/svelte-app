<script>

    import {FIREBASE_DB} from './firebase';
    import moment from 'moment';
    import 'moment-timezone';
    import {fade} from 'svelte/transition';

    import CardComponent from "./components/card/CardComponent.svelte";
    import TodoFormModalComponent from "./components/modal/TodoFormModalComponent.svelte";

    moment.tz.setDefault("Asia/Seoul");

    let isShow = false;

    // title : string, description : string, createdDate : string, dueDate : string, done : boolean
    let list = [];
    let total = 0;
    let doneCount = 0;
    let overDueDateCount = 0;

    FIREBASE_DB.collection("list")
            .orderBy("createdDate", "desc")
            .onSnapshot(snapData => {
                list = snapData.docs;
                total = snapData.size;
            });

    FIREBASE_DB.collection("list")
            .where("done", "==", true)
            .onSnapshot(snapData => {
                doneCount = snapData.size;
            });

    const saveTodo = (e) => {
        const todoItemObject = {...e.detail};
        createListItem(todoItemObject);
    };

    let addName = '';
    let addAge = null;

    // create
    const createListItem = (todoItemObject) => {

        if (!todoItemObject.title.trim()) {
            alert('제목을 입력해주세요..');
            return false;
        }

        if (!todoItemObject.description.trim()) {
            alert('내용을 입력해주세요..');
            return false;
        }

        if (!todoItemObject.dueDate.trim()) {
            alert('기한을 선택해주세요..');
            return false;
        }

        FIREBASE_DB.collection('list')
                .add({
                    title: todoItemObject.title.trim(),
                    description: todoItemObject.description.trim(),
                    dueDate: todoItemObject.dueDate.trim(),
                    done: false,
                    createdDate: moment(new Date()).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss')
                });

        isShow = false;

    };

    // delete
    const deleteListItem = (itemId) => {
        FIREBASE_DB.collection('list')
                .doc(itemId)
                .delete();
    };

    // update
    const updateListItem = (itemId) => {
        FIREBASE_DB.collection('list')
                .doc(itemId)
                .update({
                    name: '수정',
                    age: 50
                })
    };

    const checkValidation = (() => {

        const emojiValidation = (e) => {
            const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
            if (regex.test(e.target.value)) {
                e.target.value = e.target.value.replace(regex, '');
            }
        };

        const numberValidation = (e) => {
            console.log('zzz');
            if (e.keyCode != 8 && !(e.keyCode >= 48 && e.keyCode <= 57) && !(e.keyCode >= 96 && e.keyCode <= 105)) {
                e.preventDefault();
            }
        };

        return {
            emojiValidation,
            numberValidation,
        }

    })();

</script>

<main class="w-full bg-indigo-100">

    <section class="p-3">
        <h1 class="text-5xl text-indigo-800">TODO List</h1>
        <p class="text-2xl text-gray-700">
            TODAY { moment(new Date()).tz('Asia/Seoul').format('YYYY.MM.DD') }
        </p>
        <p class="text-lg text-red-600">
            There are a total of <span class="underline">{total}</span> tasks
        </p>
        <p class="text-lg text-indigo-600">
            There are <span class="underline">{doneCount}</span> tasks completed.
        </p>
        <p class="text-lg text-pink-600">
            There are <span class="underline">10</span> tasks beyond the due date.
        </p>
        <div class="flex items-center justify-end">
            <button class="bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-2 rounded shadow"
                    on:click={() => isShow = true }>
                TODO 추가
            </button>
        </div>
    </section>

    <section class="p-3">
        {#each list as listItem}
            <CardComponent item={listItem.data()}/>
        {/each}
    </section>

</main>

<!--<div class="w-full max-w-xs p-1">-->
<!--    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">-->
<!--        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">-->
<!--            name-->
<!--        </label>-->
<!--        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"-->
<!--               type="text" placeholder="ryan" bind:value={addName} on:keyup={checkValidation.emojiValidation}>-->
<!--    </div>-->
<!--    <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">-->
<!--        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">-->
<!--            age-->
<!--        </label>-->
<!--        <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"-->
<!--               type="text" placeholder="25" bind:value={addAge} on:keydown={checkValidation.numberValidation}>-->
<!--    </div>-->

<!--    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={createListItem}>-->
<!--        추가-->
<!--    </button>-->
<!--</div>-->

<div class="bg-gray-200">
    {#each list as listItem}
        <div>
            <p>{listItem.data().name}</p>
            <p>{listItem.data().age}</p>
            <button class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 rounded"
                    on:click={updateListItem(listItem.id)}>
                수정
            </button>
            <button class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 rounded"
                    on:click={deleteListItem(listItem.id)}>
                삭제
            </button>
        </div>
    {/each}
</div>


{#if isShow}
    <div transition:fade="{{delay: 0, duration: 250}}">
        <TodoFormModalComponent
                on:save={saveTodo}
                on:cancel={() => isShow = false}
        />
    </div>
{/if}

<style>


</style>