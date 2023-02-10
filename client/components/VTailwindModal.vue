<template>
    <vue-final-modal v-slot="{ params, close }" v-bind="$attrs" classes="flex justify-center items-center" :click-to-close="false"
        content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900">
        <h1 class="mr-8 font-bold">
            <slot name="title"></slot>
        </h1>
        <div class="flex-grow overflow-y-auto">
            <slot :params="params"></slot>
        </div>
        <div class="flex-shrink-0 flex justify-center items-center pt-4 px-4 py-3 text-right sm:px-6 ">
            <div
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-4">

                <button class="h-full w-full py-2 px-6" @click="$emit('confirm', close)">Save</button>
            </div>

            <div
                class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mx-4">

                <button class="h-full w-full py-2 px-5" @click="$emit('cancel', close)">Cancel</button>
            </div>
        </div>
    </vue-final-modal>
</template>

<script setup>

import { VueFinalModal } from "vue-final-modal";


defineEmits(['cancel', 'confirm'])
</script>