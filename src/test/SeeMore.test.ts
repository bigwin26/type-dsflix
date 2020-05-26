import { movieApi } from "../lib/api";

describe("data Test", () => {
  it("get 3pages", async () => {
    let data: any[] = [];
    for (let index = 1; index < 4; index++) {
      const {
        data: { results },
      } = await movieApi.nowPlaying(index);
      results.map((movie: any) => data.push(movie));
    }
    console.log(data);
    console.log(data.length);
  });
});
