<template>
    <vue-final-modal v-slot="{ params, close }" v-bind="$attrs" classes="flex justify-center items-center"
        content-class="relative flex flex-col max-h-full mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900">
        <span class="mr-8 text-2xl font-bold">
            <slot name="title"></slot>
        </span>
        <div class="flex-grow overflow-y-auto">
            <slot :params="params"></slot>
        </div>
        <div class="flex-shrink-0 flex justify-center items-center pt-4">
            <button class="vfm-btn h-full w-full py-2 px-4" @click="$emit('confirm', close)">Save</button>
            <button class="vfm-btn h-full w-full py-2 px-4" @click="$emit('cancel', close)">Cancel</button>
        </div>
    </vue-final-modal>
</template>

<script setup>

import { VueFinalModal } from "vue-final-modal";


defineEmits(['cancel', 'confirm'])
</script>