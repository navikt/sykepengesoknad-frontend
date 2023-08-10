export class ObjectCopier {
    public copyWith(modifyObject: { [P in keyof this]?: this[P] }): this {
        return Object.assign(Object.create(this.constructor.prototype), { ...this, ...modifyObject })
    }
}
