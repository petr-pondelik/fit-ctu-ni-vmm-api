import UserInterface from "./UserInterface";
import PositionInterface from "./PositionInterface";

export default interface PhotoInterface {
    id: string,
    created_at: string,
    user: UserInterface,
    position: PositionInterface
}