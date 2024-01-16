
export type EpisodeBase = {
	audio_preview_url: string;
	description: string;
	html_description: string;
	duration_ms: number;
	explicit: boolean;
	external_urls: undefined;
	href: string;
	id: string;
	images: array;
	is_externally_hosted: boolean;
	is_playable: boolean;
	language?: string;
	languages: string;
	name: string;
	release_date: string;
	release_date_precision: string;
	resume_point: undefined;
	type: string;
	uri: string;
	restrictions?: undefined;
};