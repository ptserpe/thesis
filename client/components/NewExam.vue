<template>
    <vue-final-modal v-model="show" classes="flex justify-center items-center" :click-to-close="false"
        content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900">
        <h1 class="mr-8 font-bold">
            New Exam
        </h1>
        <div class="flex-grow overflow-y-auto">
            <div class="overflow-hidden">
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
                            v-model="examImportance">
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
                        <label for="last-name" class="block text-sm font-medium text-gray-700">File Attachment</label>
                        <div class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            v-if="file.name.length > 0">
                            <div>
                                <span>{{ file.name }}.{{ file.fileExtention }}</span>
                                <button class="ml-2" type="button" @click="remove()" title="Remove file">remove</button>
                            </div>
                        </div>
                        <div class="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                            @dragover="dragover" @dragleave="dragleave" @drop="drop">
                            <input type="file" multiple class="w-px h-px opacity-0 overflow-hidden absolute"
                                id="assetsFieldHandle" @change="onChange" accept=".pdf,.jpg,.jpeg,.png"
                                :key="fileInputKey" />
                            <label for="assetsFieldHandle" class="block cursor-pointer">
                                <div>
                                    Drag and drop files in here
                                    or <span class="underline">click here</span>.
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex-shrink-0 flex justify-center items-center pt-4 px-4 py-3 text-right sm:px-6 ">
            <div
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-4">

                <button class="h-full w-full py-2 px-6" @click="confirm">Save</button>
            </div>

            <div
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-4">

                <button class="h-full w-full py-2 px-5" @click="cancel">Cancel</button>
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup lang="ts">
import { TagIcon, PaperClipIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { VueFinalModal } from "vue-final-modal";

const props = defineProps(['modalExam'])

const fileInputKey = ref(0)


const examName = ref('')
const examDate = ref('')
const examImportance = ref('')
const examPlace = ref('')
const file = ref({
    fileHandle: <any>null,
    name: "",
    size: 0,
    type: "",
    fileExtention: "",
    url: <any>"",
})
const show = ref(false)
const modalExam = toRef(props, 'modalExam')
watch(modalExam, (value) => {
    console.log(value)
    if (value == undefined) {
        show.value = false
        reset()
        return
    }

    show.value = true
    if (value.date == undefined) {
        examDate.value = new Date().toLocaleString("el-GR", { year: 'numeric', month: 'numeric', day: 'numeric' })
    } else {
        examDate.value = value.date
    }

    examName.value = value.name
    examImportance.value = value.importance
    examPlace.value = value.place

    if (value.fileName != undefined) {
        file.value = {
            fileHandle: null,
            name: value.fileName,
            size: 0,
            type: "",
            fileExtention: "",
            url: "",
        }
    }
})

const emit = defineEmits(['done'])

const confirm = async () => {

    const formData = new FormData()
    formData.append('file', file.value.fileHandle)
    formData.append('exam', examName.value)
    formData.append('place', examPlace.value)
    formData.append('importance', examImportance.value)

    await $fetch("/api/history", {
        method: 'POST',
        body: formData
    })

    reset()
    emit('done', true)
}
const cancel = () => {
    const action = async () => { }
    reset()
    emit('done', false)
}

const reset = () => {
    examName.value = ''
    examDate.value = ''
    examImportance.value = ''
    examPlace.value = ''
    fileInputKey.value += 1
    file.value = {
        fileHandle: null,
        name: "",
        size: 0,
        type: "",
        fileExtention: "",
        url: "",
    }
}

const onChange = async (e: any) => {
    var files = e.target.files || e.dataTransfer.files;

    if (!files.length) {
        console.log("zero files length");
        return;
    }

    const newfile = files[0],
        // Get file size
        fileSize = Math.round((newfile.size / 1024 / 1024) * 100) / 100,
        // Get file extention
        fileExtention = newfile.name.split(".").pop(),
        // Get file name
        fileName = newfile.name.split(".").shift(),
        // Check if file is an image
        isSupported = ["jpg", "jpeg", "png", "pdf"].includes(fileExtention);

    if (!isSupported) {
        console.log("unsupported file type");
        return;
    }

    file.value = {
        fileHandle: newfile,
        name: fileName,
        size: fileSize,
        type: newfile.type,
        fileExtention: fileExtention,
        url: ""
    };
}

const remove = () => {
    file.value = {
        fileHandle: null,
        name: "",
        size: 0,
        type: "",
        fileExtention: "",
        url: "",
    }
}

const dragover = (e: any) => {
    e.preventDefault();

    if (!e.currentTarget.classList.contains('bg-green-300')) {
        e.currentTarget.classList.remove('bg-white');
        e.currentTarget.classList.add('bg-green-300');
    }
}

const dragleave = (e: any) => {
    e.currentTarget.classList.add('bg-white');
    e.currentTarget.classList.remove('bg-green-300');
}

const drop = (e: any) => {
    e.preventDefault();
    onChange(e);

    e.currentTarget.classList.add('bg-white');
    e.currentTarget.classList.remove('bg-green-300');
}

</script>
