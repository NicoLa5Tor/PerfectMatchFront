import { Image } from "./Image";
export interface Publication {
        idPublication :number;
        animalName :string,
        idCity :number,
        cityName:string,
        weight :number,
        idGender:number,
        price: number,
        age : number,
        idAnimalType:number,
        typeName:string,
        idBreed:number,
        breedName :string,
        genderName?:string,
        description :string,
        idOwner?:number,
        nameOwner:string,
        images :Array<Image>

}
