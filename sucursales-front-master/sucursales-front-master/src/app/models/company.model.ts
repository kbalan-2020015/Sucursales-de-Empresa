export class CompanyModel {
    constructor(
        public id: string,
        public name: String,
        public typeOfCompany: String,
        public username: String,
        public email: String,
        public password: String,
        public phone: String,
        public role: String,
        public image: String
    ) {}
}