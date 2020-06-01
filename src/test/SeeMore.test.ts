import { movieApi, tvApi } from "../lib/api";
import { uniqBy, uniq } from "lodash";
describe("data Test", () => {
  /*   it("get 3pages", async () => {
    let data: any[] = [];
    for (let index = 1; index < 10; index++) {
      const {
        data: { results },
      } = await movieApi.nowPlaying(index);
      const mergedData = data.concat(...results);
      data = uniq(mergedData);
    }
    const test = [{'id':1},{'id':1},{'id':1},{'id':1},{'id':3},{'id':4}];
    const test2 = [{'id':1},{'id':1},{'id':2}];
    const test3 = test.concat(test2);
    const test4 = test3.filter(item=> {return test3.map(tem=>(tem.id === item.id)?null:item)});
    console.log(test4);
    console.log(data.length);
  }); */
  it("get season", async () => {
    const {
      data: { episodes },
    } = await tvApi.season(85937, 1);
    console.log(episodes);
    const random = Math.floor(Math.random() * episodes.length);
    console.log(random);
  });
});
