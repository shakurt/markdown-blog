<script setup lang="ts">
import { usePosts } from '@/stores/posts';
import { useRoute } from 'vue-router';
import { useUsers } from '@/stores/users';
import { computed } from 'vue';

const postsStore = usePosts();
const route = useRoute();
const usersStore = useUsers();

const id = route.params.id as string;

const post = postsStore.all.get(id);

if (!post) {
	throw Error(`Post with id ${id} was not found`);
}

const canEdit = computed(() => {
	if (!usersStore.currentUserId || usersStore.currentUserId !== post.authorId) {
		return false;
	}

	return true;
});
</script>

<template>
	<div class="columns">
		<div class="column"></div>
		<div class="column is-two-thirds">
			<router-link
				v-if="canEdit"
				:to="`/posts/${post.id}/edit`"
				class="is-link button is-rounded"
				>Edit Post</router-link
			>
			<h1>{{ post.title }}</h1>
			<div v-html="post.html"></div>
		</div>
		<div class="column"></div>
	</div>
</template>
