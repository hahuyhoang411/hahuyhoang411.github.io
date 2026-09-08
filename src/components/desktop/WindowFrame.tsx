import { Maximize2, Minus, Square, X } from "lucide-react";
import {
	type PointerEvent as ReactPointerEvent,
	type ReactNode,
	useEffect,
	useRef,
} from "react";
import type { DesktopWindow, Rect } from "./model";

type WindowFrameProps = {
	window: DesktopWindow;
	active: boolean;
	mobile: boolean;
	onFocus: () => void;
	onClose: () => void;
	onMinimize: () => void;
	onMaximize: () => void;
	onRect: (rect: Rect) => void;
	children: ReactNode;
};

export default function WindowFrame({
	window,
	active,
	mobile,
	onFocus,
	onClose,
	onMinimize,
	onMaximize,
	onRect,
	children,
}: WindowFrameProps) {
	const frame = useRef<HTMLElement>(null);
	const cleanup = useRef<(() => void) | null>(null);
	useEffect(() => () => cleanup.current?.(), []);

	const drag = (event: ReactPointerEvent<HTMLElement>) => {
		if (
			mobile ||
			window.maximized ||
			(event.target as HTMLElement).closest("button")
		)
			return;
		const element = event.currentTarget;
		const start = { x: event.clientX, y: event.clientY, rect: window.rect };
		let next = start.rect;
		element.setPointerCapture(event.pointerId);
		const move = (pointer: PointerEvent) => {
			next = {
				...start.rect,
				x: Math.max(0, start.rect.x + pointer.clientX - start.x),
				y: Math.max(0, start.rect.y + pointer.clientY - start.y),
			};
			frame.current?.style.setProperty(
				"transform",
				`translate(${next.x - start.rect.x}px, ${next.y - start.rect.y}px)`,
			);
		};
		const end = () => {
			element.removeEventListener("pointermove", move);
			element.removeEventListener("pointerup", end);
			element.removeEventListener("pointercancel", end);
			frame.current?.style.removeProperty("transform");
			cleanup.current = null;
			onRect(next);
		};
		cleanup.current?.();
		cleanup.current = end;
		element.addEventListener("pointermove", move);
		element.addEventListener("pointerup", end);
		element.addEventListener("pointercancel", end);
	};

	const resize = (event: ReactPointerEvent<HTMLButtonElement>) => {
		if (mobile || window.maximized) return;
		const element = event.currentTarget;
		const start = { x: event.clientX, y: event.clientY, rect: window.rect };
		let next = start.rect;
		element.setPointerCapture(event.pointerId);
		const move = (pointer: PointerEvent) => {
			next = {
				...start.rect,
				width: Math.max(320, start.rect.width + pointer.clientX - start.x),
				height: Math.max(220, start.rect.height + pointer.clientY - start.y),
			};
			if (frame.current) {
				frame.current.style.width = `${next.width}px`;
				frame.current.style.height = `${next.height}px`;
			}
		};
		const end = () => {
			element.removeEventListener("pointermove", move);
			element.removeEventListener("pointerup", end);
			element.removeEventListener("pointercancel", end);
			if (frame.current) {
				frame.current.style.removeProperty("width");
				frame.current.style.removeProperty("height");
			}
			cleanup.current = null;
			onRect(next);
		};
		cleanup.current?.();
		cleanup.current = end;
		element.addEventListener("pointermove", move);
		element.addEventListener("pointerup", end);
		element.addEventListener("pointercancel", end);
	};

	const style =
		mobile || window.maximized
			? { zIndex: window.z }
			: {
					left: window.rect.x,
					top: window.rect.y,
					width: window.rect.width,
					height: window.rect.height,
					zIndex: window.z,
				};
	return (
		<section
			ref={frame}
			data-window-id={window.id}
			className={`desktop-window ${active ? "is-active" : ""} ${window.maximized ? "is-maximized" : ""} ${window.minimized ? "is-minimized" : ""}`}
			style={style}
			onPointerDown={(event) => {
				if (!(event.target as Element).closest("[data-window-dismiss-control]"))
					onFocus();
			}}
			onFocusCapture={(event) => {
				if (!(event.target as Element).closest("[data-window-dismiss-control]"))
					onFocus();
			}}
			aria-label={`${window.title} window`}
		>
			<header className="window-titlebar" onPointerDown={drag} tabIndex={-1}>
				<strong>{window.title}</strong>
				<span className="window-space" />
				{!mobile && (
					<>
						<button
							type="button"
							aria-label={`Minimize ${window.title}`}
							data-window-dismiss-control
							onClick={onMinimize}
						>
							<Minus size={14} />
						</button>
						<button
							type="button"
							aria-label={`${window.maximized ? "Restore" : "Maximize"} ${window.title}`}
							onClick={onMaximize}
						>
							{window.maximized ? (
								<Square size={13} />
							) : (
								<Maximize2 size={13} />
							)}
						</button>
					</>
				)}
				<button
					type="button"
					aria-label={`Close ${window.title}`}
					data-window-dismiss-control
					onClick={onClose}
				>
					<X size={15} />
				</button>
			</header>
			<div className="window-body">{children}</div>
			{!mobile && !window.maximized && (
				<button
					type="button"
					className="window-resize"
					aria-label={`Resize ${window.title}`}
					onPointerDown={resize}
				/>
			)}
		</section>
	);
}
