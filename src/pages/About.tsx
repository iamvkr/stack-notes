const About = () => {
    return (
        <div className='px-4 py-18'>
            <h3 className='text-xl font-bold mt-3 underline mb-3'>About</h3>

            <p className='text-lg font-semibold leading-none sm:text-xl xl:max-w-3xl text-gray-50 mt-0'>
                Hi There! Iam vkr, I build this app for the students and working professionals to keep their learning resources and notes organised at single place.
                <br />
                <br />
                You can also convert Playlist to a course like structure to keep track of your learning progress!
                <br />
                <br />
                If you like the app, share to your friends too!
                <br />
                <a href={'https://github.com/iamvkr'} target='_blank' className='text-xs text-center md:text-start w-full md:w-auto inline-block underline mt-4'>Github</a>
            </p>

            <h3 className='text-xl font-bold mt-3 underline mb-4'>Add to Home screen</h3>

            <p className='text-lg font-semibold leading-none sm:text-xl xl:max-w-3xl text-gray-50 mt-0'>
                - Navigate to the URL in your browser, then tap the menu (usually three dots).
                <br />
                <br />
                - Select "Add to Home Screen" or a similar option.
                <br />
                <br />
                - Then Tap "Add" to confirm
            </p>
        </div>
    )
}

export default About