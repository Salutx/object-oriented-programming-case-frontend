export function rgbaOpacity(hexValue: string, opacity: number): string {
  const hex = hexValue.replace("#", "");

  const hexChunks = hex.match(new RegExp(`(.{${hex.length / 3}})`, "g")) || [];

  const rgbaValues = hexChunks.map((chunk) =>
    parseInt(hex.length % 2 ? chunk + chunk : chunk, 16)
  );

  const alpha = Number.isFinite(opacity) ? opacity : 1;

  return `rgba(${rgbaValues.join(",")}, ${alpha})`;
}
