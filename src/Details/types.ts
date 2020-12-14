export interface Episode {
	id: string;
	air_date: string;
	name: string;
}

export interface Character {
	name: string;
	image: string;
	species: string;
	gender: string;
	episode: Episode[];
}

export interface Variables {
	id: number[];
}

export interface Response {
	charactersByIds: {
		character: Character[];
	}
}
