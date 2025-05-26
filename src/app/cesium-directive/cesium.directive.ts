import {Directive, ElementRef} from "@angular/core";
// Cesium imports (Cartesian3, Viewer, etc.) are removed as they are no longer used directly in this directive.

// This directive handles the integration of CesiumJS map into Angular applications.
// It is currently a placeholder as its primary functionalities have been moved to CesiumService.
// It's kept for now because it's referenced in map.component.html.
@Directive({
    selector: "[cesiumDirective]",
    standalone: true
})
export class CesiumDirective {
    // Properties topLeft and bottomRight have been removed.
    // Methods createRectangle, calculateArea, and clearArea have been removed.

    constructor(private el: ElementRef) {
        // The ElementRef might be used for other purposes in the future,
        // or this directive might be expanded with UI-specific logic
        // not suitable for CesiumService.
    }

    // Future directive-specific methods could be added here.
    // For example, methods that manipulate the host element (this.el)
    // or handle UI events not directly related to Cesium map logic.
}