declare module "*.jpg" {
    const content: string;
    export default content;
}

declare module "*.wav" {
  const content: string;
  export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

declare module "*.module.css";

declare namespace JSX {
    interface IntrinsicElements {
      "img": HTMLAttributes & {
        alt: string,
        src: string
      }
    }
  }

declare module 'react-scroll-to-bottom';