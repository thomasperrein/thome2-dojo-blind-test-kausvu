
export type ChapterBase = {
	audio_preview_url: string;
	available_markets?: string;
	chapter_number: number;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	external_urls: undefined;
	href: string;
	id: string;
	images: array;
	is_playable: boolean;
	languages: string;
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point: undefined;
	type: string;
	uri: string;
	restrictions?: undefined;
};