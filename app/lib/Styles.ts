export const STYLES = [
	"default",
	"poison",
	"freezing",
	"food",
	"thirst",
	"air",
] as const;
export type Style = (typeof STYLES)[number];
