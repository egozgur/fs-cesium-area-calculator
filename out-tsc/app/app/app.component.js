import { __decorate } from "tslib";
import { Component, Input, ViewChild } from "@angular/core";
import { CesiumModule } from "./app.module";
import { ButtonComponent } from "./button-component/button.component";
import { CommonModule } from "@angular/common";
import { MapComponent } from "./map-component/map.component";
let AppComponent = class AppComponent {
    constructor() {
    }
    setArea(area) {
        this.area = area;
        this.MapComponent.initCesium();
    }
};
__decorate([
    Input()
], AppComponent.prototype, "area", void 0);
__decorate([
    ViewChild(MapComponent)
], AppComponent.prototype, "MapComponent", void 0);
AppComponent = __decorate([
    Component({
        selector: "app-root",
        standalone: true,
        imports: [CommonModule, CesiumModule, ButtonComponent, MapComponent],
        templateUrl: "./app.component.html",
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map