export type SkinGameElement =  {
    champ: string,
    name: string,
    src: string,
    filter: {
        type: string,
        start: number,
        final: number
        value: number,
        zoom: boolean
    } | unknown
}