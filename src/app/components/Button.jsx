// "use client"
// import { useEffect, useRef } from 'react';

// const NeonButton = () => {
//   const buttonRef = useRef(null);

//   useEffect(() => {
//     const button = buttonRef.current;

//     const handleClick = (e) => {
//       const ripple = document.createElement('span');
//       ripple.classList.add('ripple');
//       const rect = button.getBoundingClientRect();
//       const size = Math.max(rect.width, rect.height);
//       ripple.style.width = ripple.style.height = `${size}px`;
//       ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
//       ripple.style.top = `${e.clientY - rect.top - size / 2}px`;
//       button.appendChild(ripple);
//       ripple.addEventListener('animationend', () => ripple.remove());
//     };

//     button?.addEventListener('click', handleClick);

//     return () => {
//       button?.removeEventListener('click', handleClick);
//     };
//   }, []);

//   return (
//     <button ref={buttonRef} className={neon-button}>
//       Neon Button
//     </button>
//   );
// };