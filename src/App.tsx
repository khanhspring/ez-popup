import React, { useState } from 'react';
import Popup from "./components/Popup";

function App() {

  const [open, setOpen] = useState(false);

  const content2 = (
    <div className="w-[100px] h-[500px] bg-red-500">
      2222
    </div>
  )

  const content3 = (
    <div className="w-[100px] h-[500px] bg-red-500">
      3333
    </div>
  )

  const content = (
    <div className="w-[100px] h-[500px] bg-red-500">
      <Popup content={content2} placement='right' className="z-[1003]" backdrop={false} trigger="click" clickOutsideToClose>
        <button className='bg-blue-700 p-2 text-white w-full' onClick={() => setOpen(false)}>Button</button>
      </Popup>
      <Popup content={content3} placement='right' className="z-[1003]" backdrop={false} trigger="click" clickOutsideToClose>
        <button className='bg-blue-700 p-2 text-white w-full'>Button</button>
      </Popup>
    </div>
  )

  return (
    <div className="w-[500px] h-[2000px] m-auto text-center p-10 pt-[1000px] bg-slate-800">
      <Popup content={content} placement='right' open={open} onOpenChange={setOpen}>
        <button className='bg-blue-700 p-2 text-white'>Button</button>
      </Popup>
    </div>
  );
}

export default App;
