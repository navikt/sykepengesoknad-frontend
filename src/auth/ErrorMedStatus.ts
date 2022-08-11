export class ErrorMedStatus extends Error {
    private status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
    }
}
