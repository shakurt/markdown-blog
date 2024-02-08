<script setup lang="ts">
import UserForm from './UserForm.vue';
import { ref } from 'vue';
import { useUsers } from '@/stores/users';
import { NewUser } from '@/users';
import { useModal } from '@/composables/modal';

const users = useUsers();
const modal = useModal();
const error = ref('');

async function handleSignIp(newUser: NewUser) {
	// request
	const body = JSON.stringify(newUser);
	const res = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body,
	});

	// success -> authenticate(), hideModal
	if ([401, 404].includes(res.status)) {
		error.value = 'Username or password was incorrect.';
	} else {
		users.authenticate();
		modal.hideModal();
	}
	// fail -> 401,404 -> error
}
</script>

<template>
	<UserForm @submit="handleSignIp" :error="error" />
</template>
