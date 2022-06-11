export interface Board {
	id?: string;
	title?: string;
	priority?: number;
	tasks?: Task[];
}

export interface Task {
	description?: string;
	label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}

export interface Comment {
	id: number,
	uid: string,
	text: string,
}

export interface Card {
	id: number,
	description: string,
	label?: string,
	like?: number,
	comments?: Array<Comment>
}

export interface Column {
	id: string,
	uid: string,
	title: string,
	color: string,
	priority?: number;
	tasks: Card[]
}
