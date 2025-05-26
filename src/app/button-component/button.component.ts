import {Component, ElementRef, EventEmitter, Input, Output} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CesiumService, CalculateAreaResult} from "../cesium-service/cesium.service";

@Component({
    selector: "app-button",
    standalone: true, // Marks this component as standalone, managing its own dependencies.
    imports: [CommonModule],
    templateUrl: "./button.component.html"

})
export class ButtonComponent {

    @Input() title: string | undefined; // Input property for the button's display title and action identifier.
    @Output() newAreaEvent = new EventEmitter<string>(); // Emits events related to area calculation or clearing.

    private cesiumService: CesiumService;  // Service for interacting with Cesium map functionalities.

    // Constructor for ButtonComponent.
    // Initializes the component with CesiumService.
    // The 'title' is an @Input property and will be set by Angular.
    constructor(private cesiumService: CesiumService) { // Removed ElementRef as it's no longer used.
        // this.title = elementRef.nativeElement.getAttribute('title'); // This line is now removed.
        this.cesiumService = cesiumService;
    }

    // Handles click events on the button and calls the appropriate CesiumService function
    // based on the button's title.
    callMapFunction($event: MouseEvent) {
        if (this.title === "Calculate Area") { // Check against the specific title for "Calculate Area"
            const result: CalculateAreaResult = this.cesiumService.calculateArea();
            if (result.area !== undefined) {
                this.newAreaEvent.emit(result.area); // Emit the calculated area.
            } else if (result.error !== undefined) {
                this.newAreaEvent.emit(result.error); // Emit the error message.
            }
        } else if (this.title === "Clear Area") { // Check against the specific title for "Clear Area"
            this.cesiumService.clearArea();
            this.newAreaEvent.emit(""); // Emit an empty string to signal clearing the area display.
        }
    }
}
