import iTunes from "../src/index.js";

describe("Lookup", () => {
	describe("iTunes ID / lookup.id()", () => {
		it("artist", async () => {
			const res = await iTunes.lookup.id("1033453223");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "artist");
		});

		it("album", async () => {
			const res = await iTunes.lookup.id("1506027904");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "collection");
			expect(res.results[0]).to.have.property("collectionType", "Album");
		});

		it("song", async () => {
			const res = await iTunes.lookup.id("1265247210");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "track");
			expect(res.results[0]).to.have.property("kind", "song");
		});

		it("music video", async () => {
			const res = await iTunes.lookup.id("1536716977");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "track");
			expect(res.results[0]).to.have.property("kind", "music-video");
		});

		it("movie", async () => {
			const res = await iTunes.lookup.id("263616854");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "track");
			expect(res.results[0]).to.have.property("kind", "feature-movie");
		});
	});

	describe("URL / lookup.url()", () => {
		it("iTunes URL", async () => {
			const res = await iTunes.lookup.url(
				"https://itunes.apple.com/us/album/hurt-less/1265246504?i=1265247210"
			);
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "track");
			expect(res.results[0]).to.have.property("kind", "song");
			210;
		});

		it("Apple Music URL", async () => {
			const res = await iTunes.lookup.url(
				"https://music.apple.com/us/album/hurt-less/1265246504?i=1265247210"
			);
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "track");
			expect(res.results[0]).to.have.property("kind", "song");
			210;
		});
	});

	describe("AMG IDs", () => {
		it("artist / lookup.amgArtistId()", async () => {
			const res = await iTunes.lookup.amgArtistId("3128988");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "artist");
		});

		it("album / lookup.amgAlbumId()", async () => {
			const res = await iTunes.lookup.amgAlbumId("15197");
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "collection");
			expect(res.results[0]).to.have.property("collectionType", "Album");
		});

		it("video / lookup.amgVideoId()", async () => {
			const res = await iTunes.lookup.amgVideoId("17120");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "track");
			expect(res.results[0]).to.have.property("kind", "feature-movie");
		});
	});

	describe("Other", () => {
		it("UPC / lookup.upc()", async () => {
			const res = await iTunes.lookup.upc("889326362173");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("wrapperType", "collection");
			expect(res.results[0]).to.have.property("collectionType", "Album");
		});

		it("ISBN / lookup.isbn()", async () => {
			const res = await iTunes.lookup.isbn("9780553293357");
			expect(res).to.have.property("resultCount", 1);
			expect(res).to.have.property("results");
			expect(Array.isArray(res.results)).to.equal(true);
			expect(res.results.length).to.equal(1);
			expect(res.results[0]).to.have.property("kind", "ebook");
		});
	});
});
