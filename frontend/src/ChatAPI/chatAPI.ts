import axios from 'axios'

let instance = axios.create({
	baseURL: 'https://Your-Server-API-URI',
	// withCredentials : true ,
})

export const chatAPI = {
	createRoom(
		roomName: string,
		userName: string,
		socketID: string,
		meAvatar: string
	) {
		return instance
			.post(`/chatRoom/`, {
				roomName,
				userName,
				socketID,
				meAvatar,
			})
			.then(res => res.data)
			.catch(error => {
				console.log(error)
			})
	},

	getRoomUsersAndMessages(roomName: string) {
		return instance
			.get(`/chatRoom/${roomName}`)
			.then(res => res.data)
			.catch(error => {
				console.log(error)
			})
	},
}
