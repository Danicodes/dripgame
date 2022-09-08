import default_hair1 from '../../assets/Hair/cropped_hair1.png';
import default_body from '../../assets/Body/cropped_pose1.png';
import default_shirt1_pose1 from '../../assets/Tops/cropped_shirt1_pose1.png';
import default_bottom from '../../assets/Bottoms/cropped_pose1.png';
import face from '../../assets/Face/cropped_face1.png';

import './App.css';
import React from 'react';

import { useDrop, useDrag, DragPreviewImage, useDragLayer } from 'react-dnd';
import { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Contribute from '../Contribute/Contribute';
import About from '../About/About';
import Artwork from '../Artwork/Artwork';
import Navbar from '../../components/Navbar/Navbar';
import Admin from '../Admin/Admin';
import Board from '../../components/Board/Board';
import Canvas from '../../components/Canvas/Canvas';


// const originalTop = default_shirt1_pose1;

let imagePath = default_shirt1_pose1;
let originalImg = new Image();
originalImg.src = imagePath;


const picList = [{
  id: 1,
  src: default_shirt1_pose1,
  width: 134,
  height: 106, 
  category: 'Tops'
}, 
{
  id: 2,
  src: face,
  width: 94,
  height: 80, 
  category: 'Face' 
},
{
  id: 3,
  src: default_bottom
  ,  width: 106,
  height: 116 , 
  category: 'Bottom'

},
{
  id: 4,
  src: default_body
  ,  width: 161,
  height: 409 , 
  category: 'Body'
},
{
  id: 5,
  src: default_hair1
  ,  width: 141,
  height: 84 , 
  category: 'Hair'
}

]

function Picture({id, src, width, height, coords, inCloset}) {
  const style = coords ? { top: `${coords.y - height/2}px`, left: `${coords.x - width/2}px`, position: "fixed"} : {};
  
  React.useEffect(() => {
    return () => {
      console.log("Using Effect Placeholder"); // Replace with function to crop img???????
    };
  }, []);

  const [onBoard, setOnBoard] = useState(false);
  
  const [{isDragging}, dragRef] = useDrag(() => (
    {
    type: "image",
    item: {id: id},
    collect: (monitor) => {
      console.log(monitor.getItem());
      return {
      isDragging: !!monitor.isDragging()
      };
      
    },
    end: (item, monitor) => {
      if (monitor.didDrop() == true) {
        setOnBoard(true);
      }
    }


  }));
  if (inCloset == true && onBoard == true ) {
    return null;
  }

  return (
    <img ref={dragRef} src={src} 
    id={`image-${id}`} className="canvas" 
    style={{ border: isDragging ? "5px solid blue" : "0px", ...style }}>
    </img>
  );
}

// TODO: Monitor coords when item is being dragged. On click, the event coords seem to stop updating
// TODO: Change image bg to transparent, 


function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <header className='App-header'>
          <Navbar></Navbar>
        </header>
      
        <Routes>
          <Route exact path='/' element={<><Canvas></Canvas></>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contribute' element={<Contribute/>}/>
          <Route path='/artwork' element={<Artwork/>}/>
          <Route path='/admin' element={<Admin/>}/> {/*TODO:  Make admin hidden */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


// ???????????????????????
// <DragDropContext onDragEnd={(param) => {
//   const srcIndex = param.source.index;
//   const destIndex = param.destination.index;
// }}>
//   <h1>Drop Below</h1>
//   <Droppable droppableId='droppable-1'>
//     {(provided, _) => (
//       <div ref={provided.innerRef} {...provided.droppableProps}>
//         {list.map((item, i) => (
//           <Draggable key={`draggable-${item.id}`} draggableId={`draggable-${item.id}`} index={i}>
//             {(provided, snapshot) => (
//               <div id={`draggable-${item.id}`} ref={provided.innerRef} 
//                       className='itemDiv card' {...provided.draggableProps} 
//                       {...provided.dragHandleProps} >
//                <span>{item.name}</span>
//                {console.log(i)}
//               </div>
//             )}
//           </Draggable>
//         ))}
//         {provided.placeholder}
//     </div>
//     )}
 
//   </Droppable>
// </DragDropContext>