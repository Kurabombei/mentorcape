import {Component, EventEmitter, OnInit, Output} from '@angular/core';

enum colors {
	MANUAL = "rgba(113,222,255,0.9)",
	SUCCESS = "rgba(54,233,182,0.9)",
	WARNING = "rgba(232,78,7,0.9)",
	INVESTIGATE = "rgba(213,181,0,0.8)",
	CURIOUS = "rgba(177,92,255,0.9)",
	COSMETICS = "rgba(238,21,138,0.9)",
	BUGS = "rgba(231,74,74,0.9)",
	DISABLED = "rgba(138,138,138,0.9)",
}

@Component({
	selector: 'app-color-panel',
	templateUrl: './color-panel.component.html',
	styleUrls: ['./color-panel.component.scss']
})
export class ColorPanelComponent implements OnInit {
	@Output() emitColor: EventEmitter<string> = new EventEmitter();
	colorsData = Object.entries(colors);

	constructor() {
	}

	ngOnInit(): void {
	}

	onColorEmit(color: string) {
		this.emitColor.emit(color);
	}
}
