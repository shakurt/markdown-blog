<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { Post, TimelinePost } from '@/posts';
import { marked } from 'marked';
import 'highlight.js/styles/atom-one-dark.css';
import hljs from 'highlight.js';
import { debounce } from 'lodash';
import { useUsers } from '@/stores/users';

const usersStore = useUsers();

const props = defineProps<{
	post: TimelinePost | Post;
}>();

const emit = defineEmits<(e: 'submit', post: Post) => void>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const contentEditable = ref<HTMLDivElement>();
const html = ref('');

function parseHtml(markdown: string) {
	marked.parse(
		markdown,
		{
			gfm: true,
			breaks: true,
			highlight: (code) => {
				return hljs.highlightAuto(code).value;
			},
		},
		(err, parseResult) => {
			if (err) throw Error(err);
			html.value = parseResult;
		}
	);
}

watch(() => content.value, debounce(parseHtml, 250), {
	immediate: true,
});

function handleInput() {
	if (!contentEditable.value) {
		throw Error('ContentEditable DOM node was not found');
	}
	content.value = contentEditable.value.innerText;
}

onMounted(() => {
	if (!contentEditable.value) {
		throw Error('ContentEditable DOM node was not found');
	}
	contentEditable.value.innerText = props.post.markdown;
});

const handleClick = async () => {
	if (!usersStore.currentUserId) {
		throw Error('User was not found');
	}
	const newPost: Post = {
		...props.post,
		created:
			typeof props.post.created === 'string'
				? props.post.created
				: (props.post.created.toISO() as string),
		title: title.value,
		authorId: usersStore.currentUserId,
		markdown: content.value,
		html: html.value,
	};
	emit('submit', newPost);
};
</script>

<template>
	<div class="columns">
		<div class="column">
			<div class="field">
				<div class="label">Post Title</div>
				<input type="text" class="input" v-model="title" />
			</div>
		</div>
	</div>
	<div class="columns">
		<div class="column">
			<div contenteditable ref="contentEditable" @input="handleInput" />
		</div>
		<div class="column">
			<div v-html="html" />
		</div>
	</div>
	<div class="columns">
		<div class="column">
			<button @click="handleClick" class="button is-primary is-pulled-right">
				Save Post
			</button>
		</div>
	</div>
</template>
