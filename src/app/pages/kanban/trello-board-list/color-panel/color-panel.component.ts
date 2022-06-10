import {Component, EventEmitter, OnInit, Output} from '@angular/core';

enum colors {
	BLUE = "#71deff",
	GREEN = "#36e9b6",
	ORANGE = "#e84e07",
	YELLOW = "#ffcf44",
	PURPLE = "#b15cff",
	PINK = "#ee158a",
	RED = "#e74a4a",
	GRAY = "gray",
}

@Component({
	selector: 'app-color-panel',
	templateUrl: './color-panel.component.html',
	styleUrls: ['./color-panel.component.scss']
})
export class ColorPanelComponent implements OnInit {
	@Output() emitColor: EventEmitter<string> = new EventEmitter();
	colorsData = Object.values(colors);

	constructor() {
	}

	ngOnInit(): void {
	}

	onColorEmit(color: string) {
		this.emitColor.emit(color);
	}
}
