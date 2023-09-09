import { Image } from "./Image";
export interface Publication {
        idPublication ?:number;

        //public int? IdOwner { get; set; }

        animalName :string,

        idCity :number,
        nameCity:string,
        weight? :number,

        sex:boolean,


        age ?: number,
        idAnimalType:number,
        nameType:string,
        idBreed:number,
        nameBreed :string,

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
