import { Matiere } from "./matiere.model";
import { User } from "./user.model";

export class Assignment {
    _id!: string;
    nom!: string;
    estSoumis!: boolean;
    dateDeRendu!: Date;
    auteur!: User;
    matiere!: Matiere;
    note!: number;
    rendu!: boolean;
}

