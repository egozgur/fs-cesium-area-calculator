# Angular Cesium Area Calculator

## Introduction

This project is an Angular application (version 17.0.8) that integrates with CesiumJS to provide an interactive 3D globe interface. Users can draw rectangles on the map and calculate their geodesic areas. The application is designed to be user-friendly, providing visual feedback and clear instructions.

## Features

*   **Interactive Rectangle Drawing**: Users can easily draw rectangles on a 3D globe by clicking two points on the map.
*   **Temporary Marker**: A yellow marker provides visual feedback after the first click, indicating the starting point of the rectangle.
*   **Accurate Geodesic Area Calculation**: The application calculates the true surface area of the drawn rectangle on the WGS84 ellipsoid.
*   **Dynamic Area Display**: Calculated area is displayed in either square meters (m²) or square kilometers (km²), depending on the size, for optimal readability.
*   **Clear Functionality**: A "Clear Area" button allows users to remove the drawn rectangle, any markers, and the calculated area display.
*   **User-Friendly Interface**: The application provides clear buttons and informative messages, including error messages (e.g., when attempting to calculate area before drawing a rectangle).

## Technologies Used

*   **Angular**: Framework for building the client-side application.
*   **TypeScript**: Primary language used for Angular development.
*   **CesiumJS**: Open-source JavaScript library for 3D globes and maps.
*   **Tailwind CSS**: Utility-first CSS framework (Note: While listed, its usage in the current project structure is minimal or primarily through Angular's default styling mechanisms unless explicitly configured).

## Prerequisites

*   **Node.js and npm**: Ensure you have Node.js installed (which includes npm). You can download it from [nodejs.org](https://nodejs.org/). A recent LTS version is recommended (e.g., Node 18.x or later).
*   **Angular CLI**: It's helpful to have the Angular CLI installed globally, though `npm link @angular/cli` in the installation steps can also make it available locally.
    ```sh
    npm install -g @angular/cli
    ```

## Installation

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd Titra-Angular-Cesium-Case-Study 
    ```
2.  **Install dependencies:**
    ```sh
    npm install
    ```
3.  **Link Angular CLI (if not installed globally or to use project-specific version):**
    The command `npm link @angular/cli` is typically used for linking local Angular CLI packages. For a standard project setup after `npm install`, this step might not be necessary if you use `npx ng` or have Angular CLI globally installed. If you encounter issues running `ng` commands, ensure Angular CLI is correctly installed and accessible.

## Running the Application

1.  **Serve the application:**
    ```sh
    ng serve --open
    ```
    This command will build the application and open it in your default web browser, usually at `http://localhost:4200/`.

2.  **Cesium Ion Token (Optional):**
    The application uses a default Cesium Ion token. If you wish to use your personal token, you can configure it in the `src/environment/environment.ts` file.

## How to Use the App

1.  **Launch the App**: Upon running `ng serve --open`, a 3D globe will be displayed in your browser.
2.  **Define a Rectangle**:
    *   **First Click**: Click once anywhere on the map to set the first corner of your desired rectangle. A temporary yellow marker will appear at this point to indicate the selection.
    *   **Second Click**: Click a second time on the map to set the opposite corner of the rectangle.
    *   Once the second point is selected, a semi-transparent orange rectangle will be drawn on the map, and the temporary yellow marker will disappear.
3.  **Calculate the Area**:
    *   Click the **"Calculate Area"** button located at the top-center of the map.
    *   The calculated geodesic area of the rectangle will appear next to the buttons. The area is displayed in an appropriate unit: square kilometers (km²) for larger areas or square meters (m²) for smaller ones.
    *   If you click "Calculate Area" *before* drawing a complete rectangle (i.e., before making two clicks on the map), an error message: "Please draw a rectangle on the map first by clicking two points." will be displayed in red.
4.  **Clear the Map**:
    *   Click the **"Clear Area"** button.
    *   This action will remove the drawn rectangle, the displayed area calculation (or error message), and any temporary markers from the map.

## Project Structure

The project is organized into several key components and services:

*   **`AppComponent` (`src/app/app.component.ts`)**:
    *   The root component of the application. It hosts the map and button components and handles the display of the calculated area or error messages.
*   **`MapComponent` (`src/app/map-component/map.component.ts`)**:
    *   Responsible for initializing and displaying the Cesium 3D globe.
    *   Manages user click interactions on the map for defining the rectangle corners.
*   **`ButtonComponent` (`src/app/button-component/button.component.ts`)**:
    *   Provides the "Calculate Area" and "Clear Area" buttons.
    *   Delegates actions to `CesiumService` and emits events to update the `AppComponent` with results or messages.
*   **`CesiumService` (`src/app/cesium-service/cesium.service.ts`)**:
    *   Contains the core logic for all Cesium map interactions.
    *   Manages the state of drawn elements (rectangle corners, temporary markers).
    *   Handles the creation of the rectangle entity on the map.
    *   Performs the geodesically accurate area calculation.
    *   Manages the cleanup of map elements.
*   **`CesiumDirective` (`src/app/cesium-directive/cesium.directive.ts`)**:
    *   This directive was initially part of the map integration. However, its primary functionalities have been centralized into `CesiumService`. It is currently a placeholder and primarily serves as a selector (`[cesiumDirective]`) in `map.component.html` for the map container element.

## Author

Egemen OZGUR
