import React, { useState } from 'react';
import Popup from "./components/Popup";

function App() {

  const [open, setOpen] = useState(false);
  const [render, setRender] = useState(true);

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
    <div className="w-[500px] h-[500px] bg-red-500">
      <Popup content={content2} placement='right' className="z-[1003]" backdrop={false} trigger="click" clickOutsideToClose>
        <button className='bg-blue-700 p-2 text-white w-full' onClick={() => setOpen(false)}>Button</button>
      </Popup>
      <Popup content={content3} placement='right' className="z-[1003]" backdrop={false} trigger="click" clickOutsideToClose>
        <button className='bg-blue-700 p-2 text-white w-full'>Button</button>
      </Popup>
    </div>
  )

  return (
    <div className="w-[2000px] h-[2000px] m-auto text-center p-10 pt-[800px] bg-slate-800">
      {
        render &&
        <Popup content={content} placement='left' open={open} onOpenChange={setOpen}>
          <button className='bg-blue-700 p-2 text-white'>Button</button>
        </Popup>
      }
      <button className='bg-rose-600 p-2 text-white fixed z-[2000] top-0 left-0' onClick={() => setRender(false)}>Destroy</button>
    </div>
  );
}

export default App;
