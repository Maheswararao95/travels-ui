import { Traveller } from "./Traveller";
import { Trip } from "./Trip";

export interface Booking {
    traveller?: Traveller;
    trip?: Trip;
    prefType?: any;
}