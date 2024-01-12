export const userLocalServ = {
    get: () => {
        const data = localStorage.getItem('ptr-user')
        return (data) ? JSON.parse(data) : null
    },
    set: (data: any) => { localStorage.setItem('ptr-user', JSON.stringify(data)) },
    updateInfo: (newUserInfo: any) => {
        const userInfo = localStorage.getItem('ptr-user')
        if (!userInfo) {
            return
        }
        let parseUserInfo = JSON.parse(userInfo)
        parseUserInfo.user = newUserInfo
        localStorage.setItem('ptr-user', JSON.stringify(parseUserInfo))
    },
    remove: () => { localStorage.removeItem('ptr-user') },
}