export const jsonDeepCopy = <T>(data: T) => {
    return JSON.parse(JSON.stringify(data)) as T
}
