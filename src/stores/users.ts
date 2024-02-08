import { defineStore } from 'pinia';
import { NewUser } from '@/users';

interface UserState {
	currentUserId: undefined | string;
}

export const useUsers = defineStore('users', {
	state: (): UserState => ({
		currentUserId: undefined,
	}),

	actions: {
		async authenticate() {
			try {
				const res = await fetch('/api/current-user', {
					headers: {
						'Content-Type': 'application/json',
					},
				});

				const result = await res.json();
				this.currentUserId = result.id;
			} catch (error) {
				this.currentUserId = undefined;
			}
		},

		async logout() {
			await fetch('/api/logout', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			return this.authenticate();
		},

		async createUser(newUser: NewUser) {
			const body = JSON.stringify(newUser);
			await fetch('/api/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body,
			});

			return this.authenticate();
		},
	},
});
