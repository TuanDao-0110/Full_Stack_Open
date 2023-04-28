const initialState = ''
const reducer = (state = initialState, action) => {
    let { type, payload } = action
    switch (type) {
        case 'FILTER':
            return state = payload.content
        default:
            return state
    }
}
export const createFilter = (content) => {
    return {
        type: 'FILTER',
        payload: {
            content
        }
    }
}
export default reducer