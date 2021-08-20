<script>

    import {createEventDispatcher, onMount} from 'svelte';

    import moment from 'moment';
    import 'moment-timezone';

    import Close from "../icons/Close.svelte";
    import Datepicker from 'svelte-calendar/src/Components/Datepicker.svelte';

    const dispatchModule = (() => {

        const dispatch = createEventDispatcher();

        return {
            clickCancel: () => {
                dispatch('cancel');
            },

            clickSave: () => {

                if(id) {
                    dispatch('update', {
                        id : id,
                        title : title,
                        description : description,
                        dueDate : formattedSelected,
                        done : done,
                    });
                } else {
                    dispatch('save', {
                        title : title,
                        description : description,
                        dueDate : formattedSelected,
                        done : done,
                    });
                }

            },
        }

    })();

    const minDate = moment(new Date()).tz('Asia/Seoul').toDate();

    export let id = null;
    export let title = '';
    export let description = '';
    export let dueDate = '';
    export let done = false;

    let formattedSelected = null;

    onMount(() => {
        formattedSelected = dueDate || moment(new Date()).tz('Asia/Seoul').format('YYYY-MM-DD');
    });

    const format = (date) => {
        return moment(date).tz('Asia/Seoul').format('YYYY-MM-DD');
    };

    const daysOfWeek = [
        ['일요일', '일'],
        ['월요일', '월'],
        ['화요일', '화'],
        ['수요일', '수'],
        ['목요일', '목'],
        ['금요일', '금'],
        ['토요일', '토']
    ];

    const monthsOfYear = [
        ['1월', 'Jan(1월)'],
        ['2월', 'Feb(2월)'],
        ['3월', 'Mar(3월)'],
        ['4월', 'Apr(4월)'],
        ['5월', 'May(5월)'],
        ['6월', 'Jun(6월)'],
        ['7월', 'Jul(7월)'],
        ['8월', 'Aug(8월)'],
        ['9월', 'Sep(9월)'],
        ['10월', 'Oct(10월)'],
        ['11월', 'Nov(11월)'],
        ['12월', 'Dec(12월)']
    ];


</script>

<div class="modal-wrap">
    <div class="modal-header w-full flex flex-no-wrap items-center justify-between">
        <p class="font-bold text-xl text-gray-700">TODO 추가</p>
        <Close on:click={dispatchModule.clickCancel}/>
    </div>
    <div class="w-full flex flex-no-wrap">
        <form class="w-full">
            <div class="flex items-center border-b border-b-2 border-teal-500 py-2">
                <input class="appearance-none shadow border rounded w-full text-gray-700 py-3 px-3 leading-tight focus:outline-none"
                       type="text" placeholder="제목" bind:value={title}>
            </div>
            <div class="flex items-center py-2">
                <textarea
                          class="shadow border rounded w-full outline-none w-full text-gray-700 resize-y focus:outline-none focus:shadow-outline py-3 px-3"
                          rows="7" placeholder="내용" bind:value={description}></textarea>
            </div>
            <div class="py-2">
                <Datepicker start={minDate}
                            bind:formattedSelected
                            format={format}
                            daysOfWeek={daysOfWeek}
                            monthsOfYear={monthsOfYear}
                            buttonBackgroundColor='#38b2ac'
                            buttonTextColor='white'
                            dayHighlightedBackgroundColor='#61c8ff'
                            highlightColor='#61c8ff'
                            />
            </div>
            <hr class="my-8 border-b-2 border-gray-200">
            <div class="flex items-center justify-end py-2">
                <button class="outline-none bg-indigo-500 text-white font-semibold rounded-lg hover:bg-white hover:text-indigo-500 py-2 px-4 mr-2"
                        type="button" on:click={dispatchModule.clickSave}>
                    저장
                </button>
                <button class="outline-none bg-red-500 text-white font-semibold rounded-lg hover:bg-white hover:text-red-500 py-2 px-4"
                        type="button" on:click={dispatchModule.clickCancel}>
                    취소
                </button>
            </div>
        </form>
    </div>
</div>

<style>
    .modal-wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background-color: #e2e8f0;
        padding: 10px;
    }

</style>
