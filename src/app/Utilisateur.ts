export class Utilisateur {

    public nom: string;
    public position: string;
    public infosOk = false;
    isAnonymous = false;

    constructor(
        public code: string
    ) { }


}
