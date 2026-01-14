declare module "@teachablemachine/image" {
  export class Webcam {
    canvas: HTMLCanvasElement;
    constructor(width?: number, height?: number, flip?: boolean);
    setup(): Promise<void>;
    play(): Promise<void>;
    pause(): void;
    stop(): void;
    update(): void;
  }

  export interface Prediction {
    className: string;
    probability: number;
  }

  export class CustomMobileNet {
    predict(input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageData): Promise<Prediction[]>;
    predictTopK?(input: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement | ImageData, maxPredictions?: number): Promise<Prediction[]>;
  }

  export function load(modelURL: string, metadataURL?: string): Promise<CustomMobileNet>;

  export function loadFromFiles(modelJson: File, weights: File, metadata: File): Promise<CustomMobileNet>;
}
