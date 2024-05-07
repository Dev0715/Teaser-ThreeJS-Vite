export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      analyzerMaterial: ReactThreeFiber.Object3DNode<
        AnalyzerMaterial,
        typeof AnalyzerMaterial
      >;
    }
  }
}
