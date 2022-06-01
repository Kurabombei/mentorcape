export class User {
	uid: string;
	email: string;

	isMentor: boolean;

	displayName?: string;
	position?: string;
	location?: string;
	photoURL?: string;
	age?: number;

	favoriteColor?: string;
	roles?: Array<string>;
	groupsID?: Array<string>;
	languages?: Array<string>;
	mentors?: Array<string>;
	students?: Array<string>;

	constructor() {
		this.uid = '';
		this.email = '';
		this.displayName = '';
		this.languages = [];
		this.mentors = [];
	}
}
