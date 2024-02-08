<script setup lang="ts">
import TimelineItem from '@/components/TimelineItem.vue';
import { usePosts } from '@/stores/posts';
import { periods } from '@/constants';

const postStore = usePosts();

await postStore.fetchPosts();
</script>

<template>
	<nav class="is-primary panel">
		<span class="panel-tabs">
			<a
				v-for="period of periods"
				:key="period"
				@click="postStore.setSelectedPeriod(period)"
				:class="{ 'is-active': postStore.selectedPeriod === period }"
				>{{ period }}</a
			>
		</span>

		<TimelineItem
			v-for="post of postStore.filteredPosts"
			:key="post.id"
			:post="post"
		/>
	</nav>
</template>
