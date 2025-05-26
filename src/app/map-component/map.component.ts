import {Component, ElementRef, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {Cartesian3, ScreenSpaceEventType, Viewer} from "cesium";
import {CesiumService} from "../cesium-service/cesium.service";

@Component({
    selector: "cesium-map",
    standalone: true,
    imports: [CommonModule],
    templateUrl: "./map.component.html",
    styleUrl: "./map.component.css"
})
export class MapComponent implements OnInit {
    private viewer!: Viewer; // The Cesium Viewer instance. Definite assignment in ngOnInit.
    private isFirstPointClicked = false; // Flag to track whether the next click is for the first or second point of the rectangle.
    private cesiumService: CesiumService; // Service for Cesium map interactions.

    constructor(private el: ElementRef, private cesiumService: CesiumService) {
        this.cesiumService = cesiumService; // Initialize the CesiumService instance.
    }

    // Angular lifecycle hook that is called after data-bound properties of a directive are initialized.
    ngOnInit(): void {
        this.initCesium(); // Initialize the Cesium viewer and related event handlers.
    }

    // Initializes the Cesium Viewer instance and sets up interaction handlers.
    public initCesium(): void {
        this.viewer = new Viewer(this.el.nativeElement, { // Creates the Cesium Viewer attached to the component's host element.
            timeline: false, // Disables the timeline widget.
            fullscreenButton: false, // Disables the fullscreen button.
            animation: false, // Disables the animation widget.
        });
        this.setupClickEvent(); // Sets up the handler for map click events.
    }

    // Configures the screen space event handler for left clicks on the map
    // to capture coordinates for defining a rectangle.
    setupClickEvent(): void {
        this.viewer.screenSpaceEventHandler.setInputAction((clickEvent: any) => { // clickEvent is of type ScreenSpaceEventHandler.PositionedEvent
            const clickedPosition = clickEvent.position; // The 2D screen position of the click.

            if (clickedPosition) {
                const cartesian = this.viewer.scene.camera.pickEllipsoid(
                    clickedPosition,
                    this.viewer.scene.globe.ellipsoid
                );

                if (cartesian) {
                    if (!this.isFirstPointClicked) {
                        // This is the first click, set the first corner of the rectangle.
                        this.cesiumService.setFirstPoint(cartesian);
                        this.isFirstPointClicked = true;
                    } else {
                        // This is the second click, set the second corner and create the rectangle.
                        this.cesiumService.setSecondPointAndCreateRectangle(cartesian, this.viewer);
                        this.isFirstPointClicked = false; // Reset flag for the next rectangle drawing operation.
                    }
                } else {
                    console.warn("Unable to obtain world coordinates from click.");
                }
            }
        }, ScreenSpaceEventType.LEFT_CLICK);
    }
}
