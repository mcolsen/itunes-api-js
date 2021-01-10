import joi from "joi";
import _ from "lodash";

const valid = {
	//	ISO 3166-1 alpha-2 country codes
	country: [
		"AF",
		"AX",
		"AL",
		"DZ",
		"AS",
		"AD",
		"AO",
		"AI",
		"AQ",
		"AG",
		"AR",
		"AM",
		"AW",
		"AU",
		"AT",
		"AZ",
		"BS",
		"BH",
		"BD",
		"BB",
		"BY",
		"BE",
		"BZ",
		"BJ",
		"BM",
		"BT",
		"BO",
		"BQ",
		"BA",
		"BW",
		"BV",
		"BR",
		"IO",
		"BN",
		"BG",
		"BF",
		"BI",
		"CV",
		"KH",
		"CM",
		"CA",
		"KY",
		"CF",
		"TD",
		"CL",
		"CN",
		"CX",
		"CC",
		"CO",
		"KM",
		"CG",
		"CD",
		"CK",
		"CR",
		"CI",
		"HR",
		"CU",
		"CW",
		"CY",
		"CZ",
		"DK",
		"DJ",
		"DM",
		"DO",
		"EC",
		"EG",
		"SV",
		"GQ",
		"ER",
		"EE",
		"SZ",
		"ET",
		"FK",
		"FO",
		"FJ",
		"FI",
		"FR",
		"GF",
		"PF",
		"TF",
		"GA",
		"GM",
		"GE",
		"DE",
		"GH",
		"GI",
		"GR",
		"GL",
		"GD",
		"GP",
		"GU",
		"GT",
		"GG",
		"GN",
		"GW",
		"GY",
		"HT",
		"HM",
		"VA",
		"HN",
		"HK",
		"HU",
		"IS",
		"IN",
		"ID",
		"IR",
		"IQ",
		"IE",
		"IM",
		"IL",
		"IT",
		"JM",
		"JP",
		"JE",
		"JO",
		"KZ",
		"KE",
		"KI",
		"KP",
		"KR",
		"KW",
		"KG",
		"LA",
		"LV",
		"LB",
		"LS",
		"LR",
		"LY",
		"LI",
		"LT",
		"LU",
		"MO",
		"MG",
		"MW",
		"MY",
		"MV",
		"ML",
		"MT",
		"MH",
		"MQ",
		"MR",
		"MU",
		"YT",
		"MX",
		"FM",
		"MD",
		"MC",
		"MN",
		"ME",
		"MS",
		"MA",
		"MZ",
		"MM",
		"NA",
		"NR",
		"NP",
		"NL",
		"NC",
		"NZ",
		"NI",
		"NE",
		"NG",
		"NU",
		"NF",
		"MK",
		"MP",
		"NO",
		"OM",
		"PK",
		"PW",
		"PS",
		"PA",
		"PG",
		"PY",
		"PE",
		"PH",
		"PN",
		"PL",
		"PT",
		"PR",
		"QA",
		"RE",
		"RO",
		"RU",
		"RW",
		"BL",
		"SH",
		"KN",
		"LC",
		"MF",
		"PM",
		"VC",
		"WS",
		"SM",
		"ST",
		"SA",
		"SN",
		"RS",
		"SC",
		"SL",
		"SG",
		"SX",
		"SK",
		"SI",
		"SB",
		"SO",
		"ZA",
		"GS",
		"SS",
		"ES",
		"LK",
		"SD",
		"SR",
		"SJ",
		"SE",
		"CH",
		"SY",
		"TW",
		"TJ",
		"TZ",
		"TH",
		"TL",
		"TG",
		"TK",
		"TO",
		"TT",
		"TN",
		"TR",
		"TM",
		"TC",
		"TV",
		"UG",
		"UA",
		"AE",
		"GB",
		"US",
		"UM",
		"UY",
		"UZ",
		"VU",
		"VE",
		"VN",
		"VG",
		"VI",
		"WF",
		"EH",
		"YE",
		"ZM",
		"ZW",
	],
	media: [
		"movie",
		"podcast",
		"music",
		"musicVideo",
		"audiobook",
		"shortFilm",
		"tvShow",
		"software",
		"ebook",
		"all",
	],
	entity: {
		movie: ["movieArtist", "movie"],
		podcast: ["podcastAuthor", "podcast"],
		music: ["musicArtist", "musicTrack", "album", "musicVideo", "mix", "song"],
		musicVideo: ["musicArtist", "musicVideo"],
		audiobook: ["audiobookAuthor", "audiobook"],
		shortFilm: ["shortFilmArtist", "shortFilm"],
		tvShow: ["tvEpisode", "tvSeason"],
		software: ["software", "iPadSoftware", "macSoftware"],
		ebook: ["ebook"],
		all: [
			"movie",
			"album",
			"allArtist",
			"podcast",
			"musicVideo",
			"mix",
			"audiobook",
			"tvSeason",
			"allTrack",
		],
	},
	attribute: {
		movie: [
			"actorTerm",
			"genreIndex",
			"artistTerm",
			"shortFilmTerm",
			"producerTerm",
			"ratingTerm",
			"directorTerm",
			"releaseYearTerm",
			"featureFilmTerm",
			"movieArtistTerm",
			"movieTerm",
			"ratingIndex",
			"descriptionTerm",
		],
		podcast: [
			"titleTerm",
			"languageTerm",
			"authorTerm",
			"genreIndex",
			"artistTerm",
			"ratingIndex",
			"keywordsTerm",
			"descriptionTerm",
		],
		music: [
			"mixTerm",
			"genreIndex",
			"artistTerm",
			"composerTerm",
			"albumTerm",
			"ratingIndex",
			"songTerm",
		],
		musicVideo: [
			"genreIndex",
			"artistTerm",
			"albumTerm",
			"ratingIndex",
			"songTerm",
		],
		audiobook: ["titleTerm", "authorTerm", "genreIndex", "ratingIndex"],
		shortFilm: [
			"genreIndex",
			"artistTerm",
			"shortFilmTerm",
			"ratingIndex",
			"descriptionTerm",
		],
		software: ["softwareDeveloper"],
		tvShow: [
			"genreIndex",
			"tvEpisodeTerm",
			"showTerm",
			"tvSeasonTerm",
			"ratingIndex",
			"descriptionTerm",
		],
		all: [
			"actorTerm",
			"languageTerm",
			"allArtistTerm",
			"tvEpisodeTerm",
			"shortFilmTerm",
			"directorTerm",
			"releaseYearTerm",
			"titleTerm",
			"featureFilmTerm",
			"ratingIndex",
			"keywordsTerm",
			"descriptionTerm",
			"authorTerm",
			"genreIndex",
			"mixTerm",
			"allTrackTerm",
			"artistTerm",
			"composerTerm",
			"tvSeasonTerm",
			"producerTerm",
			"ratingTerm",
			"songTerm",
			"movieArtistTerm",
			"showTerm",
			"movieTerm",
			"albumTerm",
		],
	},
	lang: ["en_us", "ja_jp"],
	explicit: ["yes", "no"],
};

