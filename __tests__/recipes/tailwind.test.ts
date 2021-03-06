import tap from "tap";
import { createFile, outputFile, readFile, remove } from "fs-extra";
import { recipeTailwind } from "../../src/recipes/tailwind";
import { APP_TSX } from "../../src/helpers/source";
import setupDirectory from "../setup-dir";

tap.beforeEach((done) => {
	setupDirectory();
	done();
});

tap.test("should create files", async (t) => {
	await recipeTailwind();
	t.matchSnapshot(await readFile("styles/tailwind.css", "utf-8"));
	t.matchSnapshot(await readFile("tailwind.config.js", "utf-8"));
	t.matchSnapshot(await readFile("postcss.config.js", "utf-8"));
	t.matchSnapshot(await readFile("package.json", "utf-8"));
	t.matchSnapshot(await readFile("pages/_app.js", "utf-8"));
	t.end();
});

tap.test("should create typescript files", async (t) => {
	await createFile("tsconfig.json");
	await remove("pages/_app.js");
	await outputFile("pages/_app.tsx", APP_TSX);
	await recipeTailwind();
	t.matchSnapshot(await readFile("tailwind.config.js", "utf-8"));
	t.matchSnapshot(await readFile("pages/_app.tsx", "utf-8"));
	t.end();
});
