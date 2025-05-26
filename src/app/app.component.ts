import {Component, Input} from "@angular/core";
import {CesiumModule} from "./app.module";
import {ButtonComponent} from "./button-component/button.component";
import {CommonModule} from "@angular/common";
import {MapComponent} from "./map-component/map.component";

@Component({
    selector: "app-root", // The root component of the application.
    standalone: true, // Marks this component as standalone, managing its own dependencies.
    imports: [CommonModule, CesiumModule, ButtonComponent, MapComponent], // Specifies necessary modules and components for this component.
    templateUrl: "./app.component.html", // Path to the component's HTML template.
})
export class AppComponent {
    @Input() area: string | undefined; // Holds the calculated area or an error/status message to be displayed.
    public isError: boolean = false; // Flag to indicate if the current 'area' message is an error, for UI styling.
    // Stores the specific error message string for area calculation failure to enable accurate error checking.
    private readonly areaCalculationErrorMessage = "Please draw a rectangle on the map first by clicking two points.";

    constructor() {
        // Constructor logic can be added here if needed for initialization.
    }

    // Updates the 'area' property with a new message (area value or error) and sets the 'isError' flag accordingly.
    // This method is called by child components (e.g., ButtonComponent) to update the UI.
    setArea(message: string | undefined) { // Accepts string or undefined to handle message clearing.
        if (message === undefined || message === "") {
            this.area = ""; // Clears the displayed message.
            this.isError = false; // Resets the error state.
        } else if (message === this.areaCalculationErrorMessage) {
            this.area = message;
            this.isError = true;
        } else {
            this.area = message;
            this.isError = false;
        }
    }
}
