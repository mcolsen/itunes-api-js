import iTunes from "../src/index";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

describe("Validation", () => {
	describe("Lookup", () => {
		it("valid params fulfilled", () => {
			return expect(
				iTunes.lookup.id("1033453223", {
					entity: "song",
					limit: 10,
					sort: "recent",
				})
			).to.be.fulfilled;
		});

		describe("entity", () => {
			it("invalid entity rejected", () => {
				return expect(iTunes.lookup.id("1033453223", { entity: "track" })).to.be
					.rejected;
			});

			it("invalid entity type rejected", () => {
				return expect(iTunes.lookup.id(true, { entity: "track" })).to.be
					.rejected;
			});
		});

		describe("limit", () => {
			it("invalid limit (>200) rejected", () => {
				return expect(iTunes.lookup.id("1033453223", { limit: 250 })).to.be
					.rejected;
			});

			it("invalid limit (<1) rejected", () => {
				return expect(iTunes.lookup.id("1033453223", { limit: 0 })).to.be
					.rejected;
			});

			it("invalid limit type rejected", () => {
				return expect(iTunes.lookup.id(true, { limit: false })).to.be.rejected;
			});
		});

		describe("sort", () => {
			it("invalid sort rejected", () => {
				return expect(iTunes.lookup.id("1033453223", { sort: "top" })).to.be
					.rejected;
			});

			it("invalid sort type rejected", () => {
				return expect(iTunes.lookup.id("1033453223", { sort: true })).to.be
					.rejected;
			});
		});
	});

	describe("Search", () => {
		describe("country", () => {
			it("invalid country (ISO code) rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { country: "USA" })).to
					.be.rejected;
			});

			it("invalid country type rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { country: true })).to.be
					.rejected;
			});
		});

		describe("media", () => {
			it("invalid media rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { media: "app" })).to.be
					.rejected;
			});

			it("invalid media type rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { media: true })).to.be
					.rejected;
			});
		});

		describe("entity", () => {
			it("invalid entity rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { entity: "track" })).to
					.be.rejected;
			});

			it("invalid entity type rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { entity: "track" })).to
					.be.rejected;
			});
		});

		describe("attribute", () => {
			it("invalid attribute rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { attribute: "track" }))
					.to.be.rejected;
			});

			it("invalid attribute type rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { attribute: true })).to
					.be.rejected;
			});
		});

		describe("limit", () => {
			it("invalid limit (>200) rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { limit: 250 })).to.be
					.rejected;
			});

			it("invalid limit (<1) rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { limit: 0 })).to.be
					.rejected;
			});

			it("invalid limit type rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { limit: false })).to.be
					.rejected;
			});
		});

		describe("lang", () => {
			it("invalid lang rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { lang: "english" })).to
					.be.rejected;
			});

			it("invalid lang type rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { lang: true })).to.be
					.rejected;
			});
		});

		describe("version", () => {
			it("invalid version rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { version: 3 })).to.be
					.rejected;
			});

			it("invalid version type rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { version: "two" })).to
					.be.rejected;
			});
		});

		describe("explicit", () => {
			it("invalid explicit rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { explicit: "true" })).to
					.be.rejected;
			});

			it("invalid explicit type rejected", () => {
				return expect(iTunes.search("Phoebe Bridgers", { explicit: true })).to
					.be.rejected;
			});
		});

		describe("media/entity/attribute conflicts", () => {
			it("media/entity conflict rejected", () => {
				return expect(
					iTunes.search("Phoebe Bridgers", {
						media: "music",
						entity: "software",
					})
				).to.be.rejected;
			});

			it("media/attribute conflict rejected", () => {
				return expect(
					iTunes.search("Phoebe Bridgers", {
						media: "music",
						attribute: "softwareDeveloper",
					})
				).to.be.rejected;
			});

			it("entity/attribute conflict rejected", () => {
				return expect(
					iTunes.search("Phoebe Bridgers", {
						entity: "song",
						attribute: "softwareDeveloper",
					})
				).to.be.rejected;
			});

			it("media/entity/attribute conflict rejected", () => {
				return expect(
					iTunes.search("Phoebe Bridgers", {
						media: "music",
						entity: "audiobookAuthor",
						attribute: "softwareDeveloper",
					})
				).to.be.rejected;
			});

			it("no media/entity/attribute conflict fulfilled", () => {
				return expect(
					iTunes.search("Phoebe Bridgers", {
						media: "music",
						entity: "song",
						attribute: "artistTerm",
					})
				).to.be.fulfilled;
			});
		});
	});
});
