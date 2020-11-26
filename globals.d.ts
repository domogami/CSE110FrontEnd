declare type IndividualDocument = {
    firstname: string;
    lastname:  string;
    cause:     string[];
    zip:       string;
    skills:    string[];
    age:    string;
}

declare type OrganizationDocument = {
    title:   string;
    mission: string;
    cause:   string[];
    zip:     string;
    contact: string;
    url: string;
    events: string[];
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
    date:     string;
}