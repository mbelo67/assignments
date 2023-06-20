import { Project } from "./project.model";

export class User{
    _id!:string;
    firstName!:string;
    lastName!:string;
    projects!:Project[];

}