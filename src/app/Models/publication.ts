export interface Publication {
        idPublication ?:number,

        //public int? IdOwner { get; set; }

        animalName ?:string,

        //City { get; set; }

        weigth ?:number,

        sex?:boolean,

        Age ?: number,

        //AnimalType:string,

        //Breed :string,

        description ?:string

        //public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        //public virtual AnimalType IdAnimalTypeNavigation { get; set; } = null!;

        //public virtual Breed IdBreedNavigation { get; set; } = null!;

        //public virtual City? IdCityNavigation { get; set; }

        //Owner:User;

        // Images :Image[];

}
