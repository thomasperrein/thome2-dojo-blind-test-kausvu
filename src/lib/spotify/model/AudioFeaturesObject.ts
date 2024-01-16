import { Key } from "./Key";
import { Loudness } from "./Loudness";
import { Mode } from "./Mode";
import { Tempo } from "./Tempo";
import { TimeSignature } from "./TimeSignature";

export type AudioFeaturesObject = {
	acousticness?: number;
	analysis_url?: string;
	danceability?: number;
	duration_ms?: number;
	energy?: number;
	id?: string;
	instrumentalness?: number;
	key?: undefined;
	liveness?: number;
	loudness?: undefined;
	mode?: undefined;
	speechiness?: number;
	tempo?: undefined;
	time_signature?: undefined;
	track_href?: string;
	type?: string;
	uri?: string;
	valence?: number;
};