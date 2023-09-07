import { Image } from "./Image";
export interface Publication {
        idPublication ?:number;

        //public int? IdOwner { get; set; }

        animalName :string,

        city :string,
        idCity :number,
        weight? :number,

        sex:boolean,


        age ?: number,
        idAnimalType:number,
        animalType:string,
        idBreed:number,
        breed :string,

        description :string,
        owner?:number,

        //public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        //public virtual AnimalType IdAnimalTypeNavigation { get; set; } = null!;

        //public virtual Breed IdBreedNavigation { get; set; } = null!;

        //public virtual City? IdCityNavigation { get; set; }

        //Owner:User;

         Images :Array<Image>

}
