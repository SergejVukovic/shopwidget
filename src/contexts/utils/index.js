export function persistState(key, state) {
    localStorage.setItem(key, JSON.stringify(state));
}

export function getPersistentState(key){

    const state = localStorage.getItem(key);

    if(state) {
        return JSON.parse(state);
    }

    return null
}
