export type SkinGameElement = {
    champ: string;
    name: string;
    src: string;
    filter: SkinGameElementFilter;
};

export type SkinGameElementFilter =
    | {
          type: string;
          start: number;
          final: number;
          value: number;
          zoom: boolean | SkinGameElementZoom;
      }
    | unknown;

export type SkinGameElementZoom = {
    scaleStart: number;
    scaleEnd: number;
    top: boolean;
    left: boolean;
};
