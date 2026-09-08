import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import stickers from "./stickers.json";

type Sticker = (typeof stickers)[number];

const spriteSources: Record<Sticker["sprite"], string> = {
	board: "/assets/vietnam-sketchboard.png",
	extra: "/assets/vietnam-stickers-extra.png",
};

const desktopReference = { width: 1440, height: 820, factor: 0.864, cap: 1.032 };
const mobileReference = { width: 390, height: 738, factor: 0.5376, cap: 0.5376 };

function fitStickerScale(width: number, height: number, mobile: boolean) {
	const reference = mobile ? mobileReference : desktopReference;
	return Math.min(
		reference.factor * (width / reference.width),
		reference.factor * (height / reference.height),
		reference.cap,
	);
}

export default function StickerWall() {
	const wallRef = useRef<HTMLDivElement>(null);
	const [scaleFactor, setScaleFactor] = useState(() => (window.innerWidth < 700 ? 0.48 : 0.72));

	useLayoutEffect(() => {
		const wall = wallRef.current;
		if (!wall) return;

		const updateScale = (width: number, height: number) => {
			setScaleFactor(fitStickerScale(width, height, width < 700));
		};
		updateScale(wall.clientWidth, wall.clientHeight);
		const observer = new ResizeObserver(([entry]) => updateScale(entry.contentRect.width, entry.contentRect.height));
		observer.observe(wall);
		return () => observer.disconnect();
	}, []);

	return (
		<div
			className="sticker-wall"
			aria-hidden="true"
			ref={wallRef}
			style={{ "--sticker-scale-factor": scaleFactor } as CSSProperties}
		>
			{stickers.map(({ name, sprite, crop, position, mobilePosition, scale, rotate }, index) => {
				const [, , width, height] = crop;
				const style = {
					"--sticker-left": `${position[0]}%`,
					"--sticker-top": `${position[1]}%`,
					"--sticker-mobile-left": `${mobilePosition[0]}%`,
					"--sticker-mobile-top": `${mobilePosition[1]}%`,
					width,
					height,
					"--sticker-rotate": `${rotate}deg`,
					"--sticker-scale": scale,
				} as CSSProperties;
				return (
					<div
						className="sticker"
						data-source={spriteSources[sprite]}
						data-sticker={name}
						key={name}
						style={style}
					>
						<img src={`/assets/vietnam-stickers/${String(index).padStart(2, "0")}.png`} alt="" />
					</div>
				);
			})}
		</div>
	);
}