const search = joi
	.object({
		country: joi
			.string()
			.valid(...valid.country)
			.insensitive(),
		media: joi
			.string()
			.valid(...valid.media)
			.insensitive(),
		entity: joi.string().valid(..._.union(..._.values(valid.entity))), // Additional validation in .custom()
		attribute: joi.string().valid(..._.union(..._.values(valid.attribute))), // Additional validation in .custom()
		limit: joi.number().positive().integer().max(200),
		lang: joi
			.string()
			.valid(...valid.lang)
			.insensitive(),
		version: joi.number().valid(1, 2),
		explicit: joi
			.string()
			.valid(...valid.explicit)
			.insensitive(),
	})
	.or(...[...Object.keys(valid), "limit", "version"])
	.custom((value) => {
		const { media, entity, attribute } = value;

		const mediaFromX = (x, val) => {
			if (x !== "entity" && x !== "attribute") {
				throw new Error("Only entity and attribute may be checked");
			}

			let allowed = [];

			for (const media in valid[x]) {
				if (valid[x][media].find((prop) => prop === val)) {
					allowed.push(media);
				}
			}

			return allowed;
		};

		if (
			(!media && !entity) ||
			(!media && !attribute) ||
			(!entity && !attribute)
		) {
			return value; // No possible conflict if only one (or zero) of three is specified
		} else if (entity && attribute) {
			const allow = _.intersection(
				mediaFromX("entity", entity),
				mediaFromX("attribute", attribute)
			);

			if (allow.length === 0) {
				throw new Error(
					`entity ${entity} and attribute ${attribute} are mutually exclusive`
				);
			}

			if (allow.find((i) => i === "all")) {
				return value;
			}

			if (media) {
				if (!allow.find((i) => i === media)) {
					throw new Error(
						`media ${media} is mutually exclusive with entity ${entity} and/or attribute ${attribute}`
					);
				}
			}

			return value;
		} else if ((media && entity) || (media && attribute)) {
			let allow;

			entity && (allow = mediaFromX("entity", entity));
			attribute && (allow = mediaFromX("attribute", attribute));

			if (allow.find((i) => i === media || i === "all")) {
				return value;
			} else {
				throw new Error(
					`media ${media} and ${
						entity ? `entity ${entity}` : `attribute ${attribute}`
					} are mutually exclusive `
				);
			}
		}

		//	The function should return or throw beforehand, but to prevent validation from hanging in case it doesn't
		throw new Error(
			`Unknown validation error - "media", "entity", and/or "attribute`
		);
	});

const lookup = joi.object({
	entity: joi.string().valid(..._.union(..._.values(valid.entity))),
	limit: joi.number().positive().integer().max(200),
	sort: joi.string().valid("recent"),
});

export default { lookup, search };
