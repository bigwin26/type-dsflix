import {movieApi} from '../lib/api'

describe('data Test',()=>{
    it('get 2pages',async ()=>{
        let results:any = [];
        const {data: { results:nowPlaying1 }} = await movieApi.nowPlaying(1);
        const {data: { results:nowPlaying2 }} = await movieApi.nowPlaying(2);
        console.log(results);
    })
})