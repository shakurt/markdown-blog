<script setup lang="ts">
import FormInput from './FormInput.vue';
import { ref, computed } from 'vue';
import { NewUser } from '@/users';

defineProps<{
	error?: string;
}>();
const emit = defineEmits<(e: 'submit', payload: NewUser) => void>();

const username = ref('');
const password = ref('');

const isInvalid = computed(
	() => !(username.value !== '' && password.value !== '')
);

const handleSubmit = async () => {
	if (isInvalid.value) return;

	const newUser: NewUser = {
		username: username.value,
		password: password.value,
	};

	try {
		emit('submit', newUser);
	} catch (error) {
		console.log(error);
	}
};
</script>

<template>
	<form class="form" @submit.prevent="handleSubmit">
		<FormInput name="Username" v-model="username" type="text" />
		<FormInput name="Password" v-model="password" type="password" />
		<div v-if="error" class="is-danger help">
			{{ error }}
		</div>
		<button class="button" :disabled="isInvalid">Submit</button>
	</form>
</template>

<style scoped>
.form {
	background-color: white;
	padding: 30px;
	margin-top: 50px;
}
</style>
