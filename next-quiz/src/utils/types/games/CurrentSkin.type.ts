export type CurrentSkin = {
    name: string;
    champ: string;
    src: string;
    filter: {
        type: string;
        start: number;
        final: number;
        value: string;
        zoom: boolean;
    };
};
