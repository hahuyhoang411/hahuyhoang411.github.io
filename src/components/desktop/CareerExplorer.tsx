import { useEffect, useRef, useState } from "react";
import WindowNavigation from "./WindowNavigation";

export type CareerRecord = {
	title: string;
	date: string;
	location: string;
	organization: string;
	detail: string;
	image: string;
};

const career: CareerRecord[] = [
	{
		title: "PhD in Mathematics and Informatics",
		date: "Oct 2025 to present",
		location: "Grenoble, France",
		organization: "Grenoble Computer Science Laboratory, Université Grenoble Alpes",
		detail: "Researching explainable correction of scientific facts in language models, including how models use scientific retractions.",
		image: "/assets/timeline/liglab.webp",
	},
	{
		title: "Founder, Meddies AI",
		date: "May 2025 to present",
		location: "Ho Chi Minh, remote from France",
		organization: "Clinical intelligence and research infrastructure",
		detail: "Building clinical intelligence and research infrastructure for Vietnamese hospitals.",
		image: "/assets/meddies-logo.webp",
	},
	{
		title: "Master of BioHealth Engineering",
		date: "Sep 2024 to Jul 2025",
		location: "Grenoble, France",
		organization: "Université Grenoble Alpes, MiAI scholarship",
		detail: "Thesis on retrieval-augmented generation in medicine. The LIGLAB internship produced MedMeta, a benchmark for medical meta-analysis conclusions.",
		image: "/assets/timeline/liglab.webp",
	},
	{
		title: "Large Language Models Researcher",
		date: "Oct 2023 to Feb 2025",
		location: "Remote, Singapore",
		organization: "Menlo Research",
		detail: "Worked on the Ichigo mixed-modal voice assistant, Jan.ai technical reports, and a speech-language-model training pipeline.",
		image: "/assets/timeline/menlo.webp",
	},
	{
		title: "Researcher and teaching assistant",
		date: "Jun 2023 to Sep 2024",
		location: "Vietnam",
		organization: "VietAI",
		detail: "Co-authored Vista, Vietnamese vision-language models, and supported applied LLM instruction.",
		image: "/assets/timeline/vietai.webp",
	},
	{
		title: "Clinical Pharmacy Laboratory",
		date: "Sep 2020 to Sep 2023",
		location: "Ho Chi Minh",
		organization: "University of Medicine and Pharmacy at Ho Chi Minh City",
		detail: "Researched prescription assessment, community respiratory care, and ICU drug recommendation with AI.",
		image: "/assets/timeline/bsc.webp",
	},
	{
		title: "Bachelor of Pharmacy",
		date: "Sep 2018 to Oct 2023",
		location: "Ho Chi Minh",
		organization: "University of Medicine and Pharmacy at Ho Chi Minh City",
		detail: "Clinical pharmacy concentration at the University of Medicine and Pharmacy at Ho Chi Minh City. Thesis on a prescription assessment copilot.",
		image: "/assets/timeline/bsc.webp",
	},
];

function Detail({ record }: { record: CareerRecord }) {
	return (
		<article className="career-detail" aria-live="polite">
			<div className="career-detail-image">
				<img src={record.image} alt="" />
			</div>
			<div className="career-detail-copy">
				<p className="career-kicker">{record.date}, {record.location}</p>
				<h2>{record.title}</h2>
				<p className="career-organization">{record.organization}</p>
				<p className="career-description">{record.detail}</p>
			</div>
		</article>
	);
}

export default function CareerExplorer({ onBack }: { onBack: () => void }) {
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [mobileDetail, setMobileDetail] = useState(false);
	const detailBackRef = useRef<HTMLDivElement>(null);
	const roleRefs = useRef<Array<HTMLButtonElement | null>>([]);
	const restoreListFocus = useRef(false);
	const selected = career[selectedIndex];

	useEffect(() => {
		const resetForDesktop = () => {
			if (window.innerWidth >= 700) setMobileDetail(false);
		};
		window.addEventListener("resize", resetForDesktop);
		return () => window.removeEventListener("resize", resetForDesktop);
	}, []);
	useEffect(() => {
		if (mobileDetail) {
			detailBackRef.current?.querySelector<HTMLButtonElement>("button")?.focus();
			return;
		}
		if (restoreListFocus.current) {
			roleRefs.current[selectedIndex]?.focus();
			restoreListFocus.current = false;
		}
	}, [mobileDetail, selectedIndex]);

	const select = (index: number) => {
		setSelectedIndex(index);
		if (window.innerWidth < 700) setMobileDetail(true);
	};
	const returnToList = () => {
		restoreListFocus.current = true;
		setMobileDetail(false);
	};

	return (
		<section className={`career-explorer${mobileDetail ? " is-mobile-detail" : ""}`} aria-label="Career and education">
			<header className="career-explorer-header">
				<WindowNavigation backLabel="Back to About" canGoBack onBack={onBack} />
				<div>
					<p className="eyebrow">CAREER EXPLORER</p>
					<h1>Career and education</h1>
				</div>
				<span className="career-view-mode">List and preview</span>
			</header>
			<div className="career-toolbar" aria-label="Career explorer information">
				<b>7 records</b>
			</div>
			<div className={`career-master-detail${mobileDetail ? " is-detail" : ""}`}>
				<nav className="career-role-list" aria-label="Career records">
					{career.map((record, index) => (
						<button
							type="button"
							key={record.title}
							className={index === selectedIndex ? "career-role-row is-selected" : "career-role-row"}
							aria-pressed={index === selectedIndex}
							aria-label={`${record.title}, ${record.organization}`}
							ref={(element) => { roleRefs.current[index] = element; }}
							onClick={() => select(index)}
						>
							<span className="career-years">{record.date}</span>
							<span className="career-row-title"><b>{record.title}</b><small>{record.organization}</small></span>
							<span className="career-row-mark" aria-hidden="true">›</span>
						</button>
					))}
				</nav>
				<div className="career-preview">
					<div className="career-mobile-list-back" ref={detailBackRef}>
						<WindowNavigation backLabel="Back to career list" canGoBack onBack={returnToList} />
					</div>
					<Detail record={selected} />
				</div>
			</div>
		</section>
	);
}
