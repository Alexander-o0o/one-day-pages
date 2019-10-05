
(function (){
  const sendMessage = (message, source) => {
    source.dispatchEvent(new CustomEvent(
      message,
      { "bubbles": true, "cancelable": true }
    ));
  };

  (function _mainHeader(){
    const shortClass = 'main-header--short';
    const menuFadedClass = 'main-header__menu--faded';
    const menuOpenedClass = 'main-header__menu--opened';
    const mainHeader = document.querySelector('.main-header');
    const mainHeaderMenu = document.querySelector('.main-header__menu');
    const mainHeaderMenuContent = document.querySelector('.main-header__menu-content');
    let lastScrollTop = document.scrollingElement.scrollTop;

    const onScroll = event => {
      if (event.target === document)
      {
        const { scrollTop } = document.scrollingElement;
        if (scrollTop - lastScrollTop > 0 && scrollTop !== 0) {
          if (!(mainHeader.classList.contains(shortClass))) {
            mainHeader.classList.add(shortClass);
          }
        } else {
          if (mainHeader.classList.contains(shortClass)) {
            mainHeader.classList.remove(shortClass);
          }
        }
        lastScrollTop = scrollTop;
      }
    }

    const menuFadein = event => {
      mainHeaderMenu.classList.add(menuFadedClass);
      event.stopPropagation();
    };
    const menuFadeout = event => {
      mainHeaderMenu.classList.remove(menuFadedClass);
      event.stopPropagation();
    };

    const menuOpen = event => {
      const viewportHeight = Math.max(
        document.documentElement.clientHeight, window.innerHeight || 0
      );
      const mainRect = mainHeaderMenu.getBoundingClientRect();
      const contentRect = mainHeaderMenuContent.getBoundingClientRect();
      const desiredHeight = (contentRect.top - mainRect.top) + contentRect.height - 1;
      mainHeaderMenu.style.setProperty(
        'height',
        `${mainRect.top + desiredHeight > viewportHeight - 5
          ? viewportHeight - 5 - mainRect.top
          : desiredHeight
        }px`
      );
      mainHeaderMenu.classList.add(menuOpenedClass);
      event.stopPropagation();
    };

    const menuClose = event => {
      mainHeaderMenu.style.removeProperty('height');
      mainHeaderMenu.classList.remove(menuOpenedClass);
      event.stopPropagation();
    };

    document.addEventListener('scroll', onScroll);
    mainHeaderMenu.addEventListener('searchBox_beforeOpen', menuFadein);
    mainHeaderMenu.addEventListener('searchBox_afterClose', menuFadeout);
    mainHeaderMenu.addEventListener('barCrossButton_beforeCross', menuOpen);
    mainHeaderMenu.addEventListener('barCrossButton_afterBar', menuClose);
  })();

  (function _barCrossButton(){
    const crossClass = 'bar-cross-button--is-cross';
    const barCrossButtons = document.querySelectorAll('.bar-cross-button');

    barCrossButtons.forEach(b => {
      let state = 'bar'
      const onClick = event => {
        event.preventDefault();
        switch(state) {
          case 'bar':
            sendMessage('barCrossButton_beforeCross', b)
            b.classList.add(crossClass);
            state = 'cross';
            break;
          case 'cross':
            b.classList.remove(crossClass);
            sendMessage('barCrossButton_afterBar', b)
            state = 'bar';
            break;
          default:
        }
      }
      b.addEventListener('click', onClick)
    })
  })();

  (function _searchBox(){
    const openedClass = 'search-box--opened';
    const searchBoxOpens = document.querySelectorAll('.search-box__open');
    const searchBoxCloses = document.querySelectorAll('.search-box__close');

    const onOpenClick = event => {
      event.preventDefault();
      sendMessage('searchBox_beforeOpen', event.currentTarget);
      event.currentTarget.parentElement.classList.add(openedClass);
    };
    const onCloseClick = event => {
      event.preventDefault();
      event.currentTarget.parentElement.classList.remove(openedClass);
      sendMessage('searchBox_afterClose', event.currentTarget);
    };

    searchBoxOpens.forEach(o => { o.addEventListener('click', onOpenClick); });
    searchBoxCloses.forEach(o => { o.addEventListener('click', onCloseClick); });
  })();

  (function _slider(){
    const SLIDE_DURATION = 10000;

    const setActiveSlide = (slider, index) => {
      const slidesItems = slider.querySelectorAll('.slider__slides-item');
      const sliderButtons = slider.querySelectorAll('.slider__button');
      const slidesList = slider.querySelector('.slider__slides-list-content');

      const activeItemClass = 'slider__slides-item--active';
      const activeButtonClass = 'slider__button--active';

      slidesItems.forEach(i => { i.classList.remove(activeItemClass); });
      sliderButtons.forEach(b => { b.classList.remove(activeButtonClass); });

      slider.activeSlideIndex = index;

      slidesItems[index].classList.add(activeItemClass);
      sliderButtons[index].classList.add(activeButtonClass);

      slidesList.style.marginLeft = `${-1 * index * 100}vw`;
    }

    const setAutoSliding = (slider, duration) => {
      const max = slider.querySelectorAll('.slider__button').length;
      slider.sliderIntervalId = setInterval(() => {
        let i = Number.parseInt(slider.activeSlideIndex);
        if (typeof i !== 'number' || i < -1 || ++i >= max) i = 0;
        setActiveSlide(slider, i);
      }, duration);
    };

    const onSliderButtonClick = event => {
      const slider = event.currentTarget.parentElement.parentElement;
      const index = Array.from(sliderButtons).indexOf(event.currentTarget);
      clearInterval(slider.sliderIntervalId);
      setActiveSlide(slider, index);
      setAutoSliding(slider, SLIDE_DURATION);
    };

    const sliders = document.querySelectorAll('.slider');
    sliders.forEach(s => {
      setActiveSlide(s, 0);
      setAutoSliding(s, SLIDE_DURATION);
    });

    const sliderButtons = document.querySelectorAll('.slider__button');
    sliderButtons.forEach(b => { b.addEventListener('click', onSliderButtonClick); });

  })();
})();