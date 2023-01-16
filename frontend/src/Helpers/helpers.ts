import sound from '../Assets/sounds/newMessage.wav'

export const messageSound = () => {
   const soundMessage = new Audio(sound)
   soundMessage.volume = 0.4
   soundMessage.play()
}