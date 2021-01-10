# itunes-api-js

Simple promise-based library that provides helper functions and request validation for the [iTunes Search API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/index.html) and the [iTunes Lookup API](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/LookupExamples.html#//apple_ref/doc/uid/TP40017632-CH7-SW1).

## Installation

itunes-api-js is intended for use in the browser and does not support Node.

## Usage

Import the package:

```js
import iTunes from "itunes-api-js";
```

### Search

The search method takes a required search `term` and optional `addlParam` object and returns a promise:

```js
iTunes.search(term, addlParam);

// Examples
iTunes.search("Pheobe Bridgers");
iTunes.search("Phoebe Bridgers", { entity: "song", limit: 10 });
```

| `addlParam` property | type   | value                                                                                                                 |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| country              | String | [ISO 3166-1 alpha-2 country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)                                   |
| media                | String | [List](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html) |
| entity               | String | [List](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html) |
| attribute            | String | [List](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html) |
| limit                | Number | 1 to 200                                                                                                              |
| lang                 | String | `en_us` or `ja_jp`                                                                                                    |
| version              | Number | 1 or 2                                                                                                                |
| explicit             | String | `yes` or `no`                                                                                                         |

### Lookup

There are several lookup methods corresponding to the different types of identifiers supported by the iTunes API:

- `iTunes.lookup.id(id, addlParam)`: iTunes or App Store ID
- `iTunes.lookup.url(url, addlParam)`: iTunes or Apple Music URL
- `iTunes.lookup.upc(upc, addlParam)`: Universal Product Code (barcode)
- `iTunes.lookup.isbn(isbn, addlParam)`: ISBN-13 (ISBN-10 appears to work, but the [documentation](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/LookupExamples.html) claims otherwise)
- `iTunes.lookup.amgArtistId(id, addlParam)`: All Music Guide artist ID
- `iTunes.lookup.amgAlbumId(id, addlParam)`: All Music Guide album ID
- `iTunes.lookup.amgVideoId(id, addlParam)`: All Music Guide video ID

Lookup requests are faster and more accurate than search requests. Each lookup method returns a promise and takes an identifier, such as an iTunes ID, or an array of identifiers and a second optional parameter called `addlParam` which can be used to specify additional search options:

| `addlParam` property | type   | value                                                                                                                 |
| -------------------- | ------ | --------------------------------------------------------------------------------------------------------------------- |
| entity               | String | [List](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/iTuneSearchAPI/Searching.html) |
| limit                | Number | 1 to 200                                                                                                              |
| sort                 | String | `"recent"`                                                                                                            |

```js
// Examples
iTunes.lookup.id("1033453223", { entity: "song", limit: 25, sort: "recent" });
iTunes.lookup.id(["1543461018", "1543461013"]);
```
