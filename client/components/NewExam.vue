<template>
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
                    <!-- <ul v-cloak>
                            <li class="text-sm p-1" v-for="fl in filelist">
                                {{ fl.name }}.{{ fl.fileExtention }}
                               
                            </li>
                        </ul> -->
                </div>
                <div class="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm border p-2"
                    @dragover="dragover" @dragleave="dragleave" @drop="drop">
                    <input type="file" multiple class="w-px h-px opacity-0 overflow-hidden absolute"
                        id="assetsFieldHandle" @change="onChange" accept=".pdf,.jpg,.jpeg,.png" :key="fileInputKey" />
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
</template>

<script setup lang="ts">
import { TagIcon, PaperClipIcon, MapPinIcon, CalendarDaysIcon } from '@heroicons/vue/24/outline'
import { onUnmounted } from 'vue';

const props = defineProps(['exam', 'datetime', 'important', 'place', 'filename'])

const fileInputKey = ref(0)

const examName = ref('')
const examNameProps = toRef(props, 'exam')
watch(examNameProps, (value) => {
    examName.value = value;
});

const examDate = ref('')
const examDateProps = toRef(props, 'datetime')
watch(examDateProps, (value) => {
    examDate.value = value;
});


const examImportance = ref('')
const examImportanceProps = toRef(props, 'datetime')
watch(examImportanceProps, (value) => {
    examImportance.value = value;
});

const examPlace = ref('')
const examPlaceProps = toRef(props, 'place')
watch(examPlaceProps, (value) => {
    examPlace.value = value;
});

const Reset = () => {
    examName.value = ''
    examDate.value = ''
    examImportance.value = ''
    examPlace.value = ''
}

const file = ref({
    fileHandle: <any>null,
    name: "",
    size: 0,
    type: "",
    fileExtention: "",
    url: <any>"",
})

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

    let formData = new FormData()
    formData.append('file', newfile)
    formData.append('exam', examName.value)
    formData.append('place', examPlace.value)
    formData.append('importance', examImportance.value)

    await $fetch("/api/history", {
        method: 'POST',
        body: formData
    })

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
