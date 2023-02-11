<template>
    <vue-final-modal v-model="show" classes="flex justify-center items-center" :click-to-close="false"
        content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900">
        <h1 class="mr-8 font-bold">
            {{ examAction }}
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
                            <div class="flex">
                                <span v-if="file.fileHandle != null">{{ file.name }}.{{ file.fileExtention }}</span>
                                <a :href="'api/file/' + file.name" target="_blank"
                                    v-if="file.fileHandle == null && file.name != ''">{{
                                        file.name
                                    }}</a>
                                <div class="flex flex-row-reverse ">
                                    <button class="h-full ml-4" type="button" @click="remove()" title="Remove file">
                                        <TrashIcon class="h-5" />
                                    </button>
                                </div>
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

                <button :disabled="saveDisabled" class="h-full w-full py-2 px-6 disabled:opacity-20"
                    @click="confirm">Save</button>
            </div>

            <div
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-4">

                <button class="h-full w-full py-2 px-5" @click="cancel">Cancel</button>
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup lang="ts">
import { TrashIcon } from '@heroicons/vue/24/outline'
import { VueFinalModal } from "vue-final-modal";
import moment from 'moment';

const props = defineProps(['modalExam'])

const fileInputKey = ref(0)

const convertDate = (d: string) => {
    let m = moment(d, "DD/MM/YYYY")
    if (!m.isValid()) {
        console.log(d)
        m = moment(d)
        if (!m.isValid()) {
            return undefined
        }
        return m.toISOString()
    }

    return m.toISOString()
}

const examAction = ref('')
const saveDisabled = ref(true)
const toggleSaveButton = () => {
    const nonEmptyFields = examDate.value != '' && examDate.value != undefined &&
        examImportance.value != '' && examImportance.value != undefined &&
        examName.value != '' && examName.value != undefined

    const noChanges = convertDate(examDate.value) == convertDate(props.modalExam?.date) && 
        examPlace.value == props.modalExam?.place &&
        examImportance.value == props.modalExam?.importance &&
        examName.value == props.modalExam?.name &&
        file.value.name == props.modalExam?.fileName

    saveDisabled.value = !nonEmptyFields || noChanges
}
const examId = ref(undefined)
const examName = ref('')
watch(examName, (v) => {
    toggleSaveButton()
})
const examDate = ref('')
watch(examDate, (v) => {
    toggleSaveButton()
})
const examImportance = ref('')
watch(examImportance, (v) => {
    toggleSaveButton()
})

const examPlace = ref('')
watch(examPlace, (v) => {
    toggleSaveButton()
})

const file = ref({
    fileHandle: <any>null,
    name: "",
    size: 0,
    type: "",
    fileExtention: "",
    url: <any>"",
})
watch(file, (v) => {
    toggleSaveButton()
})

const show = ref(false)
const modalExam = toRef(props, 'modalExam')
watch(modalExam, (value) => {
    if (value == undefined) {
        show.value = false
        reset()
        return
    }

    show.value = true
    if (value.date == undefined) {
        examDate.value = new Date().toLocaleString("el-GR", { year: 'numeric', month: 'numeric', day: 'numeric' })
    } else {
        examDate.value = new Date(value.date).toLocaleString("el-GR", { year: 'numeric', month: 'numeric', day: 'numeric' })
    }

    if (value.id != undefined) {
        examId.value = value.id
        examAction.value = 'Edit Exam'
        examImportance.value = value.importance
    } else {
        examId.value = undefined
        examAction.value = 'New Exam'
        examImportance.value = 'Normal'
    }

    examName.value = value.name
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
    formData.append('fileName', file.value.name)
    formData.append('exam', examName.value)
    formData.append('place', examPlace.value)
    formData.append('date', convertDate(examDate.value))
    formData.append('importance', examImportance.value)
    if (examId.value != undefined) {
        formData.append('id', examId.value)
    }

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
    examId.value = undefined
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
