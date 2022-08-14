export default class Card {
    type:string;
    color:string;
    image: string;
    constructor(type: string, color: string, image: string) {
        this.type = type;
        this.color = color;
        this.image = image;
    }
}