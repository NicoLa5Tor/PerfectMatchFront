export class Publication {
        idPublication ?:number;

        //public int? IdOwner { get; set; }

        animalName ?:string="";

        city ?:string="";

        weight ?:number;

        sex?:boolean;

        age ?: number;

        animalType?:string;

        breed ?:string;

        description ?:string;
        owner?:number;

        //public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        //public virtual AnimalType IdAnimalTypeNavigation { get; set; } = null!;

        //public virtual Breed IdBreedNavigation { get; set; } = null!;

        //public virtual City? IdCityNavigation { get; set; }

        //Owner:User;

         Images :Array<string>=new Array<string>(5);

}
