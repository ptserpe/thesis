<template>
    <div>
        <NewExam :modalExam="modalExam" @done="done" />
    </div>
    <div class="bg-gray-800 h-full">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="w-full bg-white sm:rounded-md">
                <div class="flex flex-wrap flex-row px-4 py-5 sm:p-6">
                    <h1 class="font-bold">Health Exams</h1>
                </div>
                <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 rounded-b-md">
                    <div class="sm:flex items-center justify-between">
                        <div class="flex items-center">
                            <!-- <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                                href=" javascript:void(0)">
                                <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                                    <p>All</p>
                                </div>
                            </a>
                            <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                                href="javascript:void(0)">
                                <div
                                    class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                    <p>Done</p>
                                </div>
                            </a>
                            <a class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                                href="javascript:void(0)">
                                <div
                                    class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                                    <p>Pending</p>
                                </div>
                            </a> -->
                        </div>
                        <button @click="showModalExam(undefined, undefined, undefined, undefined, undefined)"
                            class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded mb-4">
                            <p class="text-sm font-medium leading-none text-white">New Exam</p>
                        </button>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full whitespace-nowrap">
                            <tbody>
                                <tr v-for="item in examItems"  tabindex="0" class="focus:outline-none h-16 border border-gray-100 rounded">
                                    <td class="">
                                        <div class="flex items-center pl-5">
                                            <p class="text-base font-medium leading-none text-gray-700 mr-2">{{ item.exam }}
                                            </p>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex items-center">
                                            <TagIcon class="h-5" />
                                            <p class="text-sm leading-none text-gray-600 ml-2"> {{ item.importance }}</p>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex items-center">
                                            <CalendarDaysIcon class="h-5" />
                                            <button
                                                class="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 rounded">{{
                                                    new Date(item.creationDate).toLocaleString("el-GR", {
                                                        year: 'numeric', month:
                                                            'numeric', day: 'numeric'
                                                    })
                                                }}</button>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex items-center">
                                            <MapPinIcon class="h-5" />
                                            <p class="text-sm leading-none text-gray-600 ml-2">{{ item.place }}</p>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex items-center">
                                            <PaperClipIcon class="h-5" />
                                            <p class="text-sm leading-none text-gray-600 ml-2">{{ item.fileName }}</p>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div>
                                            <button class="h-full w-full py-2 px-4 " @click="showModalExam(item.place, item.exam, item.importance, item.fileName, item.creationDate)">View</button>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="h-3"></tr>
                                <!-- <td class="overflow-y-hidden">
                                    <div class="flex items-center pl-5"
                                        v-if="examItems == null || examItems.length == 0">
                                        <p class="text-sm leading-none text-gray-600 ml-2">No exams</p>
                                    </div>
                                </td> -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TagIcon, PaperClipIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'

interface UserExam {
    id: string;
    exam: string;
    importance?: string;
    place?: string;
    fileName?: string;
    filePath?: string;
    creationDate: string
}

useHead({
    titleTemplate: 'Healthcare',
    bodyAttrs: {
        class: 'h-full'
    }
})

const modalExam = ref()

const { data: examItems, pending, refresh, error } = await useFetch<UserExam[]>('/api/history', {
    method: 'GET',
    server: false
})

const showModalExam = (examPlace: string | undefined, examName: string | undefined, examImportance: string | undefined, examFileName: string | undefined, examDate: string | undefined) => {

    modalExam.value = {
        place: examPlace,
        name: examName,
        date: examDate,
        importance: examImportance,
        fileName: examFileName,
    }
}

const done = async (update: boolean) => {
    if (update) {
        refresh()
    }
    modalExam.value = undefined
}


</script>
