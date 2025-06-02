export const STYLES = [
	"default",
	"poison",
	"freezing",
	"food",
	"thirst",
] as const;
export type Style = (typeof STYLES)[number];
