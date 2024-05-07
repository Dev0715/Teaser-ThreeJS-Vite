export {};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      analyzerMaterial: ReactThreeFiber.Object3DNode<
        AnalyzerMaterial,
        typeof AnalyzerMaterial
      >;

      auroraMaterial: ReactThreeFiber.Object3DNode<
        AuroraMaterial,
        typeof AuroraMaterial
      >;

      explorerMaterial: ReactThreeFiber.Object3DNode<
        ExplorerMaterial,
        typeof ExplorerMaterial
      >;

      lightsMaterial: ReactThreeFiber.Object3DNode<
        LightsMaterial,
        typeof LightsMaterial
      >;
    }
  }
}
