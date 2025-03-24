import { BookMarked, FileStack, ListVideo, PackageOpen, ShieldCheck, WifiOff } from 'lucide-react'

const HomeUI = ({ setisOpenUserModal, userName }: { setisOpenUserModal: (isOpen: boolean) => void, userName: string }) => {
    function GetDate() {
        return new Date().getFullYear()
    }
    return (
        <>
            {/* HERO SECTION */}
            <section>
                <div className="bg-emerald-600 rounded-xl min-h-[60vh] md:max-h-[70vh]">
                    <div className="container flex flex-col items-center px-4 py-16 pb-24 mx-auto text-center lg:pb-56 md:py-32 md:px-10 lg:px-32 text-gray-900">
                        {!userName ? <h1 className="text-4xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-50">
                            StackNotes: <br /> "Your Ultimate Learning & Note Management Tool!"</h1>
                            :
                            <h1 className="text-4xl font-bold leading-none sm:text-6xl xl:max-w-3xl text-gray-50">
                                Hi {userName}, <p className='text-lg mt-3'>Click on Plus icon to get started!</p>
                                <div>
                                    <img src="/notes_light.svg" className='w-full mt-2 md:h-[30vh]' alt="" />
                                </div>
                            </h1>}

                        {!userName && <>
                            <p className="mt-6 mb-8 text-md sm:mb-12 xl:max-w-3xl text-gray-50">
                                Tired of juggling between your notes, PDFs, and YouTube playlists? With StackNotes, everything you need to stay organized and focused is in one place!
                            </p>
                            <div className="flex flex-wrap justify-center">
                                <button type="button" className="px-8 py-3 m-2 text-lg font-semibold rounded bg-gray-100 text-gray-900"
                                    onClick={() => { setisOpenUserModal(true) }}>Get started</button>
                                <button type="button" className="px-8 py-3 m-2 text-lg border rounded border-gray-300 text-gray-50"
                                    onClick={() => { setisOpenUserModal(true) }}>Learn more</button>
                            </div>
                        </>}
                    </div>
                </div>
            </section>

            {/* KEY FEATURES */}
            {!userName && <>
                <section className=" bg-gray-100 text-gray-800 rounded-2xl">
                    <div className="container mx-auto p-4 my-6 space-y-2 text-center">
                        <h2 className="text-3xl font-bold pt-20 -mt-20" id='features_home'>Key Features</h2>
                    </div>
                    <div className="container mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 pb-4">
                        <div className="flex flex-col items-center p-4">
                            <FileStack className="w-8 h-8 text-emerald-600" />
                            <h3 className="my-3 text-3xl font-semibold text-center">Seamless Resource Organization</h3>
                            <div className="space-y-1 leading-tight text-center">
                                <p>Store and manage all your notes and documents effortlessly. Keep them organized, searchable, and easy to access.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <ListVideo className="w-8 h-8 text-emerald-600" />
                            <h3 className="my-3 text-3xl font-semibold text-center">Transform Playlists into Courses</h3>
                            <div className="space-y-1 leading-tight text-center">
                                <p>Turn your favorite YouTube playlists into a course-like structure with lessons, making learning more interactive and efficient.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <BookMarked className="w-8 h-8 text-emerald-600" />
                            <h3 className="my-3 text-3xl font-semibold text-center">All-In-One Learning Hub</h3>
                            <div className="space-y-1 leading-tight text-center">
                                <p>Whether it’s research, study materials, or educational videos, StackNotes brings your learning resources together for a seamless experience.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <PackageOpen className="w-8 h-8 text-emerald-600" />
                            <h3 className="my-3 text-3xl font-semibold text-center">Free and Open Source</h3>
                            <div className="space-y-1 leading-tight text-center">
                                <p>As an open-source tool, you have the freedom to customize it to fit your needs, and you’re always in control of your learning experience.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <ShieldCheck className="w-8 h-8 text-emerald-600" />
                            <h3 className="my-3 text-3xl font-semibold text-center">Secure</h3>
                            <div className="space-y-1 leading-tight text-center">
                                <p>Your privacy matters. StackNotes keeps your data safe locally, ensuring your notes, PDFs, and playlists are protected from unauthorized access.</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center p-4">
                            <WifiOff className="w-8 h-8 text-emerald-600" />
                            <h3 className="my-3 text-3xl font-semibold text-center">Offline Ready</h3>
                            <div className="space-y-1 leading-tight text-center">
                                <p>Never lose access to your materials.Most of the StackNotes features works seamlessly offline, so you can study or manage your notes without an internet connection.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-6 dark:bg-emerald-600 dark:text-gray-50">
                    <div className="container mx-auto flex flex-col items-center justify-center p-4 space-y-8 md:p-10 md:px-24 xl:px-48">
                        <h1 className="text-3xl font-bold leading-none text-center">What Makes StackNotes Stand Out?</h1>
                        <p className="pt-2 pb-8 text-md text-center">StackNotes isn’t just another note-taking app. It’s a comprehensive learning management system designed to help you stay organized and focused. Whether you’re a student, professional, or lifelong learner, StackNotes brings all your resources into one streamlined platform, making it easier than ever to manage your educational materials.</p>
                        <button className="px-8 py-3 text-lg font-semibold rounded bg-primary text-gray-900"
                            onClick={() => { setisOpenUserModal(true) }}>Get Started
                        </button>
                    </div>
                </section>

                {/* MORE FEATURES */}
                <div className="bg-gray-100 text-gray-800 rounded-2xl">
                    <div className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-extrabold sm:text-4xl">Features That Make a Difference</h2>
                        </div>
                        <dl className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-emerald-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <div className="ml-3">
                                    <dt className="text-lg font-medium">Effortless Note Organization</dt>
                                    <dd className="mt-2 text-gray-600">Organize your notes, documents, and PDFs by subject, topic, or custom categories. Quickly search and access your materials anytime.</dd>
                                </div>
                            </div>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-emerald-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <div className="ml-3">
                                    <dt className="text-lg font-medium">YouTube Playlist to Course Conversion</dt>
                                    <dd className="mt-2 text-gray-600">No more hopping between apps! StackNotes converts YouTube playlists into interactive courses with structured lessons for a better learning experience.</dd>
                                </div>
                            </div>
                            <div className="flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-emerald-600">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <div className="ml-3">
                                    <dt className="text-lg font-medium">Study Tools & Management</dt>
                                    <dd className="mt-2 text-gray-600">Stay ahead in your learning journey with our Managed study tools.</dd>
                                </div>
                            </div>
                        </dl>
                    </div>
                </div>

                {/* FOOTER */}
                <footer className="px-4  mt-2">
                    <div className="pt-6 text-sm text-center text-gray-400">© {<GetDate />} StackNotes All rights reserved.</div>
                    <div className="pb-3 text-sm text-center text-gray-400">Made With 🤍 By <a href="https://github.com/iamvkr" className='underline'>iamvkr</a></div>
                </footer>
            </>}
        </>
    )
}

export default HomeUI