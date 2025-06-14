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

export type CurrentSkinFilter =
    | {
          type: string;
          start: number;
          final: number;
          value: number;
          zoom: boolean | CurrentSkinZoom;
      }
    | unknown;

export type CurrentSkinZoom = {
    scaleStart: number;
    scaleEnd: number;
    top: boolean;
    left: boolean;
};
