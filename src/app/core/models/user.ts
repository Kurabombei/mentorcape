export class User {
	uid: string;
	email: string;

	isMentor: boolean;

	displayName?: string;
	position?: string;
	location?: string;
	photoURL?: string;
	age?: number;

	// Mentor details
	description?: string;
	categories?: Array<string>;
	industry?: string;
	role?: string;
	socialLink?: string;
	languages?: Array<string>;


	favoriteColor?: string;
	roles?: Array<string>;
	groupsID?: Array<string>;
	mentors?: Array<string>;
	students?: Array<string>;

	constructor() {
	}
}
