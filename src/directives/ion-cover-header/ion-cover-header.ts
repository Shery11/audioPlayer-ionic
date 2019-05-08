import { Directive, ElementRef, Renderer, Input } from '@angular/core';

@Directive({ 
  selector: '[ion-cover-header]',
})
export class IonCoverHeaderDirective {
  // inputs
  @Input('ion-cover-header') opaqueAt: number; // the value in pixels where the bar-header should be totaly opaque
  // internals
  private ionHeaderElement: HTMLElement;
  private ionContentElement: HTMLElement;
  private toolbarElement: HTMLElement;
  private toolbarBackgroundElement: HTMLElement;
  private toolbarContentElement: HTMLElement;
  private onContentScrollUnbind: Function;

  constructor(private el: ElementRef, private renderer: Renderer) {
    this.ionHeaderElement = this.el.nativeElement;
  }

  ngOnInit() {
    // default to 200
    if (!this.opaqueAt) {
      this.opaqueAt = 200;
    }
    // retrieves the different elements
    this.toolbarElement = this.queryElement(this.ionHeaderElement, '.toolbar');
    if (this.toolbarElement) {
      this.toolbarBackgroundElement = this.queryElement(this.toolbarElement, '.toolbar-background');
      this.toolbarContentElement = this.queryElement(this.toolbarElement, '.toolbar-content');
    } else {
      console.error('ionCoverHeader - no ion-navbar element found.');
      return;
    }
    // console.log(this.ionHeaderElement)
    // console.log(this.ionHeaderElement.parentElement)
    this.ionContentElement = this.queryElement(this.ionHeaderElement.parentElement, '.scroll-content');
    if (!this.ionContentElement) {
      console.error('ionCoverHeader - no .scroll-content element found. Scroll must be enabled on your ion-content.');
      return;
    }
    // inits the directive
    var _this = this;
    setTimeout(function() {
      _this.init();
    }, 0);
  }

  /**
   * applies the required style on the header bar and the content
   *
   * - set the background opacity to 0
   * - set the .toolbar-content element opacity to 0 if exists
   * - set the content padding-top property to 0
   * - bind the scroll event to the content
   */
  init(): void {
    // set header bar background opacity to 0
    // set header content opactity to 0
    this.updateAlpha(0);
    // create a class and force the content margin-top property to 0
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = '.ion-cover-header-no-margin-top { margin-top: 0px !important; } .ion-cover-header-no-after::after{display:none;}';
    document.getElementsByTagName('head')[0].appendChild(style);
    this.ionContentElement.classList.add('ion-cover-header-no-margin-top');
    this.ionHeaderElement.classList.add('ion-cover-header-no-after');
    // bind the scroll event to the content
    let cb = this.onContentScroll.bind(this);
    this.onContentScrollUnbind = this.renderer.listen(this.ionContentElement, 'scroll', cb);
  }

  /**
   * updates the background on content scroll based on scroll top
   */
  onContentScroll(e: any): void {
    let scrollTop = e.detail ? e.detail.scrollTop : (e.target ? e.target.scrollTop : null);
    this.updateAlpha(Math.min(this.opaqueAt, (scrollTop > 0 ? (this.opaqueAt - Math.max(0, (this.opaqueAt - scrollTop))) : 0)) / this.opaqueAt);
  }

  /**
   * updates the opacity of the header elements
   * 
   * @param alpha: a value between 0 and 1
   */
  updateAlpha(alpha: number): void {
    // update header bar background opacity to alpha
    this.updateBackgroundAlpha(this.toolbarBackgroundElement, alpha);
    // update the border bottom width 
    this.toolbarBackgroundElement.style.borderBottomWidth = (alpha < 1 ? 0 : 1) + 'px';
    // update header content opactity to alpha
    if (this.toolbarContentElement) {
      this.toolbarContentElement.style.opacity = '' + alpha;
    }
  }

  ngOnDestroy() {
    this.onContentScrollUnbind();
  }

  queryElement(elem: HTMLElement, q: string): HTMLElement {
    return <HTMLElement>elem.querySelector(q);
  }

  updateBackgroundAlpha(elem: HTMLElement, alpha: number): void {
    let c = getComputedStyle(elem).getPropertyValue('background-color');
    let match = /rgba?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*\d+[\.\d+]*)*\)/g.exec(c);
    elem.style.backgroundColor = 'rgba(' + [match[1], match[2], match[3], alpha].join(',') + ')';
  };
} 