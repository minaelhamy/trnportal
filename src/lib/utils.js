import gravatar from 'gravatar'

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false
    }
    return true
}

function getGravatarUrl(email, secure) {
    const url = gravatar.url(email, {s: '100', r: 'x', d: 'retro'}, secure)
    return url
}

export { isEmpty, getGravatarUrl }