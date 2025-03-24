import { Plus } from 'lucide-react'

const FabCourse = ({ onClick }:{onClick: ()=> void}) => {
    return (
        <div onClick={onClick} className='w-12 h-12 rounded-2xl border-2 fixed bottom-18 right-6 flex items-center justify-center text-primary bg-dark-bg'>
            <Plus className='w-8 h-8' />
        </div>
    )
}

export default FabCourse