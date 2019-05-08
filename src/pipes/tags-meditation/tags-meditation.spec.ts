import {TagsMeditationPipe} from "./tags-meditation";
import { MeditationModel } from "../../models/Meditation";

describe("Test for tags-meditation pipe", ()=>{
    let pipe: TagsMeditationPipe;
    const meditationsWithTags:Array<MeditationModel> = new Array<MeditationModel>();
    const meditationsWithoutTags:Array<MeditationModel> = new Array<MeditationModel>();
    const meditationsWithMixTags:Array<MeditationModel> = new Array<MeditationModel>();

    beforeAll(()=>{
        pipe = new TagsMeditationPipe();
        const meditationWithoutTags:MeditationModel = new MeditationModel();
        const meditationWithTags1:MeditationModel = new MeditationModel();
        const meditationWithTags2:MeditationModel = new MeditationModel();
        meditationWithTags1.tags = 'Growth,Relationships';
        meditationWithTags2.tags = 'Growth,Sleep';
        
        meditationsWithTags.push(meditationWithTags1);
        meditationsWithTags.push(meditationWithTags2);

        meditationsWithoutTags.push(meditationWithoutTags);
        meditationsWithoutTags.push(meditationWithoutTags);
        meditationsWithoutTags.push(meditationWithoutTags);

        meditationsWithMixTags.push(meditationWithTags2);
        meditationsWithMixTags.push(meditationWithoutTags);
        meditationsWithMixTags.push(meditationWithTags1);

    });    

    it("should return correct size of meditations list", ()=>{
        expect(meditationsWithTags.length).toBe(2);
        expect(meditationsWithoutTags.length).toBe(3);
        expect(meditationsWithMixTags.length).toBe(3);
    });

    it("should filter list without tags", ()=>{
        expect(pipe.transform(meditationsWithoutTags,'Sleep').length).toBe(0);
        expect(pipe.transform(meditationsWithoutTags,'').length).toBe(3);
    });

    
    it("should filter list with tags", ()=>{
        expect(pipe.transform(meditationsWithTags,'').length).toBe(2);
        expect(pipe.transform(meditationsWithTags,'Sleep').length).toBe(1);
        expect(pipe.transform(meditationsWithTags,'Growth').length).toBe(2);
        expect(pipe.transform(meditationsWithTags,'xx').length).toBe(0);
    });


    it("should filter list with mix tags", ()=>{
        expect(pipe.transform(meditationsWithMixTags,'').length).toBe(3);
        expect(pipe.transform(meditationsWithMixTags,'Sleep').length).toBe(1);
        expect(pipe.transform(meditationsWithMixTags,'Growth').length).toBe(2);
        expect(pipe.transform(meditationsWithMixTags,'XX').length).toBe(0);
    });    
   
});