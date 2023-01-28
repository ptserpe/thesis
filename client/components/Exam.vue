<template>
    <tr tabindex="0" class="focus:outline-none h-16 border border-gray-100 rounded">
        <td class="">
            <div class="flex items-center pl-5">
                <p class="text-base font-medium leading-none text-gray-700 mr-2">{{ Exam }}</p>
            </div>
        </td>
        <td class="">
            <div class="flex items-center">
                <TagIcon class="h-5"/>
                <p class="text-sm leading-none text-gray-600 ml-2"> {{ Important }}</p>
            </div>
        </td>
        <td class="">
            <div class="flex items-center">
                <CalendarDaysIcon class="h-5"/>
            <button class="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 rounded">{{ DateTime }}</button>
            </div>
        </td>
        <td class="">
            <div class="flex items-center">
                <MapPinIcon class="h-5"/>
                <p class="text-sm leading-none text-gray-600 ml-2">{{ Place }}</p>
            </div>
        </td>
        <td class="">
            <div class="flex items-center">
                <PaperClipIcon class="h-5"/>
                <p class="text-sm leading-none text-gray-600 ml-2">{{ FileName }}</p>
            </div>
        </td>
    </tr>
</template>

<script setup lang="ts">

import {TagIcon, PaperClipIcon, MapPinIcon, CalendarDaysIcon} from '@heroicons/vue/24/outline'

const props =  defineProps(['exam', 'datetime', 'important', 'place', 'filename'])
const Exam = toRef(props, 'exam')
const DateTime = toRef(props, 'datetime')
const Important = toRef(props, 'important')
const Place = toRef(props, 'place')
const FileName = toRef(props, 'filename')

</script>