import * as React from 'react';
import { debounce } from 'lodash';

const getBoundingClientRect = (element) => {
  const {
    top,
    right,
    bottom,
    left,
    width,
    height,
    x,
    y,
  } = element.getBoundingClientRect();
  return { top, right, bottom, left, width, height, x, y };
};

const useContainerDimensions = () => {
  const ref = React.useRef();
  const [dimension, setDimension] = React.useState({});

  React.useLayoutEffect(() => {
    if (ref.current && ref.current.getBoundingClientRect) {
      const rect = getBoundingClientRect(ref.current);
      // const rect = ref.current.getBoundingClientRect()
      setDimension(rect);
    }
  }, [ref.current]);

  // // measure position once
  // React.useEffect(() => {
  //   console.log('Measured container position');
  //   setPosition({ x: e.clientX, y: e.clientY });
  // }, []);

  return [ref, dimension];
};

// const useDragOverPosition = () => {
//   const [dragOverPosition, setDragOverPosition] = React.useState({
//     x: 0,
//     y: 0,
//   });

//   React.useEffect(() => {
//     const updatePosition = (e) => {
//       setDragOverPosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('dragover', updatePosition);

//     return () => {
//       window.removeEventListener('dragover', updatePosition);
//     };
//   }, []);
//   React.useEffect(() => {
//     const removeOverPosition = () => {

//       setDragOverPosition(null);
//     };
//     window.addEventListener('dragend', removeOverPosition);

//     return () => {
//       window.removeEventListener('dragend', removeOverPosition);
//     };
//   }, []);

//   return dragOverPosition;
// };

// const useMousePosition = () => {
//   const [position, setPosition] = React.useState({ x: 0, y: 0 });

//   React.useEffect(() => {
//     const updatePosition = (e) => {
//       setPosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener('mousemove', updatePosition);

//     return () => {
//       window.removeEventListener('mousemove', updatePosition);
//     };
//   }, []);

//   return position;
// };
// const useMouseStatusDown = (position) => {
//   const [statusDown, setStatusDown] = React.useState(false);

//   React.useEffect(() => {
//     const addDown = () => {

//       setStatusDown(true);
//     };
//     window.addEventListener('dragstart', addDown);

//     return () => {
//       window.removeEventListener('dragstart', addDown);
//     };
//   }, []);
//   React.useEffect(() => {
//     const removeDown = () => {

//       setStatusDown(false);
//     };
//     window.addEventListener('dragend', removeDown);

//     return () => {
//       window.removeEventListener('dragend', removeDown);
//     };
//   }, []);
//   return statusDown ? position : null;
// };

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const useWindowDimensions = (debounceMs = 0) => {
  // dims in state
  const [dimensions, setDimensions] = React.useState(getWindowDimensions());

  // debounce
  const handleResize = () => {
    setDimensions(getWindowDimensions());
  };
  const debouncedHandleResize = debounce(handleResize, debounceMs);

  // effect to update via listener
  React.useEffect(() => {
    window.addEventListener('resize', debouncedHandleResize);

    return () => window.removeEventListener('resize', debouncedHandleResize); // cleanup
  }, []);

  // return values
  return dimensions;
};

export default useContainerDimensions;
export { useWindowDimensions };
