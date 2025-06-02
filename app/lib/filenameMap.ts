import { Style } from "./Styles";

export const filenameMap: Record<
	Style,
	{
		fullImageFilename: string;
		halfImageFilename: string;
		emptyImageFilename: string;
	}
> = {
	default: {
		fullImageFilename: "full-default",
		halfImageFilename: "half-default",
		emptyImageFilename: "empty",
	},
	poison: {
		fullImageFilename: "full-poison",
		halfImageFilename: "half-poison",
		emptyImageFilename: "empty",
	},
	freezing: {
		fullImageFilename: "full-freezing",
		halfImageFilename: "half-freezing",
		emptyImageFilename: "empty",
	},
	food: {
		fullImageFilename: "full-food",
		halfImageFilename: "half-food",
		emptyImageFilename: "empty-food",
	},
	thirst: {
		fullImageFilename: "full-thirst",
		halfImageFilename: "half-thirst",
		emptyImageFilename: "empty-thirst",
	},
	air: {
		fullImageFilename: "full-air",
		halfImageFilename: "half-air",
		emptyImageFilename: "empty-air",
	},
};
