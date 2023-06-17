export class DesignModel {
    constructor(
        public id: number,
        public public_id: string,
        public title: string,
        public url: string,
        public publiched: boolean,
        public images: Array<string>
    ) {}
}
