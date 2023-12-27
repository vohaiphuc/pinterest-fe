export const userLocalServ = {
    get: () => {
        const data = localStorage.getItem('ptr-user')
        return (data) ? JSON.parse(data) : null
    },
    set: (data: any) => { localStorage.setItem('ptr-user', JSON.stringify(data)) },
    remove: () => { localStorage.removeItem('ptr-user') },
}