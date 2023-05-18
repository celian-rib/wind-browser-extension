export function interpolateColor(color1: string, color2: string, value: number, min: number, max: number): string {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const normalizedValue = (value - min) / (max - min);
    const clampedNormalizedValue = Math.min(Math.max(normalizedValue, 0), 1);

    const interpolatedRgb = interpolateRgb(rgb1, rgb2, clampedNormalizedValue);

    return rgbToHex(interpolatedRgb);
}

function hexToRgb(hex: string): [number, number, number] {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHexRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    const result = fullHexRegex.exec(hex) || shorthandRegex.exec(hex);

    if (!result) {
        throw new Error(`Invalid hex color: ${hex}`);
    }

    const [, r, g, b] = result;

    return [parseInt(r, 16), parseInt(g, 16), parseInt(b, 16)];
}

function interpolateRgb(rgb1: [number, number, number], rgb2: [number, number, number], value: number): [number, number, number] {
    const interpolatedRgb = rgb1.map((channel1, index) => {
        const channel2 = rgb2[index];
        const interpolatedChannel = Math.round(channel1 + (channel2 - channel1) * value);
        return interpolatedChannel;
    });

    return interpolatedRgb as [number, number, number];
}

function rgbToHex(rgb: [number, number, number]): string {
    const [r, g, b] = rgb;
    return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
}

function componentToHex(component: number): string {
    const hex = component.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
}
