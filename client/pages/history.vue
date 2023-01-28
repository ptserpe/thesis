<template>
    <div class="bg-gray-800 h-full">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="w-full bg-white sm:rounded-md">
                <div class="flex flex-wrap flex-row px-4 py-5 sm:p-6">
                    <h1 class="font-bold">Personal Details</h1>
                </div>
                <div class="bg-white py-4 md:py-7 px-4 md:px-8 xl:px-10 rounded-b-md">
                    <!-- <div class="sm:flex items-center justify-between">
                        <div class="flex items-center">
                            <a class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
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
                            </a>
                        </div>
                        <button onclick="popuphandler(true)"
                            class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded">
                            <p class="text-sm font-medium leading-none text-white">Add Task</p>
                        </button>
                    </div> -->
                    <div class="overflow-x-auto">
                        <table class="w-full whitespace-nowrap">
                            <tbody>
                                <Exam exam="exam" important="urgent" datetime="dateeee" place="skatoules" filename="edw" />
                                <tr class="h-3"></tr>
                               
                                <Exam/>
                                <tr class="h-3"></tr>
                                
                                <Exam/>
                                <tr class="h-3"></tr>
                                
                                <Exam/>
                                <tr class="h-3"></tr>
                                
                                <Exam/>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "component",
    data() {
        return {
            show: null
        };
    },
    methods: {
    },
    mounted() { },
};
</script>

<style>
.checkbox:checked+.check-icon {
    display: flex;
}
</style>    
