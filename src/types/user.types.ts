export interface User {
	id: number;
	email: string;
	isActivated: boolean;
	name: string;
	roles: Role[];
}

enum Role {
	USER,
	ADMIN,
	MODERATOR
}
