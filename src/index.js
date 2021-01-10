import jsonp from "jsonp";
import joi from "joi";
import paramSchema from "./param-schema";

const baseURL = "https://itunes.apple.com/";

//	** "Private" non-exported helper functions **

const request = (url, resolve) => {
	jsonp(url, null, (err, data) => {
		if (err) {
			throw err;
		} else {
			resolve(data);
		}
	});
};

const addlParamString = (addlParam) => {
	let string = "";

	for (const param in addlParam) {
		string = string.concat(`&${param}=${addlParam[param]}`);
	}

	return string;
};

//	** Lookup API helper functions **

const parseURL = (url) => {
	//	Do not use outside try/catch block inside promise executor
	const valid = joi
		.string()
		.pattern(
			/((itunes|music)\.apple\.com\/us\/(album|artist|music-video)\/)(.*)(?=\/)\/(.*)/i //Regex matches URLs for iTunes/Apple Music
		)
		.validate(url);
	if (valid.error) {
		throw valid.error;
	}

	let id;
	const { error } = joi
		.string()
		.pattern(/((itunes|music)\.apple\.com\/us\/album\/)(.*(.+?(?=\?i=)))/i) //Regex matches URLs for tracks, which require a different regex for parsing the id
		.validate(url);
	if (error) {
		id = url.match(/(?<=(album|artist|music-video)\/(.*)\/).*/gi); //Regex matches id in iTunes/Apple Music non-track URLs
		id && (id = id[0]);
	} else {
		id = url.match(/(?<=\?i=).*/gi); //Regex matches id in iTunes/Apple Music track URLs
		id && (id = id[0]);
	}

	//	Regex matches should work, but just in case they don't
	if (id) {
		return id;
	} else {
		throw new Error("Invalid iTunes/Apple Music URL");
	}
};

const lookupAddlParam = (addlParam) => {
	const { error } = paramSchema.lookup.validate(addlParam);

	if (error) {
		throw error;
	} else {
		return addlParamString(addlParam);
	}
};

const lookupURL = (urlParam, value, addlString) => {
	if (typeof value === "string") {
		return `${baseURL}lookup?${urlParam}=${value}${addlString}`;
	} else if (Array.isArray(value)) {
		const { error } = joi.array().items(joi.string()).validate(value);

		if (error) {
			throw error;
		} else {
			return `${baseURL}lookup?${urlParam}=${value.toString()}${addlString}`;
		}
	} else {
		throw new Error(`"id" must be a string or array of strings`);
	}
};

const lookupRequest = (urlParam, value, addlParam, resolve) => {
	//	Do not use outside try/catch block inside promise executor

	let addlString = "";
	if (addlParam) {
		addlString = lookupAddlParam(addlParam);
	}

	let reqURL = lookupURL(urlParam, value, addlString);

	request(reqURL, resolve);
};

const lookupPromise = (urlParam, value, addlParam) => {
	return new Promise((resolve, reject) => {
		try {
			lookupRequest(urlParam, value, addlParam, resolve);
		} catch (e) {
			reject(e);
		}
	});
};

//	** Exported object with methods **
const iTunes = {
	search: (term, addlParam) =>
		new Promise((resolve, reject) => {
			try {
				const { error } = joi.string().validate(term);
				if (error) {
					throw error;
				}

				let addlString = "";
				if (addlParam) {
					const { error } = paramSchema.search.validate(addlParam);
					if (error) {
						throw error;
					}
					addlString = addlParamString(addlParam);
				}

				request(`${baseURL}search?term=${term}${addlString}`, resolve);
			} catch (e) {
				reject(e);
			}
		}),

	lookup: {
		id: (id, addlParam) => lookupPromise("id", id, addlParam),
		upc: (upc, addlParam) => lookupPromise("upc", upc, addlParam),
		isbn: (isbn, addlParam) => lookupPromise("isbn", isbn, addlParam),
		amgArtistId: (id, addlParam) => lookupPromise("amgArtistId", id, addlParam),
		amgAlbumId: (id, addlParam) => lookupPromise("amgAlbumId", id, addlParam),
		amgVideoId: (id, addlParam) => lookupPromise("amgVideoId", id, addlParam),
		url: (url, addlParam) =>
			new Promise((resolve, reject) => {
				try {
					lookupRequest("id", parseURL(url), addlParam, resolve);
				} catch (e) {
					reject(e);
				}
			}),
	},
};

export default iTunes;
