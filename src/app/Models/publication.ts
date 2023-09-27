import { Image } from "./Image";
export interface Publication {
        idPublication :number;
        //public int? IdOwner { get; set; }
        animalName :string,
        idCity :number,
        cityName:string,
        weight? :number,
        idGender:number,
        price: number,
        age ?: number,
        idAnimalType:number,
        typeName:string,
        idBreed:number,
        breedName :string,
        genderName?:string,
        description :string,
        idOwner?:number,
        nameOwner:string,
        
        //public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        //public virtual AnimalType IdAnimalTypeNavigation { get; set; } = null!;

        //public virtual Breed IdBreedNavigation { get; set; } = null!;

        //public virtual City? IdCityNavigation { get; set; }

        //Owner:User;

         images :Array<Image>

}
