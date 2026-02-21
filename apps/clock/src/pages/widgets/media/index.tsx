import React from 'react'

import MediaMD01 from './md/media-01'
import MediaMD02 from './md/media-02'
import MediaMD03 from './md/media-03'
import MediaMD04 from './md/media-04'
import MediaMD05 from './md/media-05'
import MediaSM01 from './sm/media-01'
import MediaSM02 from './sm/media-02'
import MediaSM03 from './sm/media-03'
import MediaSM04 from './sm/media-04'
import MediaSM05 from './sm/media-05'
import MediaSM06 from './sm/media-06'
import MediaSM07 from './sm/media-07'
import MediaSM08 from './sm/media-08'

const Media = () => {
  return (
    <div>
      <h1 className="text-center text-2xl font-semibold">Media</h1>
      <h2 className="text-lg font-bold">sm</h2>
      <br></br>

      <div className="grid grid-cols-3 justify-center gap-5">
        <MediaSM01 />
        <MediaSM02 />
        <MediaSM03 />
        <MediaSM04 />
        <MediaSM05 />
        <MediaSM06 />
        <MediaSM07 />
        <MediaSM08 />
      </div>
      <h2 className="py-4 text-lg font-bold">md</h2>
      <br></br>

      <div className="grid justify-center gap-5">
        <MediaMD01 />
        <MediaMD02 />
        <MediaMD03 />
        <MediaMD04 />
        <MediaMD05 />
      </div>
    </div>
  )
}

export default Media
