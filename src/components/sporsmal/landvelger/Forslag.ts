export class Forslag {
    id: string
    text: string

    constructor(
        text: string
    ) {
        this.id = text.toUpperCase()
        this.text = text
    }
}
