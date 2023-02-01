<template>
    <div class="overflow-hidden" v-if="!(pending)">
        <div class="flex flex-wrap flex-row bg-white px-4 py-5 sm:p-6">
            <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                <label for="first-name" class="block text-sm font-medium text-gray-700">Exam</label>
                <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="examName" />
            </div>

            <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Place</label>
                <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="examPlace" />
            </div>

            <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Importance</label>
                <select type="text" name="amka" id="amka"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="examimportance">
                    <option>Normal</option>
                    <option>Important</option>
                    <option>Urgent</option>
                </select>
            </div>

            <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                <label for="last-name" class="block text-sm font-medium text-gray-700">Date</label>
                <input type="text" name="nationality" id="nationality"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    v-model="examDate" />
            </div>

            <div class="basis-full md:px-3 md:mb-5">
                <label for="last-name" class="block text-sm font-medium text-gray-700">File Attachments</label>
                <div class="bg-gray-100 border border-gray-300" @dragover="dragover" @dragleave="dragleave"
                    @drop="drop">
                    <input type="file" multiple class="w-px h-px opacity-0 overflow-hidden absolute"
                        id="assetsFieldHandle" @change="onChange" ref="fl" accept=".pdf,.jpg,.jpeg,.png" />
                    <label for="assetsFieldHandle" class="block cursor-pointer">
                        <div>
                            Drag and drop files in here
                            or <span class="underline">click here</span> to select ones to upload.
                        </div>
                    </label>
                    <ul class="mt-4" v-if="filelist.length" v-cloak>
                        <li class="text-sm p-1" v-for="fl in filelist">
                            {{ fl.name }}
                            <button class="ml-2" type="button" @click="remove(filelist.indexOf(fl))"
                                title="Remove file">remove</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TagIcon, PaperClipIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['exam', 'datetime', 'important', 'place', 'filename'])
const Exam = toRef(props, 'exam')
const DateTime = toRef(props, 'datetime')
const Important = toRef(props, 'important')
const Place = toRef(props, 'place')
const FileName = toRef(props, 'filename')

const fl = ref()
const filelist = ref([])

const onChange = (e: any) => { console.log(e) }
const remove = (i: any) => { filelist.value.splice(i, 1) }
const dragover = (e: any) => {
    e.preventDefault();
    if (!e.currentTarget.classList.contains('bg-green-300')) {
        e.currentTarget.classList.remove('bg-gray-100');
        e.currentTarget.classList.add('bg-green-300');
    }
}
const dragleave = (e: any) => {
    e.currentTarget.classList.add('bg-gray-100');
    e.currentTarget.classList.remove('bg-green-300');
}
const drop = (e: any) => {
    e.preventDefault();
    console.log(e)
    // file.files = e.dataTransfer.files;
    onChange(); // Trigger the onChange event manually
    // Clean up
    e.currentTarget.classList.add('bg-gray-100');
    e.currentTarget.classList.remove('bg-green-300');
}


const show = ref(false)

const confirm = () => { show.value = false }
const cancel = () => { show.value = false }

</script>
