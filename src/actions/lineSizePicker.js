import {
    SET_LINE_WIDTH 
} from "constants/whiteboard";

export function setLineWidth(lineWidth) {
    return {
        type: SET_LINE_WIDTH,
        lineWidth
    };
}