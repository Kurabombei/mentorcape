export class User {
	uid: string;
	email: string;
	displayName?: string;
	photoURL?: string;
	favoriteColor?: string;
	location?: string;
	age?: number;
	roles?: Array<string>;
	languages?: Array<string>;
	groupsID?: Array<string>;

	constructor() {
		this.uid = '';
		this.email = '';
		this.displayName = '';
		this.roles = ['student'];
		this.languages = [];
		this.groupsID = [];
	}
}
