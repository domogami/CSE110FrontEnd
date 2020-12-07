declare type IndividualDocument = {
    firstname: string;
    lastname:  string;
    causes:    string[];
    zip:       string;
    skills:    string[];
    age:       string;
    
    picture:   string;
    email:     string;
    picture:   string;
    following: string[];
}

declare type OrganizationDocument = {
    title:   string;
    mission: string;
    causes:  string[];
    zip:     string;
    contact: string;
    url: string;
    
    picture:   string;
    events: string[];
    ratings:   string[];
}

declare type RatingDocument = {
    stars:       number;
    description: string;
}

declare type OrgEventDocument = {
    title:    string;
    details:  string;
    zip:      string;
    skills:   string[];
    date:     number;
}

declare type OrgStats =  { 
    followers: number;
    ratingsCount: number;
    age: { [ageCategory: string]: number };
    ratings: { [rating: string]: number };
};