import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import YouTube, { YouTubeEvent } from 'react-youtube'
import { usefileContext } from '../context/FilesContext';
import { CheckCircle, Play } from 'lucide-react';
import { saveToDbCourses } from '../lib/db';

const PlayCourse = () => {
  const { pid } = useParams();
  const { courses, setCourses } = usefileContext();
  // to find arr of completed from courses:
  const targetCourse = useMemo(() => (courses.find(item => item.pid === pid)), [pid, courses])
  let completedArrSet = new Set((targetCourse?.completed as number[]) || []);

  type sd = {
    vid: string,
    title: string,
    channel: string,
  }
  const [sectionData, setsectionData] = useState<sd[]>([])
  const [isPlayingIndex, setisPlayingIndex] = useState(0)
  const [playAtIndex, setplayAtIndex] = useState(() => (index: number) => { console.log(index) })

  const handleReady = (event: YouTubeEvent) => {

    /** code to generate playlist video list */
    const videoIdArrs = (event.target.getPlaylist());
    // check for cache:
    const cacheSTR = sessionStorage.getItem("courseDATA")
    if (cacheSTR && pid) {
      const cache = JSON.parse(cacheSTR);
      if (cache && cache[pid]) {
        console.log("using cached data:");
        setsectionData(cache[pid])
      }
    } else {
      // fetch:
      fetchVideoTitles(videoIdArrs,)
    }
    /** code to set playAtIndex feture: */
    setplayAtIndex(() => (index: number) => { event.target.playVideoAt(index) })
  }

  const fetchVideoTitles = async (videoIdArrs: string[]) => {
    // const s = new Set(completedArr)
    function createPromise(vid: string) {
      return fetch(`https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${vid}&format=json`)
    }
    const pmArr = videoIdArrs.map((id: string) => createPromise(id));
    const res = await Promise.all(pmArr);
    const k = []
    for (let i = 0; i < res.length; i++) {
      const data = await res[i].json();
      k.push({
        vid: videoIdArrs[i],
        title: data.title,
        channel: data.author_name,
      })
    }
    setsectionData(k)
    // cache:
    if (typeof pid === "string") {
      sessionStorage.setItem("courseDATA", JSON.stringify({
        [pid]: k
      }))
    }
  }

  const toggleSaveVideo = async (index: number) => {
    const updatedCOURSE = courses.map(item => {
      if (item.pid === pid && Array.isArray(item.completed)) {
        return {
          ...item,
          completed: item.completed.includes(index) ? item.completed.filter(cm => cm !== index) : [...item.completed, index]
        }
      } else {
        return item;
      }
    });
    // update state
    setCourses(updatedCOURSE);
    // updte to db:
    const res = await saveToDbCourses(updatedCOURSE);
    if (res) {
      console.log("db updated!");
    }
  }

  return (
    <>
      <div className='MOBILE lg:hidden py-18'>
        <div className='h-[44vh]'>
          <YouTube opts={{
            playerVars: {
              list: pid,
              listType: "playlist"
            }
          }}
            iframeClassName='w-full h-[42vh]'
            onReady={handleReady}
          />
        </div>


        <div className='min-h-[50vh] w-full px-2'>
          {sectionData && setsectionData.length > 0 && sectionData.map((item, i) => (
            <div key={i} className='border p-2 my-2 rounded-2xl'>
              <div className="grid grid-cols-[15%_70%_10%] items-center">
                <div className="checkbox w-8 h-8 border rounded-full flex items-center justify-center text-primary"
                  onClick={() => { toggleSaveVideo(i) }}>
                  {completedArrSet.has(i) && <CheckCircle className='w-6 h-6 ' />}
                </div>
                <div className={`${isPlayingIndex === i && "text-primary"}`}>{item.title}</div>
                <div className='ms-auto'
                  onClick={() => {
                    playAtIndex(i);
                    setisPlayingIndex(i);
                  }}><Play className='h-4 w-4' /></div>
                {/* <div></div> */}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='LG-device hidden lg:grid grid-cols-[70%_30%] w-full pt-18'>
        <div className='w-full'>
          <YouTube opts={{
            playerVars: {
              list: pid,
              listType: "playlist",
              rel:0
            }
          }}
            iframeClassName='w-full h-[85vh]'
            onReady={handleReady}
          />
        </div>

        <div className='h-[85vh] overflow-y-auto w-full px-2'>
          {sectionData && setsectionData.length > 0 && sectionData.map((item, i) => (
            <div key={i} className='border p-2 my-2 rounded-2xl'>
              <div className="grid grid-cols-[15%_70%_10%] items-center">
                <div className="checkbox w-8 h-8 border rounded-full flex items-center justify-center text-primary"
                  onClick={() => { toggleSaveVideo(i) }}>
                  {completedArrSet.has(i) && <CheckCircle className='w-6 h-6 ' />}
                </div>
                <div className={`${isPlayingIndex === i && "text-primary"}`}>{item.title}</div>
                <div className='ms-auto'
                  onClick={() => {
                    playAtIndex(i);
                    setisPlayingIndex(i);
                  }}><Play className='h-4 w-4' /></div>
                {/* <div></div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default PlayCourse