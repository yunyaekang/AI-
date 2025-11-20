
export interface FormData {
  productName: string;
  keyFeatures: string;
  targetAudience: string;
  vibe: string;
  length: string;
}

export interface Scene {
  sceneNumber: number;
  visual: string;
  narration: string;
  onScreenText: string;
}

export interface VideoScript {
  title: string;
  concept: string;
  scenes: Scene[];
}
