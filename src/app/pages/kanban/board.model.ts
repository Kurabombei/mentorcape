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
	text: string,
}

export interface Card {
	id: number,
	text: string,
	like: number,
	comments: Comment[]
}

export interface Column {
	id: number,
	title: string,
	color: string,
	list: Card[]
}
