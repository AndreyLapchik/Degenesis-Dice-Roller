import { Point } from "angular2-signaturepad/signature-pad";

export class Intervention {
    id: number;
    idchantier: number;
    codecli: string;
    nomcli: string;
    nom: string;
    cp: string;
    ville: string;
    pays: string;
    codeope: string;
    intervenant: string;

    dateinter: any;
    dateappel: any;

    adr1?: string;
    adr2?: string;
    adr3?: string;
    datearrive: any;
    datedepart: any;
    latdebpoint: string;
    longdebpoint: string;
    geodebpoint?: string;
    latfinpoint?: string;
    longfinpoint?: string;
    geofinpoint?: string;
    motif?: string;
    obsmotif?: string;
    resultat?: string;
    obsresultat?: string;
    circulation?: string;
    correspondant?: string;
    observation?: string;
    statut: string;
    typeinter: string;
    signinterv?: string;
    signclient?: string;

    signInterTemp: Point[][];
    signClientTemp: Point[][];

    // photosTemp?: string[];
    // photos: string[];

    nombd: string;
    geoerreur?: string;



}
