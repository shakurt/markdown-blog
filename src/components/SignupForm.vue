<script setup lang="ts">
import UserForm from './UserForm.vue';
import { useUsers } from '@/stores/users';
import { NewUser } from '@/users';
import { useModal } from '@/composables/modal';

const users = useUsers();
const modal = useModal();

async function handleSignUp(newUser: NewUser) {
	await users.createUser(newUser);
	modal.hideModal();
}
</script>

<template>
	<UserForm @submit="handleSignUp" />
</template>
