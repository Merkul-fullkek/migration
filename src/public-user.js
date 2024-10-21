class PublicUser {
    constructor(model) {
        const {id, firstName, middleName, lastName, status} = model.get({palin: true});
        this.id = id;
        this.middleName = middleName;
        this.lastName = lastName;
        this.firstName = firstName;
        this.status = status;
    }
}

module.exports = PublicUser;