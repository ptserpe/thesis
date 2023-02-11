<script setup lang="ts">
import { time } from 'console';


interface UserProfile {
    email: string;
    lastName: string;
    firstName: string;
    amka: string
    age: number;
    phone: string;
    nationality: string;
    gender: boolean;
    weight: number;
    height: number;
    id: string;
}

let savedValues = {
    amka: undefined,
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    gender: undefined,
    age: undefined,
    height: undefined,
    weight: undefined,
    phone: undefined,
    nationality: undefined
}
const saveDisabled = ref(true)
const toggleSaveButton = () => {
    const nonEmptyFields = firstName.value != '' && firstName.value != undefined &&
        lastName.value != '' && lastName.value != undefined &&
        email.value != '' && email.value != undefined &&
        amka.value != '' && amka.value != undefined &&
        phone.value != '' && phone.value != undefined

    const noChanges = firstName.value == savedValues.firstName &&
        amka.value == savedValues.amka &&
        lastName.value == savedValues.lastName &&
        email.value == savedValues.email &&
        gender.value == savedValues.gender &&
        age.value == savedValues.age &&
        height.value == savedValues.height &&
        weight.value == savedValues.weight &&
        phone.value == savedValues.phone &&
        nationality.value == savedValues.nationality

    saveDisabled.value = !nonEmptyFields || noChanges
}

const firstName = ref();
watch(firstName, (v) => {
    toggleSaveButton()
})

const lastName = ref();
watch(lastName, (v) => {
    toggleSaveButton()
})

const amka = ref();
watch(amka, (v) => {
    toggleSaveButton()
})

const gender = ref();
watch(gender, (v) => {
    toggleSaveButton()
})

const email = ref();
watch(email, (v) => {
    toggleSaveButton()
})

const age = ref();
watch(age, (v) => {
    toggleSaveButton()
})

const height = ref();
watch(height, (v) => {
    toggleSaveButton()
})

const weight = ref();
watch(weight, (v) => {
    toggleSaveButton()
})

const phone = ref();
watch(phone, (v) => {
    toggleSaveButton()
})

const nationality = ref();
watch(nationality, (v) => {
    toggleSaveButton()
})

const refreshing = ref();

async function postProfile(data: any) {

    refreshing.value = true

    try {
        await $fetch('/api/profile', {
            method: 'POST',
            body: {
                firstName: firstName.value,
                email: email.value,
                lastName: lastName.value,
                age: age.value,
                amka: amka.value,
                gender: gender.value,
                height: height.value,
                weight: weight.value,
                phone: phone.value,
                nationality: nationality.value
            }
        });

        savedValues = {
            amka: amka.value,
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            gender: gender.value,
            age: age.value,
            height: height.value,
            weight: weight.value,
            phone: phone.value,
            nationality: nationality.value
        }

        toggleSaveButton()
    } catch (e) {
        console.log(e)
    } finally {
        refreshing.value = false
    }
}

useHead({
    titleTemplate: 'Healthcare',
    bodyAttrs: {
        class: 'h-full'
    }
})

const { pending, data: profile } = await useFetch<UserProfile>('/api/profile', {
    method: 'GET',
    server: false
})
watch(profile, (newProfile) => {
    if (!newProfile) {
        return
    }

    savedValues = {
        amka: newProfile.amka,
        firstName: newProfile.firstName,
        lastName: newProfile.lastName,
        email: newProfile.email,
        gender: newProfile.gender,
        age: newProfile.age,
        height: newProfile.height,
        weight: newProfile.weight,
        phone: newProfile.phone,
        nationality: newProfile.nationality
    }

    amka.value = newProfile.amka
    firstName.value = newProfile.firstName
    lastName.value = newProfile.lastName
    email.value = newProfile.email
    gender.value = newProfile.gender
    age.value = newProfile.age
    height.value = newProfile.height
    weight.value = newProfile.weight
    phone.value = newProfile.phone
    nationality.value = newProfile.nationality
})


</script>


<template>
    <div class="bg-gray-800 h-full">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="w-full bg-white sm:rounded-md">
                <Spinner class="place-content-center p-10" v-if="pending" />
                <div class="overflow-hidden" v-if="!(pending)">
                    <div class="flex flex-wrap flex-row px-4 py-5 sm:p-6">
                        <h1 class="font-bold">Personal Details</h1>
                    </div>
                    <div class="flex flex-wrap flex-row bg-white px-4 py-5 sm:p-6">
                        <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                            <label for="first-name" class="block text-sm font-medium text-gray-700">First name</label>
                            <input type="text" name="first-name" id="first-name" autocomplete="given-name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="firstName" />
                        </div>

                        <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Last name</label>
                            <input type="text" name="last-name" id="last-name" autocomplete="family-name"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="lastName" />
                        </div>

                        <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">AMKA</label>
                            <input type="text" name="amka" id="amka"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="amka" />
                        </div>

                        <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Nationality</label>
                            <input type="text" name="nationality" id="nationality"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="nationality" />
                        </div>

                        <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                            <label for="email-address" class="block text-sm font-medium text-gray-700">Email
                                address</label>
                            <input type="text" name="email-address" id="email-address" autocomplete="email"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="email" />
                        </div>

                        <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                            <label for="email-address" class="block text-sm font-medium text-gray-700">Phone</label>
                            <input type="text" name="phone" id="phone" autocomplete="phone"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="phone" />
                        </div>

                        <div class="basis-full md:basis-1/2 md:px-3 md:mb-5">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Gender</label>
                            <select id="country" name="country" autocomplete="country-name"
                                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                v-model="gender">
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div class="flex flex-wrap flex-row bg-white px-4 py-5 sm:p-6">
                        <div class="basis-full md:basis-1/3 md:px-3 md:mb-5">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Height</label>
                            <input type="text" name="height" id="height" autocomplete="height"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="height" />
                        </div>
                        <div class="basis-full md:basis-1/3 md:px-3 md:mb-5">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Weight</label>
                            <input type="text" name="weight" id="weight" autocomplete="weight"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="weight" />
                        </div>
                        <div class="basis-full md:basis-1/3 md:px-3 md:mb-5">
                            <label for="last-name" class="block text-sm font-medium text-gray-700">Age</label>
                            <input type="text" name="age" id="age" autocomplete="age"
                                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                v-model="age" />
                        </div>
                    </div>
                    <div class="bg-gray-200 px-4 py-3 text-right sm:px-6 rounded-b-md">
                        <div
                            class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            <Spinner v-if="refreshing" />
                            <button :disabled="saveDisabled" class="h-full w-full py-2 px-4 disabled:opacity-20"
                                @click="postProfile" v-if="!refreshing">Save</button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>