import ShowcaseLink from './ShowcaseLink';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Image from '../Image';

function Navigation({ previous, item }) {
  return (
    <ShowcaseLink item={item}>
      <a className={`button ${previous ? 'prev' : 'next'}`}>
        <div className="thumbnail">
          <Image
            width={item.width}
            height={item.height}
            src={item.src}
            margin={0}
            renderImage={props => {
              return (
                <TransitionGroup>
                  <CSSTransition key={props.src} timeout={100} classNames="fade">
                    <img src={item.src} />
                  </CSSTransition>
                </TransitionGroup>
              );
            }}
          />
        </div>
        <div className="arrow">{previous ? '<' : '>'}</div>
        <style jsx>{`
          a :global(.fade-enter) {
            opacity: 0.01;
          }

          a :global(.fade-enter.fade-enter-active) {
            opacity: 1;
            transition: opacity 500ms ease-in;
          }

          a :global(.fade-exit) {
            opacity: 1;
          }

          a :global(.fade-exit.fade-exit-active) {
            opacity: 0.01;
            transition: opacity 300ms ease-in;
          }
          a {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, 0.12);
          }
          a :global(img) {
            width: 100%;
          }
          .thumbnail {
            max-width: 200%;
            position: absolute;
            top: 0;
            transition: all 0.2s ease;
          }
          .thumbnail::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
          }
          .button:hover .thumbnail {
            transform: scale(1.4);
          }
          .prev .thumbnail {
            left: 0;
          }
          .next .thumbnail {
            right: 0;
          }
          .arrow {
            position: absolute;
            color: #fff;
          }
        `}</style>
      </a>
    </ShowcaseLink>
  );
}

export default Navigation;
