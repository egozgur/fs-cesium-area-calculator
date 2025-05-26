import { Injectable } from '@angular/core';
import * as Cesium from "cesium";
import {Cartesian3, Viewer} from "cesium";

export interface CalculateAreaResult {
  area?: string;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CesiumService {
  private bottomRight: Cartesian3 | undefined;
  private topLeft: Cartesian3 | undefined;
  private viewer: Viewer | undefined;
  private temporaryMarkerEntity: Cesium.Entity | undefined;

  constructor() { }

  // Draws a temporary marker at the given position.
  drawTemporaryMarker(position: Cartesian3): void {
    if (!this.viewer) {
      return;
    }
    // Remove existing temporary marker if any
    if (this.temporaryMarkerEntity) {
      this.viewer.entities.remove(this.temporaryMarkerEntity);
      this.temporaryMarkerEntity = undefined;
    }

    // Create a new point entity for the marker
    this.temporaryMarkerEntity = new Cesium.Entity({
      position: position,
      point: {
        pixelSize: 10,
        color: Cesium.Color.YELLOW,
        outlineColor: Cesium.Color.BLACK,
        outlineWidth: 1,
      },
    });
    // Add the new marker to the viewer
    this.viewer.entities.add(this.temporaryMarkerEntity);
  }

  // Sets the first point for the rectangle.
  setFirstPoint(point: Cartesian3): void {
    this.topLeft = point;
    this.bottomRight = undefined; // Reset bottom-right when a new first point is set
    if (this.viewer) {
      this.viewer.entities.removeAll(); // Clear existing rectangle (and potentially other entities)
    }
    this.drawTemporaryMarker(point); // Draw temporary marker at the first point
  }

  // Sets the second point and creates the rectangle.
  setSecondPointAndCreateRectangle(point: Cartesian3, viewer: Viewer): void {
    this.viewer = viewer;
    this.bottomRight = point;

    if (this.topLeft && this.bottomRight) {
      this.createRectangleInternal();
    }
  }

  // Creates a rectangle entity on the map using internal coordinates.
  private createRectangleInternal(): void {
    // Remove temporary marker when rectangle is created
    if (this.temporaryMarkerEntity && this.viewer) {
      this.viewer.entities.remove(this.temporaryMarkerEntity);
      this.temporaryMarkerEntity = undefined;
    }

    if (this.topLeft && this.bottomRight && this.viewer) {
      //Gets cartographic coordinates of top left and bottom right corners
      const topLeftCartographic = Cesium.Cartographic.fromCartesian(
          this.topLeft
      );
      const bottomRightCartographic = Cesium.Cartographic.fromCartesian(
          this.bottomRight
      );

      //Define rectangle corners
      const rectangleProperty = new Cesium.CallbackProperty(() => {
        return Cesium.Rectangle.fromCartographicArray([
          topLeftCartographic,
          bottomRightCartographic,
        ]);
      }, false);

      //Sets rectangle material
      const materialProperty = new Cesium.ColorMaterialProperty(
          Cesium.Color.fromCssColorString("rgba(238, 75, 43, 0.5)") // Example: a semi-transparent orange color
      );

      //Creates entity for the rectangle
      const rectangleEntity = new Cesium.Entity({
        rectangle: {
          coordinates: rectangleProperty,
          material: materialProperty,
          height: 0,
        },
      });
      // Add rectangle entity to the viewer
      this.viewer.entities.add(rectangleEntity);
    }
  }

  /*  Calculates the area of the user-defined rectangle in square kilometers.
  @returns An object containing either the area string or an error message.
  */
  calculateArea(): CalculateAreaResult {
    if (this.topLeft && this.bottomRight) {
      // Gets cartographic coordinates of the top-left and bottom-right corners
      const topLeftCartographic = Cesium.Cartographic.fromCartesian(this.topLeft);
      const bottomRightCartographic = Cesium.Cartographic.fromCartesian(this.bottomRight);

      // Define the four corners of the rectangle in Cartographic coordinates
      // Heights are set to 0 as we are calculating surface area.
      const corner1 = topLeftCartographic;
      const corner2 = new Cesium.Cartographic(topLeftCartographic.longitude, bottomRightCartographic.latitude, 0);
      const corner3 = bottomRightCartographic;
      const corner4 = new Cesium.Cartographic(bottomRightCartographic.longitude, topLeftCartographic.latitude, 0);

      const rectangleCoordinates = [corner1, corner2, corner3, corner4];

      // Calculate geodesic area using Cesium.Ellipsoid.WGS84.computeSignedPolygonArea
      // The result is in square meters. The sign indicates winding order, so we take the absolute value.
      const areaSquareMeters = Math.abs(Cesium.Ellipsoid.WGS84.computeSignedPolygonArea(rectangleCoordinates));

      // Convert area to square kilometers and format it
      const areaSquareKilometers = areaSquareMeters / 1000000;

      if (areaSquareKilometers > 1) {
        const formattedArea = areaSquareKilometers.toFixed(2); // Use toFixed(2) for km^2
        return { area: formattedArea + " km^2" };
      } else {
        const formattedArea = areaSquareMeters.toFixed(0); // Use toFixed(0) for m^2
        return { area: formattedArea + " m^2" };
      }


    } else {
      // console.warn("Area cannot be calculated: Corners are not defined.");
      return { error: "Please draw a rectangle on the map first by clicking two points." };
    }
  }

//Clears the drawn rectangle from the map and resets the corner points.
  clearArea(): void {
    // Remove rectangle from the map
    if (this.viewer) { // Check if viewer is defined
      this.viewer.entities.removeAll();
      this.viewer.dataSources.removeAll(); // Though likely not strictly necessary if only entities are added

      // Remove temporary marker if any
      if (this.temporaryMarkerEntity) {
        this.viewer.entities.remove(this.temporaryMarkerEntity);
        this.temporaryMarkerEntity = undefined;
      }
    }
    // Reset corner points
    this.topLeft = undefined;
    this.bottomRight = undefined;
    // Optionally, reset the viewer instance if it's not meant to be reused
    // this.viewer = undefined;
  }
}
