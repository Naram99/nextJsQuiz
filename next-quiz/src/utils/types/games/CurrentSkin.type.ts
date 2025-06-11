export type CurrentSkin = {
    name: string;
    champion: string;
    src: string;
    filter: {
        type: string;
        start: number;
        final: number;
        value: string;
        zoom: boolean;
    };
};
