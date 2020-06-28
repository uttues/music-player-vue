import { TOGGLE_THEME } from "./mutation-types";

export default {
    [TOGGLE_THEME] (state) {
        state.theme = state.theme === 'day' ? 'night' : 'day'
    }
}