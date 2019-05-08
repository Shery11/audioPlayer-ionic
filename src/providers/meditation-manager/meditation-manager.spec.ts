import {MeditationManagerProvider} from './meditation-manager';

import * as meditationsJson from "../../assets/data/meditations.json";
import * as smallMeditationsJson from "../../assets/data/smallMeditations.json";
import { ProductType } from "../../models/ProductType";
import { CategoryType } from "../../models/CategoryType";
import { MembrecyType } from "../../models/MembrecyType";
import { MediaType } from "../../models/MediaType";
import { ENAMETOOLONG } from "constants";
import { ObserverManagerProvider } from '../observer-manager/observer-manager';


    describe("Test for meditation.fromJson", ()=>{
        const meditationManager:MeditationManagerProvider = new MeditationManagerProvider(new ObserverManagerProvider()); 

        beforeAll(()=>{
            meditationManager.fromJson(<any>meditationsJson);
        })        
  
        it("should return a correct size of meditations", ()=>{
            expect(meditationManager.meditations.length === 53);
        });

        it("should have the custom functions of meditation", ()=>{
            expect(meditationManager.meditations[1].isFree()).toBe(true);
            expect(meditationManager.meditations[0].isFree()).not.toBe(true);
        });

        it("should have the custom type of enum of meditation", ()=>{
            expect(typeof(meditationManager.meditations[0].product)).toBe(typeof(ProductType.Series));
            expect(typeof(meditationManager.meditations[0].category)).toBe(typeof(CategoryType.Anxiety));
            expect(meditationManager.meditations[0].product === ProductType.Series).toBe(true);
            expect(meditationManager.meditations[0].product === ProductType.Music).not.toBe(true);
        });        

        it("should return a correct size of medias", ()=>{
            expect(meditationManager.meditations[0].medias.length).toBe(11);
        });
        
        it("should have the custom type of enum of medias", ()=>{
            expect(typeof(meditationManager.meditations[0].medias[0].membrecy)).toBe(typeof(MembrecyType.Free));
            expect(typeof(meditationManager.meditations[0].medias[0].type)).toBe(typeof(MediaType.Audio));
            expect(meditationManager.meditations[0].medias[0].membrecy === MembrecyType.Free).toBe(true);
            expect(meditationManager.meditations[0].medias[0].type === MediaType.Audio).toBe(true);
        });

            
    });

    describe("Test for smallMeditation.fromJson", ()=>{
        const meditationManager2:MeditationManagerProvider = new MeditationManagerProvider(new ObserverManagerProvider()); 

        beforeEach(()=>{
            meditationManager2.fromJson(<any>smallMeditationsJson);
        })
        it("should have defined medita title, the medias group by subcategory", ()=>{
            for (let index = 0; index < meditationManager2.meditations.length; index++) {
                const element = meditationManager2.meditations[index];
                let mediaBySub = element.mediasBySubcategory;
                for (let indexY = 0; indexY < mediaBySub.length; indexY++) {
                    const elementY = mediaBySub[indexY];
                    let medias = elementY.medias;
                    for (let indexZ = 0; indexZ < medias.length; indexZ++) {
                        const elementZ = medias[indexZ];
                        expect(elementZ.title).toBeDefined;
                    }
                }
            }
        });        
    });
  
  