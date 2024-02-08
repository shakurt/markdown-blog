<script setup lang="ts">
import { useModal } from '@/composables/modal';
import { useUsers } from '@/stores/users';
import { useRouter } from 'vue-router';

const modal = useModal();
const users = useUsers();
const router = useRouter();

async function logout() {
	users.logout();
	router.push('/');
}
</script>

<template>
	<div class="navbar">
		<div class="navbar-end">
			<div v-if="users.currentUserId" class="buttons">
				<button class="button" @click="logout">Log Out</button>
				<RouterLink to="/posts/new" class="button">New Post</RouterLink>
			</div>

			<div v-else class="buttons">
				<button class="button" @click="modal.showModal('signUp')">
					Sign Up
				</button>
				<button class="button" @click="modal.showModal('signIn')">
					Sign In
				</button>
			</div>
		</div>
	</div>

	<Teleport to="#modal">
		<component :is="modal.component.value" />
	</Teleport>
</template>
