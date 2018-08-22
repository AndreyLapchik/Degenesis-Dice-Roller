export class Utilisateur {

    public login: string;
    public mdp: string;
    public code: string;
    public nom: string;

    static rempli(utilisateur: Utilisateur): boolean {
        return (
            utilisateur.login && utilisateur.login != '' &&
            utilisateur.mdp && utilisateur.mdp != '' &&
            utilisateur.code && utilisateur.code != '' &&
            utilisateur.nom && utilisateur.nom != ''
        );
    }
}
