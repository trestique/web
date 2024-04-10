$(function () {
  var duration1 = 2000;
  var duration2;
  var marginTopLeftPincel1 = '100';
  var transformCenterPincel = 'matrix(1, 0, 0, 1, -13, 40)';
  var transformRightPincel2 = 'matrix(1, 0, 0, 1, -5, 0)';
  var valuesPencilTopOpen = {
      tampa: '-=200',
      refil: '-=100',
      fundo3: '+=400',
      fundo1: '+=440',
      fundo2: '+=440'
  }

  var valuesPencilTopClose = {
      tampa: '+=200',
      refil: '+=100',
      fundo3: '-=200',
      fundo1: '-=240',
      fundo2: '-=240'
  }

  switch (true) {
      case (screen.width <= 580):
          // console.log("-580px");
          duration2 = 3120;
          marginTopLeftPincel1 = '50';
          transformCenterPincel = 'matrix(1, 0, 0, 1, -23, 80)';
          transformRightPincel2 = 'matrix(1.9, 0, 0, 1.9, 165, -210)';

          valuesPencilTopOpen.tampa = '-=300'
          valuesPencilTopOpen.refil = '-=200'
          valuesPencilTopOpen.fundo3 = '+=600'
          valuesPencilTopOpen.fundo1 = '+=640'
          valuesPencilTopOpen.fundo2 = '+=640'

          valuesPencilTopClose.tampa = '+=300'
          valuesPencilTopClose.refil = '+=200'
          valuesPencilTopClose.fundo3 = '-=600'
          valuesPencilTopClose.fundo1 = '-=640'
          valuesPencilTopClose.fundo2 = '-=640'


          break;
      case (screen.width <= 768):
          duration2 = 2710;

          valuesPencilTopOpen.tampa = '-=300'
          valuesPencilTopOpen.refil = '-=200'
          valuesPencilTopOpen.fundo3 = '+=600'
          valuesPencilTopOpen.fundo1 = '+=640'
          valuesPencilTopOpen.fundo2 = '+=640'

          valuesPencilTopClose.tampa = '+=300'
          valuesPencilTopClose.refil = '+=200'
          valuesPencilTopClose.fundo3 = '-=600'
          valuesPencilTopClose.fundo1 = '-=640'
          valuesPencilTopClose.fundo2 = '-=640'
      break;
      case (screen.width <= 1024):
          // console.log("-1024px");
          duration2 = 2940;
          break;
      case (screen.width <= 1400):
          // console.log("-1400px");
          duration2 = 2890;
          break;
      case (screen.width <= 1700):
          // console.log("-1700px");
          duration2 = 2795;
          break;
      case (screen.width <= 2000):
          // console.log("-2000px");
          duration2 = 2820;
          break;
      default:
          // console.log("+2000px");
          duration2 = 2840;
          break;
  }

  new ScrollMagic.Scene({
      triggerElement: "#imgBagTrigger",
      duration: duration1,
      triggerHook: 0.10,
  })
      .setPin("#imgBag", { pushFollowers: true })
      // .addIndicators("pinImgBag")
      .addTo(controller);


  new ScrollMagic.Scene({
      triggerElement: "#triggerPinAnimation",
      duration: duration2,
      triggerHook: 0,
  })
      .setPin("#textImage", { pushFollowers: false })
      // .addIndicators("pinTextImage") // add indicators (requires plugin)
      .addTo(controller);


  var tween = new TimelineMax()
      .to("#revealText1", 6, { css: { opacity: 0 }, ease: Linear.easeNone }, 0)
      .to("#revealText1", 0, { css: { height: 0 } }, 0)
      .to("#revealText2", 0, { css: { height: "auto" } }, 0)
      .to("#revealText2", 4, { css: { opacity: 1 }, ease: Linear.easeNone }, 6)

      //Open mkp
      .to("#tampa", 8, { css: { opacity: 0.2, top: valuesPencilTopOpen.tampa }, ease: Linear.easeNone }, 10)
      .to("#refil", 4, { css: { opacity: 0.2, top: valuesPencilTopOpen.refil }, ease: Linear.easeNone }, 12)
      .to("#fundo3", 8, { css: { opacity: 0.2 }, ease: Linear.easeNone }, 10)
      .to("#fundo3", 8, { top: valuesPencilTopOpen.fundo3, ease: Linear.easeNone }, 10)
      .to("#fundo1", 8, { css: { opacity: 0.2 }, ease: Linear.easeNone }, 10)
      .to("#fundo1", 8, { top: valuesPencilTopOpen.fundo1, ease: Linear.easeNone }, 10)
      .to("#fundo2", 8, { css: { opacity: 0.2 }, ease: Linear.easeNone }, 10)
      .to("#fundo2", 8, { top: valuesPencilTopOpen.fundo2, ease: Linear.easeNone }, 10)

      //Close mkp
      .to("#tampa", 8, { top: valuesPencilTopClose.tampa, opacity: 1, ease: Linear.easeNone }, 19)
      .to("#tampa", 8, { css: { opacity: 1 }, ease: Linear.easeNone }, 19)
      .to("#refil", 8, { top: valuesPencilTopClose.refil, opacity: 1, ease: Linear.easeNone }, 17)
      .to("#refil", 8, { css: { opacity: 1 }, ease: Linear.easeNone }, 17)
      .to("#fundo3", 8, { css: { opacity: 1 }, ease: Linear.easeNone }, 19)
      .to("#fundo3", 8, { top: valuesPencilTopClose.fundo3, ease: Linear.easeNone }, 19)
      .to("#fundo1", 8, { css: { opacity: 1 }, ease: Linear.easeNone }, 19)
      .to("#fundo1", 8, { top: valuesPencilTopClose.fundo1, ease: Linear.easeNone }, 19)
      .to("#fundo2", 8, { css: { opacity: 1 }, ease: Linear.easeNone }, 19)
      .to("#fundo2", 8, { top: valuesPencilTopClose.fundo2, ease: Linear.easeNone }, 19)

      .to("#revealText2", 4, { css: { opacity: 0 }, ease: Linear.easeNone }, 21)
      .to("#revealText2", 0, { css: { height: 0 } }, 21)
      .to("#revealText3", 0, { css: { height: "auto" } }, 21)
      .to("#revealText3", 4, { css: { opacity: 1 }, ease: Linear.easeNone }, 27)
      .to("#imgBag", 1, { css: { opacity: 1 }, ease: Linear.easeNone }, 27)
      .to("#fullMkp", 4, { css: { scaleX: 0.3, scaleY: 0.3, opacity: 0 }, ease: Linear.easeNone }, 27)


      .to("#rightPincel2", 4, { css: { transform: transformRightPincel2 }, ease: Linear.easeNone }, 29)
      .to("#rightPincel", 4, { css: { opacity: 1 }, ease: Linear.easeNone }, 29)
      .to("#leftPincel", 4, { css: { opacity: 1 }, ease: Linear.easeNone }, 29)
      .to("#centerImgBag", 8, { css: { marginLeft: '-240', marginRight: '-240' }, ease: Linear.easeNone }, 29)
      .to("#rightPincel1", 8, { css: { marginTop: '205' }, ease: Linear.easeNone }, 29)
      .to("#leftPincel1", 8, { css: { marginTop: marginTopLeftPincel1 }, ease: Linear.easeNone }, 29)
      .to("#centerPincel", 4, { css: { transform: transformCenterPincel }, ease: Linear.easeNone }, 29)

      .to("#revealText3", 4, { css: { opacity: 0 }, ease: Linear.easeNone }, 48)
      .to("#revealText3", 0, { css: { height: 0 } }, 48)
      .to("#revealText4", 0, { css: { height: "auto" } }, 48)
      .to("#revealText4", 4, { css: { opacity: 1 }, ease: Linear.easeNone }, 48)
      .to(['#leftPincel', '#centerImgBag', '#rightPincel'], 8, { css: { opacity: 0 }, ease: Linear.easeNone }, 48)
      .to("#closedBag", 8, { css: { opacity: 1 }, ease: Linear.easeNone }, 48)

  new ScrollMagic.Scene({
      triggerElement: "#triggerAnimation",
      duration: duration1,
  })
      .setTween(tween)
      // .addIndicators("Animation")
      .addTo(controller);

})
