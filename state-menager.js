export function scope(defaultVar = {}) {

    const data = defaultVar || {}
    const effects = {}

    return [
        (id = "") => data[id],
        (id = "", newVar) => {
            data[id] = newVar
            if (effects[id]) {
                effects[id].forEach(handler => handler());
            }
        },
        (handler = () => undefined, ids = [""]) => {
            ids.forEach(id => {
                if (!effects[id]) {
                    effects[id] = []
                }
                effects[id] = effects[id].filter(h => h != handler)
                effects[id].push(handler)
            })
        },
    ]

}

export function _var(defaultVar) {

    var data = defaultVar
    var effects = []

    return [
        () => data,
        (newVar) => {
            data = newVar
            if (effects) {
                effects.forEach(handler => handler());
            }
        },
        (handler = () => undefined) => {
            effects = effects.filter(h => h != handler)
            effects.push(handler)
        },
    ]

}