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
                        <button @click="showModalExam(undefined, undefined, undefined, undefined, undefined, undefined)"
                            class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded mb-4">
                            <p class="text-sm font-medium leading-none text-white">New Exam</p>
                        </button>
                    </div>
                    <div class="flex items-center pl-5 justify-items-center place-content-center mt-10 mb-5" v-if="!showList">
                        <ExclamationCircleIcon class="h-5 mr-1" />
                        <p class="text-sm leading-none text-gray-600 ml-2">No exams found. Click "New Exam" to add one.</p>
                    </div>
                    <div class="overflow-x-auto" v-if="showList">
                        <table class="w-full table-auto">
                            <thead class="focus:outline-none h-16 border border-gray-100 rounded bg-gray-100">
                                <tr>
                                    <th class="">
                                        <div class="flex items-center grow text-base font-medium pl-5">
                                            <NewspaperIcon class="h-5 mr-1" />
                                            Name
                                        </div>
                                    </th>
                                    <th>
                                        <div class="flex items-center text-base font-medium">
                                            <TagIcon class="h-5 mr-1" />
                                            Flag
                                        </div>
                                    </th>
                                    <th>
                                        <div class="flex items-center text-base font-medium">
                                            <CalendarDaysIcon class="h-5  mr-1" />
                                            Date
                                        </div>
                                    </th>
                                    <th>
                                        <div class="flex items-center text-base font-medium">
                                            <MapPinIcon class="h-5  mr-1" />
                                            Place
                                        </div>
                                    </th>
                                    <th>
                                        <div class="flex items-center text-base font-medium">
                                            <PaperClipIcon class="h-5  mr-1" />
                                            Attachement
                                        </div>
                                    </th>
                                    <th>
                                        <div class="flex  flex-row-reverse  text-base font-medium mr-4 items-center">
                                            <EllipsisVerticalIcon class="h-5  mr-1" />
                                            Actions
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in examItems" tabindex="0"
                                    class="focus:outline-none h-16 border border-gray-100 rounded">
                                    <td class="">
                                        <div class="flex items-center pl-5">
                                            <p class="text-sm leading-none text-gray-700 mr-2">{{
                                                item.exam
                                            }}
                                            </p>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex items-center">
                                            <p class="text-sm leading-none text-gray-600 ml-2"> {{ item.importance }}
                                            </p>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex items-center">
                                            <button
                                                class="py-3 px-3 text-sm focus:outline-none leading-none text-red-700 rounded">{{
                                                    new Date(item.date!).toLocaleString("el-GR", {
                                                        year: 'numeric', month:
                                                            'numeric', day: 'numeric'
                                                    })
                                                }}</button>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex items-center">
                                            <p class="text-sm leading-none text-gray-600 ml-2">{{ item.place }}</p>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex items-center">
                                            <span class="text-sm leading-none text-gray-600 ml-2">
                                                <a :href="'api/file/' + item.filePath" target="_blank">{{
                                                    item.fileName
                                                }}</a>
                                            </span>
                                        </div>
                                    </td>
                                    <td class="">
                                        <div class="flex flex-row-reverse ">
                                            <button class="h-full mr-8"
                                                @click="showModalExam(item.id, item.place, item.exam, item.importance, item.fileName, item.date)">
                                                <ArrowsPointingOutIcon class="h-5" />
                                            </button>
                                            <button class="h-full mr-4" @click="deleteExam(item.id)">
                                                <TrashIcon class="h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="h-3"></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ExclamationCircleIcon, NewspaperIcon, EllipsisVerticalIcon, ArrowsPointingOutIcon, TrashIcon, TagIcon, PaperClipIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'

interface UserExam {
    id: string;
    exam: string;
    importance?: string;
    place?: string;
    date?: string;
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

const showList = ref(false)

const { data: examItems, pending, refresh, error } = await useFetch<UserExam[]>('/api/history', {
    method: 'GET',
    server: false
})

watch(examItems, (value) => {
    showList.value = value != null && value[0] != undefined
})

const deleteExam = async (examId: string) => {
    await $fetch('/api/history', {
        method: 'DELETE',
        body: {
            id: examId
        }
    })
    refresh()
}

const showModalExam = (examId: string | undefined, examPlace: string | undefined, examName: string | undefined, examImportance: string | undefined, examFileName: string | undefined, examDate: string | undefined) => {

    modalExam.value = {
        id: examId,
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
