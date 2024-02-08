<script lang="ts" setup>
defineProps<{ name: string; modelValue: string; type: string }>();

const emit = defineEmits<(e: 'update:modelValue', value: string) => void>();

const handleInput = (e: Event) => {
	const value = (e.target as HTMLInputElement).value;
	emit('update:modelValue', value);
};
</script>

<template>
	<div class="field">
		<label :for="name" class="label">{{ name }}</label>
		<div class="control">
			<input
				:type="type"
				:id="name"
				:name="name"
				class="input"
				:value="modelValue"
				@input="handleInput"
			/>
		</div>
	</div>
</template>

<!-- VUELIDATE -->
