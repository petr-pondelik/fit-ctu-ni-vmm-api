import UserInterface from "./UserInterface";
import LocationInterface from "./LocationInterface";

export default interface PhotoInterface {
    id: string,
    created_at: string,
    user: UserInterface,
    location: LocationInterface
}