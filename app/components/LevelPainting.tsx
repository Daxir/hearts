import { useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { Slider } from "./slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export function LevelPainting() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [imageSource, setImageSource] = useState("");
	const [expAmount, setExpAmount] = useState([50]);
	const [level, setLevel] = useState(50);
	const navigation = useNavigation();

	useEffect(() => {
		if (!canvasRef.current) {
			return;
		}

		const context = canvasRef.current.getContext("2d");
		if (!context) {
			return;
		}

		context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

		const background = new Image();
		background.onload = () => {
			const canvasHeight = canvasRef.current?.height ?? 0;
			const imgHeight = background.height;
			const y = canvasHeight - imgHeight;
			context.drawImage(background, 0, y);
		};
		background.src = `experience_bar_background.png`;

		const foreground = new Image();
		foreground.onload = () => {
			// Mask the foreground image along the x axis based on experienceAmount
			const width = (canvasRef.current?.width ?? 0) * (expAmount[0] / 100);
			const canvasWidth = canvasRef.current?.width ?? 0;
			const canvasHeight = canvasRef.current?.height ?? 0;
			const imgHeight = foreground.height;
			const y = canvasHeight - imgHeight;

			context.save();
			context.beginPath();
			context.rect(0, y, width, imgHeight);
			context.clip();
			context.drawImage(foreground, 0, y);
			context.restore();

			context.save();
			context.font = "50px Minecraftia";
			context.textAlign = "center";

			context.strokeStyle = "black";
			context.lineWidth = 13;
			context.strokeText(
				level.toFixed(0),
				canvasWidth * 0.5,
				canvasHeight - 25,
			);
			context.fillStyle = "#7efc20";
			context.fillText(level.toFixed(0), canvasWidth * 0.5, canvasHeight - 25);
			context.restore();

			setImageSource(canvasRef.current?.toDataURL() ?? "");
		};
		foreground.src = `experience_bar_progress.png`;
	}, [expAmount, navigation.state, level]);

	return (
		<>
			<canvas
				id="exp-canvas"
				width={1100}
				height={80}
				className="hidden"
				ref={canvasRef}
			/>
			<img
				src={imageSource}
				width={1100}
				height={80}
				alt="exp"
				className="h-auto w-full max-w-[1100px]"
			/>
			<Label htmlFor="level" className="flex items-center gap-2">
				Level:
				<Input
					type="number"
					id="level"
					value={level}
					onChange={(event) => {
						setLevel(Number.parseInt(event.target.value, 10));
					}}
				></Input>
			</Label>
			<Slider max={100} step={1} value={expAmount} onValueChange={setExpAmount} />
		</>
	);
}
