import iTunes from "../src/index.js";

describe("Search", () => {
	it("no params / search(term)", async () => {
		const res = await iTunes.search("Phoebe Bridgers");
		expect(res).to.have.property("resultCount");
		expect(res.resultCount).to.be.above(0);
		expect(res).to.have.property("results");
		expect(Array.isArray(res.results)).to.equal(true);
		expect(res.results.length).to.equal(res.resultCount);
	});

	it(`entity param / search(term, {entity: "song"})`, async () => {
		const res = await iTunes.search("Phoebe Bridgers", { entity: "song" });
		expect(res).to.have.property("resultCount");
		expect(res.resultCount).to.be.above(0);
		expect(res).to.have.property("results");
		expect(Array.isArray(res.results)).to.equal(true);
		expect(res.results.length).to.equal(res.resultCount);
		res.results.forEach((r) => {
			expect(r).to.have.property("wrapperType", "track");
			expect(r).to.have.property("kind", "song");
		});
	});

	it(`limit param / search(term, {limit: 10})`, async () => {
		const res = await iTunes.search("Phoebe Bridgers", { limit: 10 });
		expect(res).to.have.property("resultCount");
		expect(res.resultCount).to.equal(10);
		expect(res).to.have.property("results");
		expect(Array.isArray(res.results)).to.equal(true);
		expect(res.results.length).to.equal(res.resultCount);
	});
});
