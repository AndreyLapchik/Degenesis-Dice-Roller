export class Chantier {
    
    constructor(
        public id: number,
        public codecli: string,
        public nomcli: string,
        public nom: string,
        public adr1: string,
        public adr2: string,
        public adr3: string,
        public cp: string,
        public ville: string,
        public pays: string,
        public tel1: string,
        public tel2: string,
        public datePosePrev: Date,
        public dateDeposePrev: Date,
        public datePoseReel: Date,
        public dateDeposeReel: Date,
        public surveillance: string,
        public nombd: string
    ) { }

}
