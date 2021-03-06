export interface IStringMap {
  [ key: string ]: string
}

export interface IAttributeMap {
  data?: IStringMap
  style?: IStringMap
  [ key: string ]: string | EventListener | IStringMap | undefined
}

export type ElementArg = string | Node | IAttributeMap

export type FragmentArg = string | Node

export interface IH {
  element: ( tagName: string, ...args: ElementArg[] ) => Element
  textNode: ( str: string ) => Text
  comment: ( str: string ) => Comment
  documentFragment: ( ...args: FragmentArg[] ) => DocumentFragment
  html: ( ...args: ElementArg[] ) => HTMLHtmlElement
  head: ( ...args: ElementArg[] ) => HTMLHeadElement
  body: ( ...args: ElementArg[] ) => HTMLBodyElement
  title: ( ...args: ElementArg[] ) => HTMLTitleElement
  base: ( ...args: ElementArg[] ) => HTMLBaseElement
  link: ( ...args: ElementArg[] ) => HTMLLinkElement
  meta: ( ...args: ElementArg[] ) => HTMLMetaElement
  style: ( ...args: ElementArg[] ) => HTMLStyleElement
  address: ( ...args: ElementArg[] ) => HTMLElement
  article: ( ...args: ElementArg[] ) => HTMLElement
  aside: ( ...args: ElementArg[] ) => HTMLElement
  footer: ( ...args: ElementArg[] ) => HTMLElement
  header: ( ...args: ElementArg[] ) => HTMLElement
  h1: ( ...args: ElementArg[] ) => HTMLHeadingElement
  h2: ( ...args: ElementArg[] ) => HTMLHeadingElement
  h3: ( ...args: ElementArg[] ) => HTMLHeadingElement
  h4: ( ...args: ElementArg[] ) => HTMLHeadingElement
  h5: ( ...args: ElementArg[] ) => HTMLHeadingElement
  h6: ( ...args: ElementArg[] ) => HTMLHeadingElement
  nav: ( ...args: ElementArg[] ) => HTMLElement
  blockquote: ( ...args: ElementArg[] ) => HTMLQuoteElement
  dd: ( ...args: ElementArg[] ) => HTMLElement
  div: ( ...args: ElementArg[] ) => HTMLDivElement
  dl: ( ...args: ElementArg[] ) => HTMLDListElement
  dt: ( ...args: ElementArg[] ) => HTMLElement
  figcaption: ( ...args: ElementArg[] ) => HTMLElement
  figure: ( ...args: ElementArg[] ) => HTMLElement
  hr: ( ...args: ElementArg[] ) => HTMLHRElement
  li: ( ...args: ElementArg[] ) => HTMLLIElement
  main: ( ...args: ElementArg[] ) => HTMLElement
  ol: ( ...args: ElementArg[] ) => HTMLOListElement
  p: ( ...args: ElementArg[] ) => HTMLParagraphElement
  pre: ( ...args: ElementArg[] ) => HTMLPreElement
  section: ( ...args: ElementArg[] ) => HTMLElement
  ul: ( ...args: ElementArg[] ) => HTMLUListElement
  a: ( ...args: ElementArg[] ) => HTMLAnchorElement
  abbr: ( ...args: ElementArg[] ) => HTMLElement
  b: ( ...args: ElementArg[] ) => HTMLElement
  bdi: ( ...args: ElementArg[] ) => HTMLElement
  bdo: ( ...args: ElementArg[] ) => HTMLElement
  br: ( ...args: ElementArg[] ) => HTMLBRElement
  cite: ( ...args: ElementArg[] ) => HTMLElement
  code: ( ...args: ElementArg[] ) => HTMLElement
  data: ( ...args: ElementArg[] ) => HTMLDataElement
  dfn: ( ...args: ElementArg[] ) => HTMLElement
  em: ( ...args: ElementArg[] ) => HTMLElement
  i: ( ...args: ElementArg[] ) => HTMLElement
  kbd: ( ...args: ElementArg[] ) => HTMLElement
  mark: ( ...args: ElementArg[] ) => HTMLElement
  q: ( ...args: ElementArg[] ) => HTMLElement
  rp: ( ...args: ElementArg[] ) => HTMLElement
  rt: ( ...args: ElementArg[] ) => HTMLElement
  rtc: ( ...args: ElementArg[] ) => HTMLElement
  ruby: ( ...args: ElementArg[] ) => HTMLElement
  s: ( ...args: ElementArg[] ) => HTMLElement
  samp: ( ...args: ElementArg[] ) => HTMLElement
  small: ( ...args: ElementArg[] ) => HTMLElement
  span: ( ...args: ElementArg[] ) => HTMLSpanElement
  strong: ( ...args: ElementArg[] ) => HTMLElement
  sub: ( ...args: ElementArg[] ) => HTMLElement
  sup: ( ...args: ElementArg[] ) => HTMLElement
  time: ( ...args: ElementArg[] ) => HTMLElement
  u: ( ...args: ElementArg[] ) => HTMLElement
  var: ( ...args: ElementArg[] ) => HTMLElement
  wbr: ( ...args: ElementArg[] ) => HTMLElement
  area: ( ...args: ElementArg[] ) => HTMLAreaElement
  audio: ( ...args: ElementArg[] ) => HTMLAudioElement
  map: ( ...args: ElementArg[] ) => HTMLMapElement
  track: ( ...args: ElementArg[] ) => HTMLTrackElement
  video: ( ...args: ElementArg[] ) => HTMLVideoElement
  embed: ( ...args: ElementArg[] ) => HTMLEmbedElement
  iframe: ( ...args: ElementArg[] ) => HTMLIFrameElement
  img: ( ...args: ElementArg[] ) => HTMLImageElement
  object: ( ...args: ElementArg[] ) => HTMLObjectElement
  param: ( ...args: ElementArg[] ) => HTMLParamElement
  source: ( ...args: ElementArg[] ) => HTMLSourceElement
  canvas: ( ...args: ElementArg[] ) => HTMLCanvasElement
  noscript: ( ...args: ElementArg[] ) => HTMLElement
  script: ( ...args: ElementArg[] ) => HTMLScriptElement
  template: ( ...args: ElementArg[] ) => HTMLTemplateElement
  del: ( ...args: ElementArg[] ) => HTMLElement
  ins: ( ...args: ElementArg[] ) => HTMLElement
  caption: ( ...args: ElementArg[] ) => HTMLElement
  col: ( ...args: ElementArg[] ) => HTMLTableColElement
  colgroup: ( ...args: ElementArg[] ) => HTMLElement
  table: ( ...args: ElementArg[] ) => HTMLTableElement
  tbody: ( ...args: ElementArg[] ) => HTMLTableSectionElement
  td: ( ...args: ElementArg[] ) => HTMLTableCellElement
  tfoot: ( ...args: ElementArg[] ) => HTMLTableSectionElement
  th: ( ...args: ElementArg[] ) => HTMLTableHeaderCellElement
  thead: ( ...args: ElementArg[] ) => HTMLTableSectionElement
  tr: ( ...args: ElementArg[] ) => HTMLTableRowElement
  button: ( ...args: ElementArg[] ) => HTMLButtonElement
  datalist: ( ...args: ElementArg[] ) => HTMLDataListElement
  fieldset: ( ...args: ElementArg[] ) => HTMLFieldSetElement
  form: ( ...args: ElementArg[] ) => HTMLFormElement
  input: ( ...args: ElementArg[] ) => HTMLInputElement
  label: ( ...args: ElementArg[] ) => HTMLLabelElement
  legend: ( ...args: ElementArg[] ) => HTMLLegendElement
  meter: ( ...args: ElementArg[] ) => HTMLMeterElement
  optgroup: ( ...args: ElementArg[] ) => HTMLOptGroupElement
  option: ( ...args: ElementArg[] ) => HTMLOptionElement
  output: ( ...args: ElementArg[] ) => HTMLOutputElement
  progress: ( ...args: ElementArg[] ) => HTMLProgressElement
  select: ( ...args: ElementArg[] ) => HTMLSelectElement
  textarea: ( ...args: ElementArg[] ) => HTMLTextAreaElement
  details: ( ...args: ElementArg[] ) => HTMLDetailsElement
  dialog: ( ...args: ElementArg[] ) => HTMLDialogElement
  hgroup: ( ...args: ElementArg[] ) => HTMLElement
  menu: ( ...args: ElementArg[] ) => HTMLMenuElement
  menuitem: ( ...args: ElementArg[] ) => HTMLElement
  picture: ( ...args: ElementArg[] ) => HTMLPictureElement
  shadow: ( ...args: ElementArg[] ) => HTMLElement
  summary: ( ...args: ElementArg[] ) => HTMLElement
}

export type HFactory = ( document: HTMLDocument ) => IH