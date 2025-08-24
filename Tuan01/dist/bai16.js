"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Box = void 0;
class Box {
    constructor(value) {
        this.value = value;
    }
    setValue(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.Box = Box;
