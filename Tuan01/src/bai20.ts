interface Vehicle {
    start(): void;
    stop(): void;
}

export class Carr implements Vehicle {
    start(): void {
        console.log("Car started");
    }
    stop(): void {
        console.log("Car stopped");
    }
}

 export class Bike implements Vehicle {
    start(): void {
        console.log("Bike started");
    }
    stop(): void {
        console.log("Bike stopped");
    }
}