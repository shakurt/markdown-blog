<script setup lang="ts">
import { DateTime } from 'luxon';
import PostWriter from '@/components/PostWriter.vue';
import { Post, TimelinePost } from '@/posts';
import { useUsers } from '@/stores/users';
import { useRouter } from 'vue-router';
import { usePosts } from '@/stores/posts';

const usersStore = useUsers();
const router = useRouter();
const postsStore = usePosts();

if (!usersStore.currentUserId) {
	throw Error('User was not found');
}

const post: TimelinePost = {
	id: '-1',
	authorId: usersStore.currentUserId,
	title: 'Title',
	created: DateTime.now(),
	markdown: '## Title',
	html: '<h2>Title</h2>',
};

async function handleSubmit(post: Post) {
	await postsStore.createPost(post);
	router.push('/');
}
</script>

<template>
	<PostWriter :post="post" @submit="handleSubmit" />
</template>
