export default class AUTH0_VARIABLES {

    constructor() {
        this.AUTH0_CLIENT_ID = 'cQeH3bOPfBY5KgEAbi1OYInZp_DCnbQK';
        this.AUTH0_DOMAIN = 'newgermes.auth0.com';
    }

    get client_id () {
        return this.AUTH0_CLIENT_ID;
    }

    get domain() {
        return this.AUTH0_DOMAIN;
    }
}