

interface Transportation{
	deliver(cargo: string): void;
	costPerKm(): number;
}

class Truck implements Transportation {
	deliver(cargo: string): void {
		console.log(`🚚 Delivering ${cargo} by road`);
	}
	costPerKm(): number {
		return 2;
	}
}

class Airplane implements Transportation {
	deliver(cargo: string): void {
		console.log(`✈️p Delivering ${cargo} by air`);
	}
	costPerKm(): number {
		return 28;
	}
}



abstract class Logistics {
	abstract createTransport() : Transportation;

	planDelivery(cargo: string): void {
		console.log(`Planning delivery of ${cargo}... `);
		const vehicle = this.createTransport(); // 👈 hard-wired
		vehicle.deliver(cargo);
		console.log("Delivery logged. ");
	}
	estimateCost(km: number): number {
		const vehicle = this.createTransport(); // 👈 hard-wired again
		return km * vehicle.costPerKm();
	}
}

class LogisticsForRoad extends Logistics { createTransport(): Transportation {return new Truck();}}
class LogisticsForAir extends Logistics { createTransport(): Transportation {return new Airplane();}}

const mode_of_transport = new LogisticsForAir();
mode_of_transport.planDelivery("My Bughatti");
console.log(`My Bughatti will cost $${mode_of_transport.estimateCost(20)} to move, but I have the money :)`)