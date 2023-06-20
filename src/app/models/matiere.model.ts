import { User } from "./user.model";

export class Matiere {
    _id!: string;
    nom!: string;
    photo!: string;
    coefficient!: number;
    prof!: User;
    etudiants!: User[];
}