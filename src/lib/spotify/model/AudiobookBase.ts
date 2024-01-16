
export type AudiobookBase = {
	authors: array;
	available_markets: string;
	copyrights: array;
	description: string;
	html_description: string;
	edition?: string;
	explicit: boolean;
	external_urls: undefined;
	href: string;
	id: string;
	images: array;
	languages: string;
	media_type: string;
	name: string;
	narrators: array;
	publisher: string;
	type: string;
	uri: string;
	total_chapters: number;
};