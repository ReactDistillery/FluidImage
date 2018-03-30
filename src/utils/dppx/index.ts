const dppx = (): number => (
  typeof window == 'undefined' ? 1 : +window.devicePixelRatio || 1
);

export default dppx;
