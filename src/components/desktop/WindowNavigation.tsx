type WindowNavigationProps = {
	onBack: () => void;
	onForward?: () => void;
	canGoBack: boolean;
	canGoForward?: boolean;
	backLabel?: string;
};

export default function WindowNavigation({
	onBack,
	onForward,
	canGoBack,
	canGoForward,
	backLabel = "Back to index",
}: WindowNavigationProps) {
	return (
		<nav className="window-navigation" aria-label="Panel navigation">
			<button
				type="button"
				aria-label={backLabel}
				title={backLabel}
				disabled={!canGoBack}
				onClick={onBack}
			>
				←
			</button>
			{onForward && (
				<button
					type="button"
					aria-label="Forward to detail"
					title="Forward to detail"
					disabled={!canGoForward}
					onClick={onForward}
				>
					→
				</button>
			)}
		</nav>
	);
}
