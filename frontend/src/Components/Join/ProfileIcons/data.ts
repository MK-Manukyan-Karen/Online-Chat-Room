import icon1 from '../../../Assets/user-icons/avatar1.png'
import icon2 from '../../../Assets/user-icons/avatar2.png'
import icon3 from '../../../Assets/user-icons/avatar3.png'
import icon4 from '../../../Assets/user-icons/avatar4.png' 


type avatarType = {
   iconSrc : string,
   icon:string
   id : string
}

export const data:Array<avatarType> = [
    
    {   id : '1',
        iconSrc : 'avatar1.png',
        icon : icon1
    },
    {
        id : '2',
        iconSrc : 'avatar2.png',
        icon : icon2
    },
    {
        id : '3',
        iconSrc : 'avatar3.png',
        icon : icon3
    },
    {
        id : '4',
        iconSrc : 'avatar4.png',
        icon : icon4
    }

]