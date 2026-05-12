declare module 'caniuse-lite' {
  interface UnpackedFeature {
    status: string;
    title: string;
    shown: boolean;
    stats: Record<string, Record<string, string>>;
  }
  export const features: Record<string, unknown>;
  export function feature(packed: unknown): UnpackedFeature;
}
