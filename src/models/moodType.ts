import { MoodModel } from "./mood";

export const MoodType = {
    AWFUl: new MoodModel(4,'Awful','assets/imgs/mood-awful.svg'),
    DOWN: new MoodModel(3,'Down','assets/imgs/mood-down.svg'),
    MEH: new MoodModel(2,'Meh','assets/imgs/mood-meh.svg'),
    CONTENT: new MoodModel(1,'Content','assets/imgs/mood-content.svg'),
    RAD: new MoodModel(0,'Rad','assets/imgs/mood-rad.svg'),
}

export const ListMoodType : Array<MoodModel> = 
    [
        MoodType.AWFUl,
        MoodType.DOWN,
        MoodType.MEH,
        MoodType.CONTENT,
        MoodType.RAD
    ]
